const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  FRONTEND_PATH: path.join(__dirname, '..', '..', 'frontend'),
  DB_PATH: path.join(__dirname, '..', 'database', 'adniamey.db'),
  RATE_LIMIT: { max: 100, timeWindow: '1 minute' },
  BODY_LIMIT: 1048576,
};
