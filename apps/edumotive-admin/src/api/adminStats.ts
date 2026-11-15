import { z } from 'zod';
import { createEndpoint } from '../../../edumotive/src/zite-compat/backend';
import { assertAdmin } from '../lib/adminAuth';
import { zite } from '../../../edumotive/src/zite-compat/db';

export default createEndpoint({
  description: 'Counts items needing attention for the admin dashboard',
  inputSchema: z.object({ key: z.string() }),
  outputSchema: z.object({ stats: z.record(z.string(), z.number()) }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    const q = async (sql: string) => Number((await zite.sql({ query: sql })).rows[0]?.n ?? 0);
    const [published, pending, subsPending, subsActive, adsPending, letters, authors, profiles] = await Promise.all([
      q(`SELECT COUNT(*) AS n FROM "Articles" WHERE "status" = 'Published'`),
      q(`SELECT COUNT(*) AS n FROM "Articles" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Subscriptions" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Subscriptions" WHERE "status" = 'Active'`),
      q(`SELECT COUNT(*) AS n FROM "Ads" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Letters" WHERE "approved" IS NOT TRUE`),
      q(`SELECT COUNT(*) AS n FROM "Authors"`),
      q(`SELECT COUNT(*) AS n FROM "Profiles"`),
    ]);
    return { stats: { published, pending, subsPending, subsActive, adsPending, letters, authors, profiles } };
  },
});
