import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';

export default createEndpoint({
  description: 'Sends a letter to an author or a public letter about an article',
  inputSchema: z.object({
    articleId: z.string(), name: z.string().min(1), email: z.string().email(), message: z.string().min(5),
    recipient: z.enum(['Author', 'Public']),
  }),
  outputSchema: z.object({ ok: z.boolean() }),
  execute: async ({ input }) => {
    await zite.letters.create({ record: { name: input.name, email: input.email, message: input.message, recipient: input.recipient, article: input.articleId, approved: false } });
    return { ok: true };
  },
});
