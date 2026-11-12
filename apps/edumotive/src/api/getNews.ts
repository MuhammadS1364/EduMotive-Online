import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';

export default createEndpoint({
  description: 'Lists published news and updates',
  inputSchema: z.object({}),
  outputSchema: z.object({
    news: z.array(z.object({ id: z.string(), title: z.string(), summary: z.string(), body: z.string(), image: z.string(), date: z.string() })),
  }),
  execute: async () => {
    const { records } = await zite.news.findAll({ limit: 200 });
    const news = records
      .filter((r) => r.published && r.title)
      .map((r) => ({ id: r.id, title: r.title ?? '', summary: r.summary ?? '', body: r.body ?? '', image: r.image ?? '', date: r.publishedDate ?? '' }))
      .sort((a, b) => b.date.localeCompare(a.date));
    return { news };
  },
});
