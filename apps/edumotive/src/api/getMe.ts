import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { getAccess, loadDirectory, one } from '../lib/server';
import { accessZ, authorZ, profileZ } from '../lib/schemas';

const s = z.string();
export default createEndpoint({
  description: 'Loads the signed-in user profile, subscriptions and submissions',
  authenticated: true,
  inputSchema: z.object({}),
  outputSchema: z.object({
    profile: profileZ.nullable(),
    access: accessZ,
    author: authorZ.nullable(),
    subscriptions: z.array(z.object({ id: s, plan: s, price: z.number(), status: s, trackingNumber: s, startDate: s, endDate: s, created: s, address: s, deliveryStage: s, hardCopy: z.boolean() })),
    submissions: z.array(z.object({ id: s, title: s, slug: s, status: s, adminNote: s, excerpt: s, content: s, mainImage: s, imageCaption: s, sectionId: s })),
  }),
  execute: async ({ context }) => {
    const uid = context.user.id;
    const [p, subs, plans, arts, access, dir] = await Promise.all([
      zite.profiles.findOne({ filters: { account: uid } }),
      zite.subscriptions.findAll({ filters: { subscriber: uid }, limit: 100 }),
      zite.plans.findAll({ limit: 100 }),
      zite.articles.findAll({ filters: { submittedBy: uid }, limit: 500 }),
      getAccess(uid),
      loadDirectory(),
    ]);
    const { records: au } = await zite.authors.findAll({ filters: { account: uid }, limit: 1 });
    const planMap = new Map(plans.records.map((x) => [x.id, x]));
    return {
      profile: p ? { id: p.id, displayName: p.displayName ?? '', role: p.role ?? 'Student', className: p.className ?? '', institution: p.institution ?? '', username: p.username ?? '', bio: p.bio ?? '', avatar: p.avatar ?? '' } : null,
      access,
      author: au[0] ? dir.authors.get(au[0].id) ?? null : null,
      subscriptions: subs.records.sort((a, b) => (b.created ?? '').localeCompare(a.created ?? '')).map((x) => {
        const pl = planMap.get(one(x.plan) ?? '');
        return { id: x.id, plan: pl?.name ?? '', price: pl?.price ?? 0, status: x.status ?? 'Pending', trackingNumber: x.trackingNumber ?? '', startDate: x.startDate ?? '', endDate: x.endDate ?? '', created: x.created ?? '', address: x.address ?? '', deliveryStage: x.deliveryStage ?? '', hardCopy: !!pl?.hardCopy };
      }),
      submissions: arts.records.map((a) => ({ id: a.id, title: a.title ?? '', slug: a.slug || a.id, status: a.status ?? 'Draft', adminNote: a.adminNote ?? '', excerpt: a.excerpt ?? '', content: a.content ?? '', mainImage: a.mainImage ?? '', imageCaption: a.imageCaption ?? '', sectionId: one(a.section) ?? '' })),
    };
  },
});
