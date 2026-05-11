const jwt = require('jsonwebtoken');
const config = require('../config');
const SECRET = config.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '7d' });
}

async function authMiddleware(req, reply) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], SECRET);
    req.user = decoded;
  } catch {
    return reply.code(401).send({ error: 'Invalid or expired token' });
  }
}

module.exports = { generateToken, authMiddleware };
