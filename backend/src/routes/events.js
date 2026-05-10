const { authMiddleware } = require('../middleware/auth');

const eventBodySchema = {
  type: 'object',
  required: ['title_fr', 'title_en', 'title_ha', 'description_fr', 'description_en', 'description_ha', 'location_fr', 'location_en', 'location_ha', 'date', 'status'],
  properties: {
    title_fr: { type: 'string', minLength: 1, maxLength: 500 },
    title_en: { type: 'string', minLength: 1, maxLength: 500 },
    title_ha: { type: 'string', minLength: 1, maxLength: 500 },
    description_fr: { type: 'string', minLength: 1, maxLength: 10000 },
    description_en: { type: 'string', minLength: 1, maxLength: 10000 },
    description_ha: { type: 'string', minLength: 1, maxLength: 10000 },
    location_fr: { type: 'string', minLength: 1, maxLength: 500 },
    location_en: { type: 'string', minLength: 1, maxLength: 500 },
    location_ha: { type: 'string', minLength: 1, maxLength: 500 },
    date: { type: 'string', minLength: 1, maxLength: 20 },
    status: { type: 'string', enum: ['upcoming', 'past'] }
  }
};

module.exports = async function(fastify) {
  const { db, io } = fastify;

  fastify.get('/api/events', { schema: { tags: ['Events'] } }, async (req, reply) => {
    return db.prepare('SELECT * FROM events ORDER BY date ASC').all();
  });

  fastify.get('/api/events/:id', { schema: { tags: ['Events'], params: { type: 'object', properties: { id: { type: 'integer' } } } } }, async (req, reply) => {
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    if (!event) return reply.code(404).send({ error: 'Not found' });
    return event;
  });

  fastify.post('/api/events', { preHandler: [authMiddleware], schema: { tags: ['Events'], body: eventBodySchema } }, async (req, reply) => {
    const stmt = db.prepare('INSERT INTO events (title_fr,title_en,title_ha,description_fr,description_en,description_ha,location_fr,location_en,location_ha,date,status) VALUES (@title_fr,@title_en,@title_ha,@description_fr,@description_en,@description_ha,@location_fr,@location_en,@location_ha,@date,@status)');
    const result = stmt.run(req.body);
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
    io.emit('event:created', event);
    reply.code(201).send(event);
  });

  fastify.put('/api/events/:id', { preHandler: [authMiddleware], schema: { tags: ['Events'], body: eventBodySchema, params: { type: 'object', properties: { id: { type: 'integer' } } } } }, async (req, reply) => {
    const stmt = db.prepare('UPDATE events SET title_fr=@title_fr,title_en=@title_en,title_ha=@title_ha,description_fr=@description_fr,description_en=@description_en,description_ha=@description_ha,location_fr=@location_fr,location_en=@location_en,location_ha=@location_ha,date=@date,status=@status WHERE id=@id');
    stmt.run({ ...req.body, id: req.params.id });
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    io.emit('event:updated', event);
    return event;
  });

  fastify.delete('/api/events/:id', { preHandler: [authMiddleware], schema: { tags: ['Events'], params: { type: 'object', properties: { id: { type: 'integer' } } } } }, async (req, reply) => {
    db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
    io.emit('event:deleted', { id: Number(req.params.id) });
    return { ok: true };
  });
};
