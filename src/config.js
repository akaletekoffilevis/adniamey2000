const path = require('path');

// ⚠️ SÉCURITÉ: Les secrets doivent venir de l'environnement en production
// JAMAIS de valeurs hardcodées en secrets
const requiredInProduction = ['JWT_SECRET', 'CORS_ORIGIN'];
if (process.env.NODE_ENV === 'production') {
  for (const key of requiredInProduction) {
    if (!process.env[key]) {
      throw new Error(`❌ ${key} manquant en production! Voir .env.example`);
    }
  }
}

module.exports = {
  // Serveur
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Chemin frontend (public/)
  FRONTEND_PATH: path.join(__dirname, '..', 'public'),
  
  // Base de données
  DB_PATH: process.env.DB_PATH || path.join(__dirname, '..', 'database', 'adniamey.db'),
  
  // Authentification (CRITIQUE)
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production-immediately',
  JWT_EXPIRES_IN: '7d', // Token valable 7 jours
  
  // CORS (sécurité cross-origin)
  CORS_ORIGIN: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : true, // true = accepter tous en dev
  
  // Rate limiting
  RATE_LIMIT: { 
    max: 100, 
    timeWindow: '1 minute' 
  },
  
  // Upload
  BODY_LIMIT: process.env.BODY_LIMIT || 1048576, // 1MB par défaut
};

