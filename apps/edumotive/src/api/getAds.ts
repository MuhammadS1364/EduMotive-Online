import { z } from 'zod';
import { createEndpoint } from '../zite-compat/backend';
import { zite } from '../zite-compat/db';

export default createEndpoint({
  description: 'Lists approved advertisements',
  inputSchema: z.object({}),
  outputSchema: z.object({ ads: z.array(z.object({ id: z.string(), title: z.string(), media: z.string(), mediaType: z.string(), targetLink: z.string() })) }),
  execute: async () => {
    const { records } = await zite.ads.findAll({ filters: { status: 'Approved' }, limit: 100 });
    return { ads: records.filter((a) => a.media && (!a.endDate || a.endDate >= new Date().toISOString().slice(0, 10))).map((a) => ({ id: a.id, title: a.title ?? '', media: a.media ?? '', mediaType: a.mediaType ?? 'Image', targetLink: a.targetLink ?? '' })) };
  },
});
