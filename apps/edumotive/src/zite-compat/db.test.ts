import test from 'node:test';
import assert from 'node:assert/strict';
import { createTable, getUpload, isTursoEnabled, matchesFilters, saveUpload, zite } from './db';
import { getTursoClient } from './turso';
import { getAccess, loadDirectory, one, slugify, toCard } from '../lib/server';
import adminLogin from '../../../edumotive-admin/src/api/adminLogin';
import adminStats from '../../../edumotive-admin/src/api/adminStats';
import adminList from '../../../edumotive-admin/src/api/adminList';
import adminSave from '../../../edumotive-admin/src/api/adminSave';

test('matchesFilters checks scalars, arrays, and ignores undefined values', () => {
  const row = { id: 'a1', status: 'Published', tags: ['badge_1', 'badge_2'], featured: true };
  assert.equal(matchesFilters(row), true);
  assert.equal(matchesFilters(row, { status: 'Published', featured: undefined }), true);
  assert.equal(matchesFilters(row, { tags: 'badge_2' }), true);
  assert.equal(matchesFilters(row, { tags: 'badge_3' }), false);
  assert.equal(matchesFilters(row, { status: 'Draft' }), false);
});

test('createTable supports findAll, findOne, create, update, delete', async () => {
  const table = createTable<{ id: string; title: string; published?: boolean }>('item', [
    { id: 'item_1', title: 'First', published: true },
    { id: 'item_2', title: 'Second', published: false },
  ]);

  const all = await table.findAll({ filters: { published: true } });
  assert.equal(all.records.length, 1);
  assert.equal(all.records[0].id, 'item_1');

  const oneRec = await table.findOne({ id: 'item_2' });
  assert.equal(oneRec?.title, 'Second');

  const created = await table.create({ record: { title: 'Third', published: true } });
  assert.ok(created.id.startsWith('item_'));

  const updated = await table.update({ id: created.id, record: { title: 'Third Edited' } });
  assert.equal(updated.title, 'Third Edited');

  await assert.rejects(() => table.update({ id: 'missing', record: { title: 'x' } }));

  await table.delete({ id: created.id });
  assert.equal(await table.findOne({ id: created.id }), null);
});

test('one and slugify normalize values cleanly', () => {
  assert.equal(one(['auth_1', 'auth_2']), 'auth_1');
  assert.equal(one('sec_1'), 'sec_1');
  assert.equal(one(''), undefined);
  assert.equal(one(undefined), undefined);

  assert.equal(slugify('Hello, World! 2026 -- Campus Essay'), 'hello-world-2026-campus-essay');
  assert.equal(slugify('---Edge---'), 'edge');
});

test('loadDirectory counts published articles, resolves tiers and badges, and formats cards', async () => {
  const dir = await loadDirectory();
  assert.ok(dir.published.length >= 8);
  assert.ok(dir.sections.size >= 7);

  const auth1 = dir.authors.get('auth_1');
  assert.ok(auth1);
  assert.equal(auth1.name, 'Muhammad Shafee');
  assert.equal(auth1.count, 3);
  assert.equal(auth1.tier?.name, 'Laureate');
  assert.equal(auth1.badges.length, 2);

  const card = toCard(dir.published[0], dir);
  assert.ok(card.id);
  assert.ok(card.slug);
  assert.ok(card.section.length > 0);
});

test('getAccess grants entitlements for active demo subscriber and denies guests', async () => {
  const guestAccess = await getAccess(undefined);
  assert.deepEqual(guestAccess, { premiumArticles: false, pdfReading: false, hardCopy: false });

  const memberAccess = await getAccess('user_student_demo');
  assert.deepEqual(memberAccess, { premiumArticles: true, pdfReading: true, hardCopy: true });

  const seededIssues = await zite.issues.findAll({ filters: { published: true } });
  assert.equal(seededIssues.records.length, 2);
});

test('zite.sql evaluates COUNT queries across magazine and admin tables', async () => {
  const pubRes = await zite.sql({ query: `SELECT COUNT(*) AS n FROM "Articles" WHERE "status" = 'Published'` });
  assert.ok(Number(pubRes.rows[0]?.n) >= 8);

  const authRes = await zite.sql({ query: `SELECT COUNT(*) AS n FROM "Authors"` });
  assert.ok(Number(authRes.rows[0]?.n) >= 4);

  const lettersPending = await zite.sql({ query: `SELECT COUNT(*) AS n FROM "Letters" WHERE "approved" IS NOT TRUE` });
  assert.equal(Number(lettersPending.rows[0]?.n), 0);
});

test('adminLogin, adminStats, adminList, and adminSave share the live zite datastore', async () => {
  await assert.rejects(() =>
    adminLogin.execute({ input: { email: 'edumotive4@gmail.com', password: 'wrong' }, context: {} }),
  );

  const { key } = await adminLogin.execute({
    input: { email: 'shafeealam1364@gmail.com', password: 'edu4motive@tri' },
    context: {},
  });
  assert.equal(key, 'shafeealam1364@gmail.com:edu4motive@tri');

  const statsBefore = await adminStats.execute({ input: { key }, context: {} });
  const initialPublished = statsBefore.stats.published;

  const created = await adminSave.execute({
    input: {
      key,
      table: 'articles',
      record: {
        title: 'Editorial Admin Integration Essay',
        status: 'Published',
        section: 'sec_blueprint',
        author: 'auth_1',
        excerpt: 'Published from admin panel.',
        content: 'Full editorial content body for testing.',
      },
    },
    context: {},
  });
  assert.ok(created.id);

  const statsAfter = await adminStats.execute({ input: { key }, context: {} });
  assert.equal(statsAfter.stats.published, initialPublished + 1);

  const listed = await adminList.execute({ input: { key, table: 'articles' }, context: {} });
  assert.ok(listed.records.some((r) => r.id === created.id && r.status === 'Published'));

  await adminSave.execute({
    input: { key, table: 'articles', deleteId: created.id, record: {} },
    context: {},
  });
});

test('Turso is active and saveUpload/getUpload persist binary uploads cleanly', async () => {
  assert.equal(isTursoEnabled(), true);
  const upId = `up_test_${Date.now().toString(36)}`;
  const payload = Buffer.from('turso-upload-test-payload', 'utf8');
  await saveUpload(upId, 'text/plain', payload);
  const loaded = await getUpload(upId);
  assert.ok(loaded);
  assert.equal(loaded.mime, 'text/plain');
  assert.equal(loaded.buffer.toString('utf8'), 'turso-upload-test-payload');
  await getTursoClient().execute({ sql: `DELETE FROM "Uploads" WHERE "id" = ?`, args: [upId] });
});

