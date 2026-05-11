const { authMiddleware } = require('../middleware/auth');
const { fillAllLangs } = require('../utils/translate');

const VALID_TABLES = new Set([
  'testimonials', 'schedules', 'ministries', 'doctrine', 'history_blocks',
  'site_stats', 'contact_details', 'social_links', 'donation_methods'
]);

function createCRUD(fastify, { route, table, columns, useFillLangs }) {
  if (!VALID_TABLES.has(table)) throw new Error('Invalid table: ' + table);
  const { db, io } = fastify;

  const cols = columns.join(', ');
  const placeholders = columns.map((c) => '@' + c).join(', ');
  const setClause = columns.map((c) => c + '=@' + c).join(', ');

  function bumpVersion() {
    db.prepare('UPDATE cache_version SET version = version + 1 WHERE id = 1').run();
    const v = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    io.emit('site:updated', { version: v.version });
    return v.version;
  }

  const schema = { tags: ['Admin'] };

  // LIST
  fastify.get('/api/admin/' + route, { preHandler: [authMiddleware], schema }, async () => {
    return db.prepare('SELECT * FROM ' + table + ' ORDER BY sort_order ASC, id ASC').all();
  });

  // GET BY ID
  fastify.get('/api/admin/' + route + '/:id', { preHandler: [authMiddleware], schema }, async (req, reply) => {
    const item = db.prepare('SELECT * FROM ' + table + ' WHERE id = ?').get(req.params.id);
    if (!item) return reply.code(404).send({ error: 'Not found' });
    return item;
  });

  // CREATE
  fastify.post('/api/admin/' + route, { preHandler: [authMiddleware], schema }, async (req, reply) => {
    const data = useFillLangs ? fillAllLangs(req.body) : req.body;
    const r = db.prepare('INSERT INTO ' + table + ' (' + cols + ') VALUES (' + placeholders + ')').run(data);
    const item = db.prepare('SELECT * FROM ' + table + ' WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });

  // UPDATE
  fastify.put('/api/admin/' + route + '/:id', { preHandler: [authMiddleware], schema }, async (req, reply) => {
    const data = useFillLangs ? fillAllLangs(req.body) : req.body;
    data.id = req.params.id;
    db.prepare('UPDATE ' + table + ' SET ' + setClause + ' WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM ' + table + ' WHERE id = ?').get(req.params.id);
  });

  // DELETE
  fastify.delete('/api/admin/' + route + '/:id', { preHandler: [authMiddleware], schema }, async (req, reply) => {
    db.prepare('DELETE FROM ' + table + ' WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });
}

module.exports = async function (fastify) {
  const { db, io } = fastify;

  // SETTINGS (custom handler, different from CRUD)
  fastify.put('/api/admin/settings', { preHandler: [authMiddleware], schema: { tags: ['Admin'] } }, async (req, reply) => {
    const body = req.body;
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, String(body[key]));
      }
    }
    bumpVersion();
    return { ok: true };
  });

  fastify.get('/api/admin/settings', { preHandler: [authMiddleware], schema: { tags: ['Admin'] } }, async (req, reply) => {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const obj = {};
    for (let i = 0; i < rows.length; i++) obj[rows[i].key] = rows[i].value;
    return obj;
  });

  // CRUD sections
  createCRUD(fastify, {
    route: 'testimonials',
    table: 'testimonials',
    columns: ['author', 'content_fr', 'content_en', 'content_ha', 'content_it', 'role_fr', 'role_en', 'role_ha', 'role_it', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'schedules',
    table: 'schedules',
    columns: ['day_fr', 'day_en', 'day_ha', 'day_it', 'time_start', 'time_end', 'label_fr', 'label_en', 'label_ha', 'label_it', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'ministries',
    table: 'ministries',
    columns: ['name_fr', 'name_en', 'name_ha', 'name_it', 'description_fr', 'description_en', 'description_ha', 'description_it', 'leader', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'doctrine',
    table: 'doctrine',
    columns: ['title_fr', 'title_en', 'title_ha', 'title_it', 'content_fr', 'content_en', 'content_ha', 'content_it', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'history',
    table: 'history_blocks',
    columns: ['section', 'content_fr', 'content_en', 'content_ha', 'content_it', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'stats',
    table: 'site_stats',
    columns: ['label_fr', 'label_en', 'label_ha', 'label_it', 'value_text', 'suffix', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'contacts',
    table: 'contact_details',
    columns: ['type', 'value', 'label_fr', 'label_en', 'label_ha', 'label_it', 'sort_order'],
    useFillLangs: true,
  });

  createCRUD(fastify, {
    route: 'social',
    table: 'social_links',
    columns: ['platform', 'url', 'icon_svg', 'sort_order'],
    useFillLangs: false,
  });

  createCRUD(fastify, {
    route: 'donations',
    table: 'donation_methods',
    columns: ['method', 'number', 'sort_order'],
    useFillLangs: false,
  });
};
