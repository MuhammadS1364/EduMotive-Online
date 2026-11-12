import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { fail, one } from '../lib/server';

export default createEndpoint({
  description: 'Publishes a post or story, deletes your post, or toggles a like',
  authenticated: true,
  inputSchema: z.object({
    action: z.enum(['post', 'story', 'delete', 'like']),
    postId: z.string().optional(),
    caption: z.string().optional(), campus: z.string().optional(), media: z.string().optional(),
    mediaType: z.enum(['Image', 'Video']).optional(), aspect: z.enum(['Square', 'Portrait', 'Landscape']).optional(),
  }),
  outputSchema: z.object({ ok: z.boolean(), liked: z.boolean().optional() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    const needProfile = async () => { if (!(await zite.profiles.findOne({ filters: { account: uid } }))) throw fail('Please create your profile first.'); };
    if (input.action === 'post') {
      await needProfile();
      if (!input.media) throw fail('Please add a photo or video.');
      await zite.posts.create({ record: { caption: input.caption ?? '', campus: input.campus ?? '', media: input.media, mediaType: input.mediaType ?? 'Image', aspect: input.aspect ?? 'Square', owner: uid } });
      return { ok: true };
    }
    if (input.action === 'story') {
      await needProfile();
      if (!input.media) throw fail('Please add a photo or video.');
      await zite.stories.create({ record: { caption: input.caption ?? '', media: input.media, mediaType: input.mediaType ?? 'Image', owner: uid } });
      return { ok: true };
    }
    if (!input.postId) throw fail('Missing post');
    if (input.action === 'delete') {
      const p = await zite.posts.findOne({ id: input.postId });
      if (!p || one(p.owner) !== uid) throw fail('You can only delete your own posts.');
      await zite.posts.delete({ id: p.id });
      return { ok: true };
    }
    const key = `${input.postId}:${uid}`;
    const existing = await zite.postLikes.findOne({ filters: { key } });
    if (existing) { await zite.postLikes.delete({ id: existing.id }); return { ok: true, liked: false }; }
    await zite.postLikes.create({ record: { key, post: input.postId, liker: uid } });
    return { ok: true, liked: true };
  },
});
