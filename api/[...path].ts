import type { IncomingMessage, ServerResponse } from 'node:http';
import { getApiApp } from '../apps/edumotive/apiApp';

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse,
) {
  const app = await getApiApp();
  return app(req as never, res as never);
}
