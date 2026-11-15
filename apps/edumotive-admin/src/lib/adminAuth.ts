import { ZiteError } from '../../../edumotive/src/zite-compat/backend';

// Server-only: admin accounts that can open the admin panel.
const ADMIN_EMAILS = ['edumotive4@gmail.com', 'shafeealam1364@gmail.com'];
const ADMIN_PASSWORD = 'edu4motive@tri';

export function assertAdmin(key: string | undefined) {
  const i = (key ?? '').indexOf(':');
  const email = (key ?? '').slice(0, i).trim().toLowerCase();
  const pass = (key ?? '').slice(i + 1);
  if (i < 0 || !ADMIN_EMAILS.includes(email) || pass !== ADMIN_PASSWORD) {
    throw new ZiteError({ code: 'UNAUTHORIZED', message: 'Invalid admin login', userFacingMessage: 'Please sign in to the admin panel again.' });
  }
}
