module.exports = async function(fastify) {
  const { db } = fastify;

  const contactSchema = {
    tags: ['Contact'],
    body: {
      type: 'object',
      required: ['name', 'email', 'message'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 200 },
        email: { type: 'string', format: 'email', maxLength: 200 },
        phone: { type: 'string', maxLength: 50 },
        subject: { type: 'string', maxLength: 200 },
        message: { type: 'string', minLength: 1, maxLength: 10000 }
      }
    }
  };

  const prayerSchema = {
    tags: ['Contact'],
    body: {
      type: 'object',
      required: ['request'],
      properties: {
        name: { type: 'string', maxLength: 200 },
        email: { type: 'string', format: 'email', maxLength: 200 },
        request: { type: 'string', minLength: 1, maxLength: 10000 }
      }
    }
  };

  fastify.post('/api/contact', { schema: contactSchema }, async (req, reply) => {
    const { name, email, phone, subject, message } = req.body;
    db.prepare('INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)').run(name, email, phone || null, subject || null, message);
    reply.code(201).send({ ok: true });
  });

  fastify.post('/api/prayer', { schema: prayerSchema }, async (req, reply) => {
    const { name, email, request } = req.body;
    db.prepare('INSERT INTO prayer_requests (name, email, request) VALUES (?, ?, ?)').run(name || null, email || null, request);
    reply.code(201).send({ ok: true });
  });
};
