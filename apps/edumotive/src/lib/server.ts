import { zite } from 'zitejs/db';

export const one = (v: unknown): string | undefined =>
  Array.isArray(v) ? (v[0] as string | undefined) : typeof v === 'string' && v ? v : undefined;

export type Access = { premiumArticles: boolean; pdfReading: boolean; hardCopy: boolean };

export async function getAccess(userId?: string): Promise<Access> {
  const { records: st } = await zite.siteSettings.findAll({ limit: 1 });
  if (!st[0]?.showSubscribe) return { premiumArticles: true, pdfReading: true, hardCopy: false };
  const res: Access = { premiumArticles: false, pdfReading: false, hardCopy: false };
  if (!userId) return res;
  const { records: subs } = await zite.subscriptions.findAll({ filters: { subscriber: userId, status: 'Active' }, limit: 50 });
  const today = new Date().toISOString().slice(0, 10);
  const planIds = subs.filter((s) => !s.endDate || s.endDate.slice(0, 10) >= today).map((s) => one(s.plan));
  if (!planIds.length) return res;
  const { records: plans } = await zite.plans.findAll({ limit: 200 });
  for (const p of plans) {
    if (!planIds.includes(p.id)) continue;
    res.premiumArticles ||= !!p.premiumArticles;
    res.pdfReading ||= !!p.pdfReading;
    res.hardCopy ||= !!p.hardCopy;
  }
  return res;
}

export type AuthorView = {
  id: string; name: string; post: string; photo: string; bio: string; email: string;
  instagram: string; institution: string; count: number; penName: string;
  tier: { name: string; color: string } | null;
  badges: { name: string; icon: string; description: string }[];
};

export async function loadDirectory() {
  const [a, b, t, s, arts] = await Promise.all([
    zite.authors.findAll({ limit: 2000 }),
    zite.badges.findAll({ limit: 500 }),
    zite.tiers.findAll({ limit: 100 }),
    zite.sections.findAll({ limit: 200 }),
    zite.articles.findAll({ filters: { status: 'Published' }, limit: 2000 }),
  ]);
  const counts: Record<string, number> = {};
  for (const ar of arts.records) {
    const id = one(ar.author);
    if (id) counts[id] = (counts[id] ?? 0) + 1;
  }
  const tiers = [...t.records].sort((x, y) => (y.minArticles ?? 0) - (x.minArticles ?? 0));
  const badgeMap = new Map(b.records.map((x) => [x.id, x]));
  const authors = new Map<string, AuthorView>();
  for (const r of a.records) {
    const count = counts[r.id] ?? 0;
    const manual = r.manualTier ? tiers.find((x) => x.name === r.manualTier) : undefined;
    const tier = manual ?? tiers.find((x) => count >= (x.minArticles ?? 0) && (x.minArticles ?? 0) > 0);
    const bIds = Array.isArray(r.badges) ? r.badges : r.badges ? [r.badges] : [];
    authors.set(r.id, {
      id: r.id, name: r.name ?? 'Unknown', post: r.post ?? '', photo: r.photo ?? '', bio: r.bio ?? '',
      email: r.email ?? '', instagram: r.instagram ?? '', institution: r.institution ?? '', count, penName: r.showPenName ? r.penName ?? '' : '',
      tier: tier ? { name: tier.name ?? '', color: tier.color ?? '#FFD369' } : null,
      badges: bIds.map((id) => badgeMap.get(id)).filter(Boolean).map((x) => ({ name: x!.name ?? '', icon: x!.icon ?? '', description: x!.description ?? '' })),
    });
  }
  const sections = new Map(s.records.map((x) => [x.id, x]));
  const published = [...arts.records].sort((x, y) => (y.publishedAt ?? '').localeCompare(x.publishedAt ?? ''));
  return { authors, sections, published };
}

export type ArticleCard = {
  id: string; title: string; slug: string; excerpt: string; mainImage: string; section: string;
  authorName: string; authorPhoto: string; authorId: string; publishedAt: string; premium: boolean; featured: boolean;
};

export function toCard(
  ar: Awaited<ReturnType<typeof loadDirectory>>['published'][number],
  dir: Awaited<ReturnType<typeof loadDirectory>>,
): ArticleCard {
  const au = dir.authors.get(one(ar.author) ?? '');
  return {
    id: ar.id, title: ar.title ?? '', slug: ar.slug || ar.id, excerpt: ar.excerpt ?? '', mainImage: ar.mainImage ?? '',
    section: dir.sections.get(one(ar.section) ?? '')?.name ?? '', authorName: au?.name ?? '', authorPhoto: au?.photo ?? '',
    authorId: au?.id ?? '', publishedAt: ar.publishedAt ?? '', premium: !!ar.premium, featured: !!ar.featured,
  };
}

export const authorSchemaShape = {
  id: '', name: '', post: '', photo: '', bio: '', email: '', instagram: '', institution: '', count: 0, penName: '',
};

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

import { ZiteError } from 'zitejs/backend';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fail = (msg: string) => new ZiteError({ code: 'BAD_REQUEST' as any, message: msg, userFacingMessage: msg });
