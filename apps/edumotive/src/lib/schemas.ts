import { z } from 'zod';

export const authorZ = z.object({
  id: z.string(), name: z.string(), post: z.string(), photo: z.string(), bio: z.string(), email: z.string(),
  instagram: z.string(), institution: z.string(), count: z.number(), penName: z.string(),
  tier: z.object({ name: z.string(), color: z.string() }).nullable(),
  badges: z.array(z.object({ name: z.string(), icon: z.string(), description: z.string() })),
});

export const cardZ = z.object({
  id: z.string(), title: z.string(), slug: z.string(), excerpt: z.string(), mainImage: z.string(), section: z.string(),
  authorName: z.string(), authorPhoto: z.string(), authorId: z.string(), publishedAt: z.string(),
  premium: z.boolean(), featured: z.boolean(),
});

export const issueZ = z.object({
  id: z.string(), title: z.string(), issueDate: z.string(), volume: z.string(), cover: z.string(),
  pdf: z.string(), description: z.string(),
});

export const accessZ = z.object({ premiumArticles: z.boolean(), pdfReading: z.boolean(), hardCopy: z.boolean() });

export const profileZ = z.object({
  id: z.string(), displayName: z.string(), role: z.string(), className: z.string(), institution: z.string(),
  username: z.string(), bio: z.string(), avatar: z.string(),
});
