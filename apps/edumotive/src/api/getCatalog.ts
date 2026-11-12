import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { loadDirectory, toCard, one } from '../lib/server';
import { authorZ, cardZ, issueZ } from '../lib/schemas';

export default createEndpoint({
  description: 'Loads published articles, authors and magazine issues',
  inputSchema: z.object({}),
  outputSchema: z.object({
    articles: z.array(cardZ.extend({ issueId: z.string() })),
    authors: z.array(authorZ),
    issues: z.array(issueZ),
  }),
  execute: async () => {
    const dir = await loadDirectory();
    const { records: iss } = await zite.issues.findAll({ filters: { published: true }, limit: 500 });
    return {
      articles: dir.published.slice(0, 600).map((a) => ({ ...toCard(a, dir), issueId: one(a.issue) ?? '' })),
      authors: [...dir.authors.values()].sort((a, b) => b.count - a.count),
      issues: iss.sort((a, b) => (b.issueDate ?? '').localeCompare(a.issueDate ?? '')).map((i) => ({
        id: i.id, title: i.title ?? '', issueDate: i.issueDate ?? '', volume: i.volume ?? '', cover: i.cover ?? '',
        pdf: i.pdf ?? '', description: i.description ?? '',
      })),
    };
  },
});
