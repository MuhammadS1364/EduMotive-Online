import express from 'express';
import { ZodError } from 'zod';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

import getSite from './src/api/getSite';
import getCatalog from './src/api/getCatalog';
import getMe from './src/api/getMe';
import getArticle from './src/api/getArticle';
import getNews from './src/api/getNews';
import getAds from './src/api/getAds';
import saveProfile from './src/api/saveProfile';
import saveSubmission from './src/api/saveSubmission';
import createSubscription from './src/api/createSubscription';
import submitAd from './src/api/submitAd';
import submitLetter from './src/api/submitLetter';
import adminLogin from '../edumotive-admin/src/api/adminLogin';
import adminList from '../edumotive-admin/src/api/adminList';
import adminSave from '../edumotive-admin/src/api/adminSave';
import adminStats from '../edumotive-admin/src/api/adminStats';
import { ZiteError, type AuthContextUser } from './src/zite-compat/backend';
import { ensureDbReady, getUpload, isTursoEnabled, saveUpload, zite } from './src/zite-compat/db';

const endpoints = {
  getSite,
  getCatalog,
  getMe,
  getArticle,
  getNews,
  getAds,
  saveProfile,
  saveSubmission,
  createSubscription,
  submitAd,
  submitLetter,
  adminLogin,
  adminList,
  adminSave,
  adminStats,
} as const;

const pdfCache = new Map<string, Uint8Array>();

