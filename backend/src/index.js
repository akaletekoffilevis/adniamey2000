const { buildApp } = require('./app');
const config = require('./config');

const app = buildApp();

app.listen({ port: config.PORT, host: '0.0.0.0' }).then(() => {
  console.log('Backend running on http://0.0.0.0:' + config.PORT);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
