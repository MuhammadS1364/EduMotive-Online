import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { assertAdmin } from '../lib/adminAuth';

export default createEndpoint({
  description: 'Checks the admin username and password',
  inputSchema: z.object({ username: z.string(), password: z.string() }),
  outputSchema: z.object({ key: z.string() }),
  execute: async ({ input }) => {
    const key = `${input.username.trim()}:${input.password}`;
    assertAdmin(key);
    return { key };
  },
});
