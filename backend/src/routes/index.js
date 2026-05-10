module.exports = async function (fastify) {
  fastify.register(require('./site'));
  fastify.register(require('./events'));
  fastify.register(require('./gallery'));
  fastify.register(require('./auth'));
  fastify.register(require('./contact'));
  fastify.register(require('./admin'));
};
