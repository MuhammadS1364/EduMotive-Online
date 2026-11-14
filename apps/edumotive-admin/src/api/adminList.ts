import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { assertAdmin } from '../lib/adminAuth';
import { zite } from 'zitejs/db';

const TABLES = ['siteSettings', 'sections', 'tiers', 'badges', 'authors', 'issues', 'articles', 'letters', 'programs', 'results', 'teamMembers', 'plans', 'subscriptions', 'ads', 'notes', 'profiles', 'adPlans', 'heroSlides', 'news', 'initiatives'] as const;

export default createEndpoint({
  description: 'Lists every record of a table for the admin panel',
  inputSchema: z.object({ key: z.string(), table: z.enum(TABLES) }),
  outputSchema: z.object({ records: z.array(z.record(z.string(), z.any())) }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = (zite as any)[input.table];
    const { records } = await client.findAll({ limit: 2000 });
    if (input.table === 'ads') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { records: records.map((r: any) => ({ ...r, paymentProof: Array.isArray(r.paymentProof) ? r.paymentProof[0]?.url ?? '' : r.paymentProof ?? '' })) };
    }
    return { records };
  },
});
