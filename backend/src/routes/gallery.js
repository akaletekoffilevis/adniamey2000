const { authMiddleware } = require('../middleware/auth');

const galleryBodySchema = {
  type: 'object',
  required: ['caption_fr', 'caption_en', 'caption_ha', 'category', 'gradient', 'date'],
  properties: {
    caption_fr: { type: 'string', minLength: 1, maxLength: 500 },
    caption_en: { type: 'string', minLength: 1, maxLength: 500 },
    caption_ha: { type: 'string', minLength: 1, maxLength: 500 },
    category: { type: 'string', minLength: 1, maxLength: 100 },
    gradient: { type: 'string', minLength: 1, maxLength: 200 },
    date: { type: 'string', minLength: 1, maxLength: 20 }
  }
};

module.exports = async function(fastify) {
  const { db, io } = fastify;

  fastify.get('/api/gallery', async (req, reply) => {
    return db.prepare('SELECT * FROM gallery ORDER BY date DESC').all();
  });

  fastify.get('/api/gallery/:id', async (req, reply) => {
    const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
    if (!item) return reply.code(404).send({ error: 'Not found' });
    return item;
  });

  fastify.post('/api/gallery', { preHandler: [authMiddleware], schema: { body: galleryBodySchema } }, async (req, reply) => {
    const stmt = db.prepare('INSERT INTO gallery (caption_fr,caption_en,caption_ha,category,gradient,date) VALUES (@caption_fr,@caption_en,@caption_ha,@category,@gradient,@date)');
    const result = stmt.run(req.body);
    const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);
    io.emit('gallery:created', item);
    reply.code(201).send(item);
  });

  fastify.put('/api/gallery/:id', { preHandler: [authMiddleware], schema: { body: galleryBodySchema } }, async (req, reply) => {
    const stmt = db.prepare('UPDATE gallery SET caption_fr=@caption_fr,caption_en=@caption_en,caption_ha=@caption_ha,category=@category,gradient=@gradient,date=@date WHERE id=@id');
    stmt.run({ ...req.body, id: req.params.id });
    const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
    io.emit('gallery:updated', item);
    return item;
  });

  fastify.delete('/api/gallery/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
    io.emit('gallery:deleted', { id: Number(req.params.id) });
    return { ok: true };
  });
};
