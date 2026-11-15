import type { IncomingMessage, ServerResponse } from 'node:http';
import { getApiApp } from '../../edumotive/apiApp';

export default async function handler(
  req: IncomingMessage & { url?: string; query?: Record<string, string | string[]> },
  res: ServerResponse,
) {
  const rawPath = req.query?.__path;
  const pathParts = Array.isArray(rawPath)
    ? rawPath
    : typeof rawPath === 'string' && rawPath
      ? [rawPath]
      : [];

  if (pathParts.length > 0 && (!req.url || req.url.startsWith('/api/index'))) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(req.query ?? {})) {
      if (k === '__path') continue;
      if (typeof v === 'string') qs.set(k, v);
      else if (Array.isArray(v)) v.forEach((item) => qs.append(k, item));
    }
    const suffix = qs.toString() ? `?${qs.toString()}` : '';
    req.url = `/api/${pathParts.join('/')}${suffix}`;
  }

  const app = await getApiApp();
  return app(req as never, res as never);
}
