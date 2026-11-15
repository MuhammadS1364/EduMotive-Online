import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { assertAdmin } from '../lib/adminAuth';

export default createEndpoint({
  description: 'Checks the admin email and password',
  inputSchema: z.object({ email: z.string(), password: z.string() }),
  outputSchema: z.object({ key: z.string() }),
  execute: async ({ input }) => {
    const key = `${input.email.trim().toLowerCase()}:${input.password}`;
    assertAdmin(key);
    return { key };
  },
});
