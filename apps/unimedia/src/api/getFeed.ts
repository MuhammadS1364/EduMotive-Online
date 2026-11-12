import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { one, people, personZ, postZ, unknownPerson } from '../lib/server';

export default createEndpoint({
  description: 'Loads the campus feed, stories and campuses',
  inputSchema: z.object({ userId: z.string().optional() }),
  outputSchema: z.object({
    posts: z.array(postZ),
    stories: z.array(z.object({ owner: personZ, items: z.array(z.object({ id: z.string(), media: z.string(), mediaType: z.string(), caption: z.string(), created: z.string() })) })),
    campuses: z.array(z.string()),
    person: personZ.nullable(),
  }),
  execute: async ({ input, context }) => {
    const me = context.user?.id;
    const [ppl, posts, likes, stories] = await Promise.all([
      people(),
      zite.posts.findAll({ limit: 1000, ...(input.userId ? { filters: { owner: input.userId } } : {}) }),
      zite.postLikes.findAll({ limit: 2000 }),
      zite.stories.findAll({ limit: 500 }),
    ]);
    const likeCount: Record<string, number> = {};
    const mine = new Set<string>();
    for (const l of likes.records) {
      const pid = one(l.post); if (!pid) continue;
      likeCount[pid] = (likeCount[pid] ?? 0) + 1;
      if (me && one(l.liker) === me) mine.add(pid);
    }
    const out = posts.records.filter((p) => p.media).sort((a, b) => (b.created ?? '').localeCompare(a.created ?? '')).map((p) => {
      const uid = one(p.owner) ?? '';
      return { id: p.id, caption: p.caption ?? '', campus: p.campus ?? '', media: p.media ?? '', mediaType: p.mediaType ?? 'Image', aspect: p.aspect ?? 'Square', created: p.created ?? '', likes: likeCount[p.id] ?? 0, liked: mine.has(p.id), owner: ppl.get(uid) ?? unknownPerson(uid) };
    });
    const since = Date.now() - 24 * 3600 * 1000;
    const groups = new Map<string, { owner: z.infer<typeof personZ>; items: { id: string; media: string; mediaType: string; caption: string; created: string }[] }>();
    for (const s of stories.records.filter((x) => x.media && new Date(x.created ?? 0).getTime() > since).sort((a, b) => (a.created ?? '').localeCompare(b.created ?? ''))) {
      const uid = one(s.owner) ?? '';
      if (!groups.has(uid)) groups.set(uid, { owner: ppl.get(uid) ?? unknownPerson(uid), items: [] });
      groups.get(uid)!.items.push({ id: s.id, media: s.media ?? '', mediaType: s.mediaType ?? 'Image', caption: s.caption ?? '', created: s.created ?? '' });
    }
    return { posts: out, stories: [...groups.values()], campuses: [...new Set(out.map((p) => p.campus).filter(Boolean))].sort(), person: input.userId ? ppl.get(input.userId) ?? null : null };
  },
});
