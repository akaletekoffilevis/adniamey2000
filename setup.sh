#!/bin/bash
set -e

echo "╔════════════════════════════════════════════╗"
echo "║  Setup Initial — AD Niamey 2000            ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# 1. Vérifier Node.js et npm
echo "✓ Vérification de Node.js..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js n'est pas installé. Installé Node.js 20+: https://nodejs.org"
  exit 1
fi
NODE_VERSION=$(node --version | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "⚠️  Node.js $NODE_VERSION détecté, mais 20+ recommandé"
fi
echo "  Node $(node --version) — npm $(npm --version)"

# 2. Installer dépendances
echo ""
echo "✓ Installation des dépendances..."
npm install
echo "  ✓ Dépendances installées"

# 3. Créer .env s'il n'existe pas
echo ""
echo "✓ Configuration d'environnement..."
if [ ! -f .env ]; then
  # Générer un JWT_SECRET aléatoire
  if command -v openssl &> /dev/null; then
    JWT_SECRET=$(openssl rand -hex 32)
  else
    JWT_SECRET="dev-$(date +%s | md5sum | cut -c1-32)"
  fi
  
  cat > .env << EOF
PORT=3001
NODE_ENV=development
JWT_SECRET=$JWT_SECRET
CORS_ORIGIN=http://localhost:3001
EOF
  echo "  ✓ Fichier .env créé (à personnaliser pour la prod)"
else
  echo "  ✓ Fichier .env déjà existant"
fi

# 4. Initialiser la base de données
echo ""
echo "✓ Initialisation de la base de données..."
npm run seed
echo "  ✓ Base de données créée et seed appliqué"

# 5. Build CSS/JS (optionnel)
echo ""
echo "✓ Build des assets..."
if npm run build 2>/dev/null; then
  echo "  ✓ CSS/JS minifiés"
else
  echo "  ℹ️  Build skippé (csso/terser optionnel)"
fi

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  ✓ Setup terminé avec succès !              ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Prochaines étapes:"
echo ""
echo "  1. Développement:"
echo "     npm run dev"
echo "     → Accès: http://localhost:3001"
echo ""
echo "  2. Production:"
echo "     npm start"
echo "     → Ou via PM2: pm2 start --name adniamey2000 npm -- start"
echo ""
echo "  3. Admin (login par défaut):"
echo "     URL: http://localhost:3001/admin/login.html"
echo "     User: user"
echo "     Pass: user123"
echo ""
echo "  4. Avant de déployer:"
echo "     - Éditer .env (JWT_SECRET, CORS_ORIGIN)"
echo "     - Voir DEPLOIEMENT.md pour les instructions"
echo ""
