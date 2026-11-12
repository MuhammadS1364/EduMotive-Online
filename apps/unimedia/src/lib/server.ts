import { z } from 'zod';
import { zite } from 'zitejs/db';
import { ZiteError } from 'zitejs/backend';

export const one = (v: unknown): string | undefined => (Array.isArray(v) ? v[0] : typeof v === 'string' && v ? v : undefined);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fail = (msg: string) => new ZiteError({ code: 'BAD_REQUEST' as any, message: msg, userFacingMessage: msg });

export const personZ = z.object({ userId: z.string(), name: z.string(), username: z.string(), avatar: z.string(), institution: z.string(), className: z.string(), bio: z.string(), role: z.string() });
export type Person = z.infer<typeof personZ>;

export const postZ = z.object({
  id: z.string(), caption: z.string(), campus: z.string(), media: z.string(), mediaType: z.string(), aspect: z.string(),
  created: z.string(), likes: z.number(), liked: z.boolean(), owner: personZ,
});

export async function people() {
  const { records } = await zite.profiles.findAll({ limit: 2000 });
  const map = new Map<string, Person>();
  for (const p of records) {
    const uid = one(p.account);
    if (uid) map.set(uid, { userId: uid, name: p.displayName ?? 'Student', username: p.username ?? '', avatar: p.avatar ?? '', institution: p.institution ?? '', className: p.className ?? '', bio: p.bio ?? '', role: p.role ?? 'Student' });
  }
  return map;
}

export const unknownPerson = (uid: string): Person => ({ userId: uid, name: 'Student', username: '', avatar: '', institution: '', className: '', bio: '', role: 'Student' });
