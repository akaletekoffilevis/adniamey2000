const bcrypt = require('bcryptjs');
const { generateToken, authMiddleware } = require('../middleware/auth');

module.exports = async function(fastify) {
  const { db } = fastify;

  const loginSchema = {
    tags: ['Authentication'],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1 }
      }
    },
    config: { rateLimit: { max: 5, timeWindow: '1 minute' } }
  };

  const meSchema = {
    tags: ['Authentication'],
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: {
        authorization: { type: 'string', pattern: '^Bearer ' }
      }
    }
  };

  fastify.post('/api/auth/login', { schema: loginSchema }, async (req, reply) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return reply.code(401).send({ error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  });

  fastify.get('/api/auth/me', { preHandler: [authMiddleware], schema: meSchema }, async (req, reply) => {
    const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(req.user.id);
    if (!user) return reply.code(404).send({ error: 'User not found' });
    return user;
  });
};
