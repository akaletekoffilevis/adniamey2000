const Fastify = require('fastify');
const { Server } = require('socket.io');
const path = require('path');
const { initDB } = require('./db/schema');

const app = Fastify({ logger: true, bodyLimit: 1048576 });
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true;
app.register(require('@fastify/cors'), { origin: allowedOrigins });
app.register(require('@fastify/static'), { root: path.join(__dirname, '..', '..', 'frontend'), prefix: '/' });
app.register(require('@fastify/static'), { root: path.join(__dirname, '..', 'uploads'), prefix: '/uploads/', decorateReply: false });
app.register(require('@fastify/rate-limit'), { global: true, max: 100, timeWindow: '1 minute', keyGenerator: req => req.ip });
app.register(require('@fastify/multipart'), { limits: { fileSize: 100 * 1024 * 1024 } });
app.register(require('@fastify/swagger'), {
  openapi: {
    info: { title: 'AD Niamey 2000 API', description: 'API REST du site officiel de l\'Église AD Niamey 2000', version: '1.0.0' },
    servers: [{ url: 'http://localhost:' + PORT, description: 'Développement' }]
  }
});
app.register(require('@fastify/swagger-ui'), { routePrefix: '/docs' });

app.setErrorHandler(function(error, req, reply) {
  if (reply.statusCode === 429) {
    reply.code(429).send({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' });
    return;
  }
  req.log.error(error);
  reply.code(error.statusCode || 500).send({ error: error.message || 'Erreur interne du serveur' });
});

const db = initDB();
app.decorate('db', db);

const httpServer = app.server;
const io = new Server(httpServer, { cors: { origin: true } });
app.decorate('io', io);

app.register(require('./routes/events'));
app.register(require('./routes/gallery'));
app.register(require('./routes/auth'));
app.register(require('./routes/contact'));
app.register(require('./routes/site'));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log('Backend running on http://0.0.0.0:' + PORT);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
