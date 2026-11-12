import { ZiteError } from 'zitejs/backend';

// Server-only: verifies the admin key sent with every admin request.
const ADMIN_KEY = 'edumotive4:edu4motive';

export function assertAdmin(key: string | undefined) {
  if (key !== ADMIN_KEY) {
    throw new ZiteError({ code: 'UNAUTHORIZED', message: 'Invalid admin key', userFacingMessage: 'Please sign in to the admin panel again.' });
  }
}
