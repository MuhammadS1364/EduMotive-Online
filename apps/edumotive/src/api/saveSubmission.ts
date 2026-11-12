import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { one, slugify, fail } from '../lib/server';

export default createEndpoint({
  description: 'Saves a draft or submits an article for admin review',
  authenticated: true,
  inputSchema: z.object({
    id: z.string().optional(), title: z.string().min(3), excerpt: z.string(), content: z.string().min(20),
    mainImage: z.string(), imageCaption: z.string(), sectionId: z.string(), submit: z.boolean(),
  }),
  outputSchema: z.object({ id: z.string() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    const profile = await zite.profiles.findOne({ filters: { account: uid } });
    if (!profile) throw fail('Please complete your profile first.');
    let author = await zite.authors.findOne({ filters: { account: uid } });
    if (!author) author = await zite.authors.create({ record: { name: profile.displayName, institution: profile.institution, photo: profile.avatar || null, post: 'Contributor', email: context.user.email, account: uid } });
    const record = {
      title: input.title, excerpt: input.excerpt, content: input.content, mainImage: input.mainImage || null,
      imageCaption: input.imageCaption, section: input.sectionId || null, author: author.id,
      status: input.submit ? 'Pending' : 'Draft', submittedBy: uid,
    };
    if (input.id) {
      const ex = await zite.articles.findOne({ id: input.id });
      if (!ex || one(ex.submittedBy) !== uid) throw fail('Article not found.');
      if (ex.status === 'Published') throw fail('Published articles can only be edited by the editorial team.');
      await zite.articles.update({ id: input.id, record });
      return { id: input.id };
    }
    const created = await zite.articles.create({ record: { ...record, slug: `${slugify(input.title)}-${Date.now().toString(36)}` } });
    return { id: created.id };
  },
});
