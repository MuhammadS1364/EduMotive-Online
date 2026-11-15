import { createClient, type Client, type InStatement, type InValue } from '@libsql/client/http';
import fs from 'node:fs';
import path from 'node:path';
import { INITIAL_SEED } from './seed';
import { matchesFilters, type BaseRecord, type FindAllArgs, type FindOneArgs } from './types';

function loadDotEnvIfNeeded(): void {
  if (process.env.TURSO_DATABASE_URL) return;
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '../.env'),
    path.resolve(process.cwd(), '../../.env'),
  ];
  for (const filePath of candidates) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (key && process.env[key] === undefined) {
          process.env[key] = val;
        }
      }
      if (process.env.TURSO_DATABASE_URL) break;
    } catch {
      // Ignore unreadable candidate paths
    }
  }
}

loadDotEnvIfNeeded();

type ColumnType = 'TEXT' | 'INTEGER' | 'REAL';
type ColumnDef = { name: string; type: ColumnType };

const TABLE_SCHEMAS: Record<keyof typeof INITIAL_SEED, { sqlTable: string; cols: ColumnDef[] }> = {
  siteSettings: {
    sqlTable: 'SiteSettings',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'upiId', type: 'TEXT' },
      { name: 'showPrograms', type: 'INTEGER' },
      { name: 'showResults', type: 'INTEGER' },
      { name: 'showSubscribe', type: 'INTEGER' },
      { name: 'contactEmail', type: 'TEXT' },
    ],
  },
  sections: {
    sqlTable: 'Sections',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'visible', type: 'INTEGER' },
      { name: 'sortOrder', type: 'INTEGER' },
    ],
  },
  tiers: {
    sqlTable: 'Tiers',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'minArticles', type: 'INTEGER' },
      { name: 'color', type: 'TEXT' },
    ],
  },
  badges: {
    sqlTable: 'Badges',
    cols: [{ name: 'name', type: 'TEXT' }],
  },
  authors: {
    sqlTable: 'Authors',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'post', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'institution', type: 'TEXT' },
      { name: 'account', type: 'TEXT' },
      { name: 'manualTier', type: 'TEXT' },
    ],
  },
  issues: {
    sqlTable: 'Issues',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'volume', type: 'TEXT' },
      { name: 'issueDate', type: 'TEXT' },
      { name: 'published', type: 'INTEGER' },
    ],
  },
  articles: {
    sqlTable: 'Articles',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'slug', type: 'TEXT' },
      { name: 'section', type: 'TEXT' },
      { name: 'author', type: 'TEXT' },
      { name: 'issue', type: 'TEXT' },
      { name: 'status', type: 'TEXT' },
      { name: 'premium', type: 'INTEGER' },
      { name: 'featured', type: 'INTEGER' },
      { name: 'publishedAt', type: 'TEXT' },
      { name: 'submittedBy', type: 'TEXT' },
    ],
  },
  letters: {
    sqlTable: 'Letters',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'recipient', type: 'TEXT' },
      { name: 'article', type: 'TEXT' },
      { name: 'approved', type: 'INTEGER' },
    ],
  },
  programs: {
    sqlTable: 'Programs',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'date', type: 'TEXT' },
      { name: 'mode', type: 'TEXT' },
      { name: 'visible', type: 'INTEGER' },
    ],
  },
  results: {
    sqlTable: 'Results',
    cols: [
      { name: 'studentName', type: 'TEXT' },
      { name: 'program', type: 'TEXT' },
      { name: 'event', type: 'TEXT' },
      { name: 'visible', type: 'INTEGER' },
    ],
  },
  teamMembers: {
    sqlTable: 'TeamMembers',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'post', type: 'TEXT' },
      { name: 'sortOrder', type: 'INTEGER' },
    ],
  },
  plans: {
    sqlTable: 'Plans',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'price', type: 'REAL' },
      { name: 'durationMonths', type: 'INTEGER' },
      { name: 'active', type: 'INTEGER' },
    ],
  },
  subscriptions: {
    sqlTable: 'Subscriptions',
    cols: [
      { name: 'fullName', type: 'TEXT' },
      { name: 'plan', type: 'TEXT' },
      { name: 'subscriber', type: 'TEXT' },
      { name: 'status', type: 'TEXT' },
      { name: 'trackingNumber', type: 'TEXT' },
      { name: 'startDate', type: 'TEXT' },
      { name: 'endDate', type: 'TEXT' },
      { name: 'deliveryStage', type: 'TEXT' },
    ],
  },
  ads: {
    sqlTable: 'Ads',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'advertiser', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'status', type: 'TEXT' },
      { name: 'endDate', type: 'TEXT' },
    ],
  },
  profiles: {
    sqlTable: 'Profiles',
    cols: [
      { name: 'displayName', type: 'TEXT' },
      { name: 'account', type: 'TEXT' },
      { name: 'role', type: 'TEXT' },
      { name: 'username', type: 'TEXT' },
    ],
  },
  notes: {
    sqlTable: 'Notes',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'status', type: 'TEXT' },
      { name: 'kind', type: 'TEXT' },
    ],
  },
  posts: {
    sqlTable: 'Posts',
    cols: [{ name: 'author', type: 'TEXT' }],
  },
  postLikes: {
    sqlTable: 'PostLikes',
    cols: [
      { name: 'post', type: 'TEXT' },
      { name: 'user', type: 'TEXT' },
    ],
  },
  stories: {
    sqlTable: 'Stories',
    cols: [{ name: 'author', type: 'TEXT' }],
  },
  adPlans: {
    sqlTable: 'AdPlans',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'mediaType', type: 'TEXT' },
      { name: 'price', type: 'REAL' },
      { name: 'active', type: 'INTEGER' },
    ],
  },
  heroSlides: {
    sqlTable: 'HeroSlides',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'sortOrder', type: 'INTEGER' },
      { name: 'active', type: 'INTEGER' },
    ],
  },
  news: {
    sqlTable: 'News',
    cols: [
      { name: 'title', type: 'TEXT' },
      { name: 'publishedDate', type: 'TEXT' },
      { name: 'published', type: 'INTEGER' },
    ],
  },
  initiatives: {
    sqlTable: 'Initiatives',
    cols: [
      { name: 'name', type: 'TEXT' },
      { name: 'sortOrder', type: 'INTEGER' },
    ],
  },
};

