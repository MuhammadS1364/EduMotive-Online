import { INITIAL_SEED } from './seed';
import {
  createTursoTable,
  ensureTursoReady,
  executeTursoSql,
  getTursoUpload,
  isTursoEnabled,
  saveTursoUpload,
} from './turso';
import {
  matchesFilters,
  type AdPlanRecord,
  type AdRecord,
  type ArticleRecord,
  type AuthorRecord,
  type BadgeRecord,
  type BaseRecord,
  type FindAllArgs,
  type FindOneArgs,
  type HeroSlideRecord,
  type InitiativeRecord,
  type IssueRecord,
  type LetterRecord,
  type NewsRecord,
  type PlanRecord,
  type ProfileRecord,
  type ProgramRecord,
  type ResultRecord,
  type SectionRecord,
  type SiteSettingsRecord,
  type SubscriptionRecord,
  type TeamMemberRecord,
  type TierRecord,
} from './types';

export * from './types';
export { isTursoEnabled };

export function createTable<T extends BaseRecord>(prefix: string, initial: T[] = []) {
  const rows = new Map<string, T>(initial.map((r) => [r.id, structuredClone(r)]));
  let seq = initial.length + 1;

  return {
    async findAll(args: FindAllArgs<T> = {}): Promise<{ records: T[] }> {
      const limit = args.limit ?? 1000;
      const out: T[] = [];
      for (const row of rows.values()) {
        if (matchesFilters(row, args.filters)) {
          out.push(structuredClone(row));
          if (out.length >= limit) break;
        }
      }
      return { records: out };
    },
    async findOne(args: FindOneArgs<T>): Promise<T | null> {
      if (args.id) {
        const hit = rows.get(args.id);
        return hit ? structuredClone(hit) : null;
      }
      for (const row of rows.values()) {
        if (matchesFilters(row, args.filters)) {
          return structuredClone(row);
        }
      }
      return null;
    },
    async create(args: { record: Partial<T> }): Promise<T> {
      const id = (args.record.id as string | undefined) || `${prefix}_${Date.now().toString(36)}_${seq++}`;
      const rec = {
        created: new Date().toISOString(),
        ...structuredClone(args.record),
        id,
      } as unknown as T;
      rows.set(id, rec);
      return structuredClone(rec);
    },
    async update(args: { id: string; record: Partial<T> }): Promise<T> {
      const prev = rows.get(args.id);
      if (!prev) {
        throw new Error(`Record ${args.id} not found in ${prefix}`);
      }
      const next = { ...prev, ...structuredClone(args.record), id: args.id } as T;
      rows.set(args.id, next);
      return structuredClone(next);
    },
    async delete(args: { id: string }): Promise<{ id: string }> {
      rows.delete(args.id);
      return { id: args.id };
    },
  };
}

function makeTable<K extends keyof typeof INITIAL_SEED, T extends BaseRecord>(
  key: K,
  prefix: string,
) {
  if (isTursoEnabled()) {
    return createTursoTable<T>(key, prefix);
  }
  return createTable<T>(prefix, INITIAL_SEED[key] as unknown as T[]);
}

const memoryUploads = new Map<string, { mime: string; buffer: Buffer }>();

export async function ensureDbReady(): Promise<void> {
  if (isTursoEnabled()) {
    await ensureTursoReady();
  }
}

export async function saveUpload(id: string, mime: string, buffer: Buffer): Promise<void> {
  if (isTursoEnabled()) {
    await saveTursoUpload(id, mime, buffer);
    return;
  }
  memoryUploads.set(id, { mime, buffer });
}

export async function getUpload(id: string): Promise<{ mime: string; buffer: Buffer } | null> {
  if (isTursoEnabled()) {
    return getTursoUpload(id);
  }
  return memoryUploads.get(id) ?? null;
}

export const zite = {
  siteSettings: makeTable<'siteSettings', SiteSettingsRecord>('siteSettings', 'site'),
  sections: makeTable<'sections', SectionRecord>('sections', 'sec'),
  tiers: makeTable<'tiers', TierRecord>('tiers', 'tier'),
  badges: makeTable<'badges', BadgeRecord>('badges', 'badge'),
  authors: makeTable<'authors', AuthorRecord>('authors', 'auth'),
  issues: makeTable<'issues', IssueRecord>('issues', 'issue'),
  articles: makeTable<'articles', ArticleRecord>('articles', 'art'),
  letters: makeTable<'letters', LetterRecord>('letters', 'let'),
  programs: makeTable<'programs', ProgramRecord>('programs', 'prog'),
  results: makeTable<'results', ResultRecord>('results', 'res'),
  teamMembers: makeTable<'teamMembers', TeamMemberRecord>('teamMembers', 'team'),
  plans: makeTable<'plans', PlanRecord>('plans', 'plan'),
  subscriptions: makeTable<'subscriptions', SubscriptionRecord>('subscriptions', 'sub'),
  ads: makeTable<'ads', AdRecord>('ads', 'ad'),
  profiles: makeTable<'profiles', ProfileRecord>('profiles', 'prof'),
  notes: makeTable<'notes', BaseRecord>('notes', 'note'),
  posts: makeTable<'posts', BaseRecord>('posts', 'post'),
  postLikes: makeTable<'postLikes', BaseRecord>('postLikes', 'like'),
  stories: makeTable<'stories', BaseRecord>('stories', 'story'),
  adPlans: makeTable<'adPlans', AdPlanRecord>('adPlans', 'adplan'),
  heroSlides: makeTable<'heroSlides', HeroSlideRecord>('heroSlides', 'slide'),
  news: makeTable<'news', NewsRecord>('news', 'news'),
  initiatives: makeTable<'initiatives', InitiativeRecord>('initiatives', 'ini'),

  async sql({ query }: { query: string }): Promise<{ rows: Record<string, unknown>[] }> {
    if (isTursoEnabled()) {
      return executeTursoSql(query);
    }
    const tableMatch = /FROM\s+"?([A-Za-z0-9_]+)"?/i.exec(query);
    if (!tableMatch) return { rows: [{ n: 0 }] };
    const rawTable = tableMatch[1];
    const tableKey = rawTable.charAt(0).toLowerCase() + rawTable.slice(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = (zite as any)[tableKey];
    if (!client || typeof client.findAll !== 'function') {
      return { rows: [{ n: 0 }] };
    }
    const { records } = (await client.findAll({ limit: 5000 })) as { records: Record<string, unknown>[] };
    const eqMatch = /WHERE\s+"?([A-Za-z0-9_]+)"?\s*=\s*'([^']*)'/i.exec(query);
    if (eqMatch) {
      const [, col, val] = eqMatch;
      return { rows: [{ n: records.filter((r) => r[col] === val).length }] };
    }
    const notTrueMatch = /WHERE\s+"?([A-Za-z0-9_]+)"?\s+IS\s+NOT\s+TRUE/i.exec(query);
    if (notTrueMatch) {
      const [, col] = notTrueMatch;
      return { rows: [{ n: records.filter((r) => r[col] !== true).length }] };
    }
    return { rows: [{ n: records.length }] };
  },
};
