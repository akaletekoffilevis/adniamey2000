const Fastify = require('fastify');
const { Server } = require('socket.io');
const { initDB } = require('./db/schema');
const config = require('./config');

function buildApp(opts = {}) {
  const app = Fastify({
    logger: true,
    bodyLimit: config.BODY_LIMIT,
    ...opts,
  });

  // Plugins
  app.register(require('@fastify/cors'), { origin: config.CORS_ORIGIN });
  app.register(require('@fastify/static'), { root: config.FRONTEND_PATH, prefix: '/', list: false });
  app.register(require('@fastify/rate-limit'), {
    global: true,
    max: config.RATE_LIMIT.max,
    timeWindow: config.RATE_LIMIT.timeWindow,
    keyGenerator: (req) => req.ip,
  });
  app.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'AD Niamey 2000 API',
        description: "API REST du site officiel de l'Église AD Niamey 2000",
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:' + config.PORT, description: 'Développement' }],
    },
  });
  app.register(require('@fastify/swagger-ui'), { routePrefix: '/docs' });

  // Error handler
  app.setErrorHandler((error, req, reply) => {
    if (reply.statusCode === 429) {
      reply.code(429).send({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' });
      return;
    }
    req.log.error(error);
    reply.code(error.statusCode || 500).send({
      error: error.message || 'Erreur interne du serveur',
    });
  });

  // Database
  const db = initDB(config.DB_PATH);
  app.decorate('db', db);

  // Socket.IO
  const httpServer = app.server;
  const io = new Server(httpServer, { cors: { origin: config.CORS_ORIGIN } });
  app.decorate('io', io);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
  });

  // Routes
  app.register(require('./routes/index'));

  return app;
}

module.exports = { buildApp };