async function buildIssuePdf(issueId: string): Promise<Uint8Array> {
  const cached = pdfCache.get(issueId);
  if (cached) return cached;

  const issue = await zite.issues.findOne({ id: issueId });
  const { records: allArticles } = await zite.articles.findAll({
    filters: { status: 'Published' },
    limit: 50,
  });
  const issueArticles = allArticles.filter((a) => a.issue === issueId);
  const stories = issueArticles.length ? issueArticles : allArticles.slice(0, 3);

  const doc = await PDFDocument.create();
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const sans = await doc.embedFont(StandardFonts.Helvetica);

  const cover = doc.addPage([595, 842]);
  cover.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0.133, 0.157, 0.192) });
  cover.drawRectangle({ x: 42, y: 740, width: 120, height: 6, color: rgb(1, 0.827, 0.412) });
  cover.drawText('EDUMOTIVE TRIMONTHLY', { x: 42, y: 760, size: 13, font: sans, color: rgb(1, 0.827, 0.412) });
  cover.drawText(issue?.title || 'Student Magazine Edition', {
    x: 42,
    y: 660,
    size: 32,
    font: serifBold,
    color: rgb(0.95, 0.95, 0.95),
    maxWidth: 510,
  });
  cover.drawText(`${issue?.volume || 'Vol. 14'}  •  ${issue?.issueDate || '2026'}`, {
    x: 42,
    y: 600,
    size: 14,
    font: sans,
    color: rgb(0.8, 0.82, 0.85),
  });
  cover.drawText(issue?.description || 'Stories, essays, and ideas from students and scholars.', {
    x: 42,
    y: 520,
    size: 13,
    font: serif,
    color: rgb(0.88, 0.88, 0.9),
    maxWidth: 500,
    lineHeight: 20,
  });
  cover.drawText('Darul Huda Islamic University, Chemmad', {
    x: 42,
    y: 60,
    size: 11,
    font: sans,
    color: rgb(0.75, 0.77, 0.8),
  });

  for (let idx = 0; idx < Math.max(3, stories.length); idx++) {
    const story = stories[idx % stories.length];
    const page = doc.addPage([595, 842]);
    page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0.97, 0.96, 0.94) });
    page.drawText(`PAGE ${idx + 2}  •  EDUMOTIVE`, {
      x: 48,
      y: 790,
      size: 10,
      font: sans,
      color: rgb(0.45, 0.48, 0.52),
    });
    page.drawLine({
      start: { x: 48, y: 778 },
      end: { x: 547, y: 778 },
      thickness: 1,
      color: rgb(0.85, 0.83, 0.8),
    });
    page.drawText(story?.title || 'Editorial Essay', {
      x: 48,
      y: 730,
      size: 22,
      font: serifBold,
      color: rgb(0.13, 0.15, 0.19),
      maxWidth: 499,
      lineHeight: 28,
    });
    const cleanBody = (story?.content || story?.excerpt || '')
      .replace(/^#+\s*/gm, '')
      .replace(/[>*_`]/g, '')
      .slice(0, 1400);
    page.drawText(cleanBody, {
      x: 48,
      y: 640,
      size: 12,
      font: serif,
      color: rgb(0.2, 0.22, 0.25),
      maxWidth: 499,
      lineHeight: 19,
    });
  }

  const bytes = await doc.save();
  pdfCache.set(issueId, bytes);
  return bytes;
}

function parseUser(req: express.Request): AuthContextUser | null {
  const raw = req.header('x-auth-user');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthContextUser>;
    if (parsed && typeof parsed.id === 'string' && parsed.id) {
      return {
        id: parsed.id,
        email: typeof parsed.email === 'string' ? parsed.email : 'reader@edumotive.in',
        name: typeof parsed.name === 'string' ? parsed.name : 'Reader',
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function createApiApp(): express.Express {
  const app = express();
  app.use((req, _res, next) => {
    const r = req as express.Request & { _body?: boolean; body?: unknown };
    if (r.body !== undefined) {
      if (typeof r.body === 'string') {
        try {
          r.body = r.body ? JSON.parse(r.body) : {};
        } catch {
          // Leave raw string for error handling
        }
      }
      if (typeof r.body === 'object' && r.body !== null) {
        r._body = true;
      }
    }
    next();
  });
  app.use(express.json({ limit: '15mb' }));

  app.get('/api/health', async (_req, res) => {
    await ensureDbReady();
    res.json({ ok: true, database: isTursoEnabled() ? 'turso' : 'memory' });
  });

  app.get('/api/issues/:id.pdf', async (req, res) => {
    try {
      await ensureDbReady();
      const pdf = await buildIssuePdf(req.params.id);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.send(Buffer.from(pdf));
    } catch (err) {
      console.error('PDF generation error:', err);
      res.status(500).json({ error: 'Could not generate issue PDF' });
    }
  });

  app.post('/api/upload', async (req, res) => {
    try {
      await ensureDbReady();
      const { dataUrl, type } = (req.body ?? {}) as { dataUrl?: string; type?: string };
      if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.includes(',')) {
        return res.status(400).json({ error: 'Invalid upload payload' });
      }
      const [meta, base64] = dataUrl.split(',', 2);
      const mimeMatch = /^data:([^;]+);base64$/.exec(meta);
      const mime = mimeMatch?.[1] || type || 'application/octet-stream';
      const id = `up_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      await saveUpload(id, mime, Buffer.from(base64, 'base64'));
      return res.json({ url: `/api/uploads/${id}` });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Failed to store uploaded file' });
    }
  });

  app.get('/api/uploads/:id', async (req, res) => {
    try {
      await ensureDbReady();
      const item = await getUpload(req.params.id);
      if (!item) return res.status(404).send('Not found');
      res.setHeader('Content-Type', item.mime);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(item.buffer);
    } catch (err) {
      console.error('Upload read error:', err);
      return res.status(500).send('Error reading uploaded file');
    }
  });

  app.post('/api/:endpoint', async (req, res) => {
    const name = req.params.endpoint as keyof typeof endpoints;
    const ep = endpoints[name];
    if (!ep) {
      return res.status(404).json({ error: `Unknown endpoint: ${name}` });
    }
    try {
      await ensureDbReady();
      const user = parseUser(req);
      if (ep.authenticated && !user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      const input = ep.inputSchema.parse(req.body ?? {});
      const result = await ep.execute({
        input: input as never,
        context: { user } as never,
      });
      const validated = ep.outputSchema.parse(result);
      return res.json(validated);
    } catch (err) {
      if (err instanceof ZiteError) {
        return res.status(400).json({ error: err.userFacingMessage || err.message });
      }
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors.map((e) => e.message).join(', ') });
      }
      console.error(`Endpoint error (${name}):`, err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  return app;
}

let cachedApp: express.Express | null = null;

export async function getApiApp(): Promise<express.Express> {
  await ensureDbReady();
  if (!cachedApp) {
    cachedApp = createApiApp();
  }
  return cachedApp;
}
