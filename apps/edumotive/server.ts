import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getApiApp } from './apiApp';
import adminLogin from '../edumotive-admin/src/api/adminLogin';
import adminList from '../edumotive-admin/src/api/adminList';
import adminSave from '../edumotive-admin/src/api/adminSave';
import adminStats from '../edumotive-admin/src/api/adminStats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === 'production';

async function start() {
  const apiApp = await getApiApp({ adminLogin, adminList, adminSave, adminStats });
  const app = express();
  app.use(apiApp);

  if (isProd) {
    const adminDistDir = path.resolve(__dirname, '../edumotive-admin/dist');
    app.use((req, res, next) => {
      if (req.method === 'GET' && req.originalUrl === '/admin') {
        return res.redirect(301, '/admin/');
      }
      return next();
    });
    app.use('/admin', express.static(adminDistDir));
    app.get('/admin/*', (_req, res) => {
      res.sendFile(path.join(adminDistDir, 'index.html'));
    });

    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const adminDir = path.resolve(__dirname, '../edumotive-admin');
    const adminVite = await createViteServer({
      root: adminDir,
      base: '/admin/',
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'spa',
    });
    app.use((req, res, next) => {
      if (req.method === 'GET' && req.originalUrl === '/admin') {
        return res.redirect(301, '/admin/');
      }
      if (req.url === '/admin/' || req.url.startsWith('/admin/')) {
        return adminVite.middlewares(req, res, next);
      }
      return next();
    });

    const vite = await createViteServer({
      root: __dirname,
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduMotive server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
