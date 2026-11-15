import { z } from 'zod';
import { createEndpoint } from '../zite-compat/backend';
import { zite } from '../zite-compat/db';

export default createEndpoint({
  description: 'Submits a paid advertisement subscription for admin approval',
  inputSchema: z.object({
    title: z.string().min(1), advertiser: z.string().min(1), email: z.string().email(), phone: z.string(),
    media: z.string().url(), mediaType: z.enum(['Image', 'Video']), targetLink: z.string(),
    planId: z.string().min(1), paymentProof: z.string().url(), transactionId: z.string(),
  }),
  outputSchema: z.object({ ok: z.boolean() }),
  execute: async ({ input }) => {
    const { planId, paymentProof, transactionId, ...rest } = input;
    await zite.ads.create({
      record: {
        ...rest, targetLink: rest.targetLink || null, status: 'Pending', plan: [planId],
        paymentProof: [{ url: paymentProof }], transactionId: transactionId || null,
      },
    });
    return { ok: true };
  },
});