export function isTursoEnabled(): boolean {
  loadDotEnvIfNeeded();
  return Boolean(process.env.TURSO_DATABASE_URL?.trim());
}

let cachedClient: Client | null = null;
let readyPromise: Promise<void> | null = null;

export function getTursoClient(): Client {
  if (cachedClient) return cachedClient;
  loadDotEnvIfNeeded();
  const rawUrl = process.env.TURSO_DATABASE_URL?.trim();
  if (!rawUrl) {
    throw new Error('TURSO_DATABASE_URL is not configured');
  }
  const url = rawUrl.replace(/^libsql:\/\//i, 'https://');
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  cachedClient = createClient({
    url,
    ...(authToken ? { authToken } : {}),
  });
  return cachedClient;
}

function toSqlValue(val: unknown, colType: ColumnType): InValue {
  if (val === undefined || val === null) return null;
  if (colType === 'INTEGER') {
    if (typeof val === 'boolean') return val ? 1 : 0;
    if (typeof val === 'number' && Number.isFinite(val)) return Math.trunc(val);
    const n = Number(val);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  }
  if (colType === 'REAL') {
    if (typeof val === 'number' && Number.isFinite(val)) return val;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  }
  if (Array.isArray(val) || typeof val === 'object') {
    return JSON.stringify(val);
  }
  return String(val);
}

function buildInsertStatement(
  tableKey: keyof typeof INITIAL_SEED,
  rec: BaseRecord,
  orIgnore = false,
): InStatement {
  const def = TABLE_SCHEMAS[tableKey];
  const colNames = ['id', 'created', ...def.cols.map((c) => c.name), '_doc'];
  const quotedCols = colNames.map((c) => `"${c}"`).join(', ');
  const placeholders = colNames.map(() => '?').join(', ');
  const args: InValue[] = [
    String(rec.id),
    typeof rec.created === 'string' ? rec.created : new Date().toISOString(),
    ...def.cols.map((c) => toSqlValue(rec[c.name], c.type)),
    JSON.stringify(rec),
  ];
  const verb = orIgnore ? 'INSERT OR IGNORE' : 'INSERT';
  return {
    sql: `${verb} INTO "${def.sqlTable}" (${quotedCols}) VALUES (${placeholders})`,
    args,
  };
}

function buildUpdateStatement(tableKey: keyof typeof INITIAL_SEED, rec: BaseRecord): InStatement {
  const def = TABLE_SCHEMAS[tableKey];
  const setCols = ['created', ...def.cols.map((c) => c.name), '_doc'];
  const setSql = setCols.map((c) => `"${c}" = ?`).join(', ');
  const args: InValue[] = [
    typeof rec.created === 'string' ? rec.created : new Date().toISOString(),
    ...def.cols.map((c) => toSqlValue(rec[c.name], c.type)),
    JSON.stringify(rec),
    String(rec.id),
  ];
  return {
    sql: `UPDATE "${def.sqlTable}" SET ${setSql} WHERE "id" = ?`,
    args,
  };
}

export async function ensureTursoReady(): Promise<void> {
  if (!isTursoEnabled()) return;
  if (readyPromise) return readyPromise;

  readyPromise = (async () => {
    const client = getTursoClient();

    const ddlStatements: InStatement[] = [
      `CREATE TABLE IF NOT EXISTS "_meta" ("key" TEXT PRIMARY KEY, "value" TEXT NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS "Uploads" ("id" TEXT PRIMARY KEY, "mime" TEXT NOT NULL, "data_base64" TEXT NOT NULL, "created" TEXT NOT NULL)`,
    ];

    for (const def of Object.values(TABLE_SCHEMAS)) {
      const extraCols = def.cols.map((c) => `"${c.name}" ${c.type}`).join(', ');
      const colList = ['"id" TEXT PRIMARY KEY', '"created" TEXT', extraCols, '"_doc" TEXT NOT NULL']
        .filter(Boolean)
        .join(', ');
      ddlStatements.push(`CREATE TABLE IF NOT EXISTS "${def.sqlTable}" (${colList})`);
    }

    await client.batch(ddlStatements, 'write');

    const metaRes = await client.execute({
      sql: `SELECT "value" FROM "_meta" WHERE "key" = 'seeded_v1' LIMIT 1`,
      args: [],
    });

    if (metaRes.rows.length === 0) {
      const seedStatements: InStatement[] = [];
      for (const key of Object.keys(INITIAL_SEED) as Array<keyof typeof INITIAL_SEED>) {
        for (const record of INITIAL_SEED[key]) {
          seedStatements.push(
            buildInsertStatement(
              key,
              {
                created: (record as BaseRecord).created ?? '2026-09-01T00:00:00Z',
                ...record,
              },
              true,
            ),
          );
        }
      }
      seedStatements.push({
        sql: `INSERT OR REPLACE INTO "_meta" ("key", "value") VALUES ('seeded_v1', ?)`,
        args: [new Date().toISOString()],
      });
      await client.batch(seedStatements, 'write');
    }
  })().catch((err) => {
    readyPromise = null;
    throw err;
  });

  return readyPromise;
}

let seqCounter = 1;

export function createTursoTable<T extends BaseRecord>(
  tableKey: keyof typeof INITIAL_SEED,
  prefix: string,
) {
  const def = TABLE_SCHEMAS[tableKey];

  return {
    async findAll(args: FindAllArgs<T> = {}): Promise<{ records: T[] }> {
      await ensureTursoReady();
      const client = getTursoClient();
      const limit = args.limit ?? 1000;
      const res = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" ORDER BY rowid ASC`,
        args: [],
      });
      const out: T[] = [];
      for (const row of res.rows) {
        const parsed = JSON.parse(String(row._doc)) as T;
        if (matchesFilters(parsed, args.filters)) {
          out.push(parsed);
          if (out.length >= limit) break;
        }
      }
      return { records: out };
    },

    async findOne(args: FindOneArgs<T>): Promise<T | null> {
      await ensureTursoReady();
      const client = getTursoClient();
      if (args.id) {
        const res = await client.execute({
          sql: `SELECT "_doc" FROM "${def.sqlTable}" WHERE "id" = ? LIMIT 1`,
          args: [args.id],
        });
        if (!res.rows.length) return null;
        return JSON.parse(String(res.rows[0]._doc)) as T;
      }
      const res = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" ORDER BY rowid ASC`,
        args: [],
      });
      for (const row of res.rows) {
        const parsed = JSON.parse(String(row._doc)) as T;
        if (matchesFilters(parsed, args.filters)) {
          return parsed;
        }
      }
      return null;
    },

    async create(args: { record: Partial<T> }): Promise<T> {
      await ensureTursoReady();
      const client = getTursoClient();
      const id =
        (args.record.id as string | undefined) ||
        `${prefix}_${Date.now().toString(36)}_${seqCounter++}`;
      const rec = {
        created: new Date().toISOString(),
        ...structuredClone(args.record),
        id,
      } as unknown as T;
      await client.execute(buildInsertStatement(tableKey, rec));
      return structuredClone(rec);
    },

    async update(args: { id: string; record: Partial<T> }): Promise<T> {
      await ensureTursoReady();
      const client = getTursoClient();
      const existingRes = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" WHERE "id" = ? LIMIT 1`,
        args: [args.id],
      });
      if (!existingRes.rows.length) {
        throw new Error(`Record ${args.id} not found in ${prefix}`);
      }
      const prev = JSON.parse(String(existingRes.rows[0]._doc)) as T;
      const next = { ...prev, ...structuredClone(args.record), id: args.id } as T;
      await client.execute(buildUpdateStatement(tableKey, next));
      return structuredClone(next);
    },

    async delete(args: { id: string }): Promise<{ id: string }> {
      await ensureTursoReady();
      const client = getTursoClient();
      await client.execute({
        sql: `DELETE FROM "${def.sqlTable}" WHERE "id" = ?`,
        args: [args.id],
      });
      return { id: args.id };
    },
  };
}

export async function executeTursoSql(query: string): Promise<{ rows: Record<string, unknown>[] }> {
  await ensureTursoReady();
  const client = getTursoClient();
  const res = await client.execute(query);
  return {
    rows: res.rows.map((r) => ({ ...r })) as Record<string, unknown>[],
  };
}

export async function saveTursoUpload(id: string, mime: string, buffer: Buffer): Promise<void> {
  await ensureTursoReady();
  const client = getTursoClient();
  await client.execute({
    sql: `INSERT OR REPLACE INTO "Uploads" ("id", "mime", "data_base64", "created") VALUES (?, ?, ?, ?)`,
    args: [id, mime, buffer.toString('base64'), new Date().toISOString()],
  });
}

export async function getTursoUpload(id: string): Promise<{ mime: string; buffer: Buffer } | null> {
  await ensureTursoReady();
  const client = getTursoClient();
  const res = await client.execute({
    sql: `SELECT "mime", "data_base64" FROM "Uploads" WHERE "id" = ? LIMIT 1`,
    args: [id],
  });
  if (!res.rows.length) return null;
  return {
    mime: String(res.rows[0].mime),
    buffer: Buffer.from(String(res.rows[0].data_base64), 'base64'),
  };
}
