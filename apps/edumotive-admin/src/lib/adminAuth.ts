import { ZiteError } from 'zitejs/backend';

// Server-only: the single access code that opens the admin panel.
const ADMIN_CODE = 'edumotive4admin';

export function assertAdmin(key: string | undefined) {
  if (key?.trim() !== ADMIN_CODE) {
    throw new ZiteError({ code: 'UNAUTHORIZED', message: 'Invalid admin code', userFacingMessage: 'Please enter the admin code again.' });
  }
}
