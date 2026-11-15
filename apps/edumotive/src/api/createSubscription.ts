import { z } from 'zod';
import { createEndpoint } from '../zite-compat/backend';
import { zite } from '../zite-compat/db';
import { fail } from '../lib/server';

export default createEndpoint({
  description: 'Places a magazine subscription order with payment proof',
  authenticated: true,
  inputSchema: z.object({
    planId: z.string(), fullName: z.string().min(2), phone: z.string().min(8), address: z.string().min(8),
    pincode: z.string().min(6), paymentProof: z.string().url(), transactionId: z.string().min(4),
  }),
  outputSchema: z.object({ id: z.string() }),
  execute: async ({ input, context }) => {
    const profile = await zite.profiles.findOne({ filters: { account: context.user.id } });
    if (!profile) throw fail('Please create your profile before subscribing.');
    const { planId, ...rest } = input;
    const r = await zite.subscriptions.create({ record: { ...rest, plan: planId, subscriber: context.user.id, status: 'Pending' } });
    return { id: r.id };
  },
});
