import { z } from 'zod';
import { createEndpoint } from '../zite-compat/backend';
import { zite } from '../zite-compat/db';

export default createEndpoint({
  description: 'Creates or updates the signed-in user profile',
  authenticated: true,
  inputSchema: z.object({
    displayName: z.string().min(1), role: z.enum(['Student', 'Author']), className: z.string().min(1),
    institution: z.string().min(1), username: z.string(), bio: z.string(), avatar: z.string(),
  }),
  outputSchema: z.object({ ok: z.boolean() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    const existing = await zite.profiles.findOne({ filters: { account: uid } });
    if (existing) await zite.profiles.update({ id: existing.id, record: input });
    else await zite.profiles.create({ record: { ...input, account: uid } });
    if (input.role === 'Author') {
      const au = await zite.authors.findOne({ filters: { account: uid } });
      const rec = { name: input.displayName, institution: input.institution, bio: input.bio || null, photo: input.avatar || null };
      if (au) await zite.authors.update({ id: au.id, record: rec });
      else await zite.authors.create({ record: { ...rec, post: 'Author', email: context.user.email, account: uid } });
    }
    return { ok: true };
  },
});
