import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { getAccess, loadDirectory, one, toCard } from '../lib/server';
import { authorZ, cardZ } from '../lib/schemas';

export default createEndpoint({
  description: 'Loads a single article with its author, letters and access status',
  inputSchema: z.object({ slug: z.string() }),
  outputSchema: z.object({
    article: cardZ.extend({ content: z.string(), imageCaption: z.string(), locked: z.boolean() }).nullable(),
    author: authorZ.nullable(),
    letters: z.array(z.object({ id: z.string(), name: z.string(), message: z.string(), created: z.string() })),
    related: z.array(cardZ),
  }),
  execute: async ({ input, context }) => {
    const dir = await loadDirectory();
    const ar = dir.published.find((a) => a.slug === input.slug || a.id === input.slug);
    if (!ar) return { article: null, author: null, letters: [], related: [] };
    let content = ar.content ?? '';
    let locked = false;
    if (ar.premium) {
      const access = await getAccess(context.user?.id);
      if (!access.premiumArticles) {
        locked = true;
        content = content.split(/\n\s*\n/).slice(0, 3).join('\n\n');
      }
    }
    const { records: letters } = await zite.letters.findAll({ filters: { article: ar.id, approved: true, recipient: 'Public' }, limit: 200 });
    const authorId = one(ar.author) ?? '';
    const sec = one(ar.section);
    return {
      article: { ...toCard(ar, dir), content, imageCaption: ar.imageCaption ?? '', locked },
      author: dir.authors.get(authorId) ?? null,
      letters: letters.map((l) => ({ id: l.id, name: l.name ?? '', message: l.message ?? '', created: l.created ?? '' })),
      related: dir.published.filter((a) => a.id !== ar.id && (one(a.section) === sec || one(a.author) === authorId)).slice(0, 4).map((a) => toCard(a, dir)),
    };
  },
});
