import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { assertAdmin } from '../lib/adminAuth';
import { zite } from 'zitejs/db';

const TABLES = ['siteSettings', 'sections', 'tiers', 'badges', 'authors', 'issues', 'articles', 'letters', 'programs', 'results', 'teamMembers', 'plans', 'subscriptions', 'ads', 'notes', 'profiles', 'adPlans', 'heroSlides'] as const;
const one = (v: unknown) => (Array.isArray(v) ? v[0] : v) as string | undefined;
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);

export default createEndpoint({
  description: 'Creates or updates a record from the admin panel',
  inputSchema: z.object({ key: z.string(), table: z.enum(TABLES), id: z.string().optional(), record: z.record(z.string(), z.any()), deleteId: z.string().optional() }),
  outputSchema: z.object({ id: z.string() }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = (zite as any)[input.table];
    if (input.deleteId) { await client.delete({ id: input.deleteId }); return { id: input.deleteId }; }
    const rec: Record<string, unknown> = { ...input.record };
    delete rec.id; delete rec.created;
    for (const k of Object.keys(rec)) if (rec[k] === '') rec[k] = null;

    if (input.table === 'articles') {
      if (!rec.slug && rec.title) rec.slug = `${slugify(String(rec.title))}-${Date.now().toString(36).slice(-4)}`;
      if (rec.status === 'Published' && !rec.publishedAt) rec.publishedAt = new Date().toISOString();
    }
    if (input.table === 'subscriptions' && rec.status === 'Active' && !rec.startDate) {
      const planId = one(rec.plan);
      const plan = planId ? await zite.plans.findOne({ id: planId }) : undefined;
      const start = new Date();
      const end = new Date(start); end.setMonth(end.getMonth() + (plan?.durationMonths ?? 12));
      rec.startDate = start.toISOString().slice(0, 10);
      rec.endDate = end.toISOString().slice(0, 10);
    }
    if (input.table === 'ads' && 'paymentProof' in rec) {
      rec.paymentProof = typeof rec.paymentProof === 'string' && rec.paymentProof ? [{ url: rec.paymentProof }] : null;
    }
    if (input.table === 'ads' && rec.status === 'Approved' && !rec.startDate) {
      const planId = one(rec.plan);
      const plan = planId ? await zite.adPlans.findOne({ id: planId }) : undefined;
      const start = new Date(); const end = new Date(start);
      if (plan?.period === 'Week') end.setDate(end.getDate() + 7);
      else if (plan?.period === 'Year') end.setFullYear(end.getFullYear() + 1);
      else end.setMonth(end.getMonth() + 1);
      rec.startDate = start.toISOString().slice(0, 10);
      rec.endDate = end.toISOString().slice(0, 10);
    }
    if (input.id) { await client.update({ id: input.id, record: rec }); return { id: input.id }; }
    const created = await client.create({ record: rec });
    return { id: created.id };
  },
});
