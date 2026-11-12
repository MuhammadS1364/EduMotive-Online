import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { one } from '../lib/server';

const profileZ = z.object({ displayName: z.string(), role: z.string(), className: z.string(), institution: z.string(), username: z.string(), bio: z.string(), avatar: z.string() });

export default createEndpoint({
  description: 'Reads or saves the signed-in user profile (shared with EduMotive)',
  authenticated: true,
  inputSchema: z.object({ save: profileZ.optional() }),
  outputSchema: z.object({ userId: z.string(), profile: profileZ.nullable() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    let p = await zite.profiles.findOne({ filters: { account: uid } });
    if (input.save) {
      const rec = { ...input.save, role: input.save.role === 'Author' ? 'Author' : 'Student' };
      if (p) await zite.profiles.update({ id: p.id, record: rec });
      else await zite.profiles.create({ record: { ...rec, account: uid } });
      p = await zite.profiles.findOne({ filters: { account: uid } });
    }
    return {
      userId: uid,
      profile: p && one(p.account) ? { displayName: p.displayName ?? '', role: p.role ?? 'Student', className: p.className ?? '', institution: p.institution ?? '', username: p.username ?? '', bio: p.bio ?? '', avatar: p.avatar ?? '' } : null,
    };
  },
});
