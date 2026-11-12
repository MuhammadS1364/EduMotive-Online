import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { assertAdmin } from '../lib/adminAuth';

export default createEndpoint({
  description: 'Checks the admin access code',
  inputSchema: z.object({ code: z.string() }),
  outputSchema: z.object({ key: z.string() }),
  execute: async ({ input }) => {
    const key = input.code.trim();
    assertAdmin(key);
    return { key };
  },
});
