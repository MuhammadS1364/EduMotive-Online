import { ZiteError } from 'zitejs/backend';

// Server-only: the admin access code lives in the app's Secrets (ZITE_ADMIN_CODE), never in the repo.
export function assertAdmin(key: string | undefined) {
  const code = (process.env as Record<string, string | undefined>).ZITE_ADMIN_CODE;
  if (!code || key !== code) {
    throw new ZiteError({ code: 'UNAUTHORIZED', message: 'Invalid admin code', userFacingMessage: 'Please enter the admin code again.' });
  }
}
