# AD Niamey 2000 — Site Web Officiel

Site web multilingue (FR/EN/HA/IT) de l'Église Assemblées de Dieu d'AD Niamey 2000.

## Architecture

```
AdNiamey2000Site/
├── public/                  # Frontend + Admin (HTML/CSS/JS vanilla + i18n)
│   ├── index.html           # Page d'accueil
│   ├── *.html               # Autres pages
│   ├── admin/               # Interface d'administration
│   │   ├── login.html       # Connexion (JWT via API)
│   │   ├── index.html       # Dashboard
│   │   ├── evenements.html  # Gestion événements
│   │   ├── galerie.html     # Gestion galerie
│   │   └── site.html        # Gestion site
│   ├── css/
│   │   ├── style.css        # Source
│   │   └── style.min.css    # Minifiée
│   ├── js/
│   │   ├── i18n.js          # Traduction (data-i18n)
│   │   ├── api.js           # Client API REST
│   │   ├── script.js        # Logique générale
│   │   ├── dynamic.js       # Rendu contenu dynamique
│   │   ├── service-worker.js # PWA cache
│   │   └── *.min.js         # Minifiés
│   └── data/                # Traductions
│       ├── fr.js, en.js, ha.js, it.js
├── src/                     # Backend (Node.js + Fastify)
│   ├── index.js             # Point d'entrée
│   ├── app.js               # Configuration app
│   ├── config.js            # Config centrale
│   ├── db/
│   │   ├── schema.js        # Schéma SQLite
│   │   └── seed.js          # Données initiales
│   ├── middleware/
│   │   └── auth.js          # JWT
│   └── routes/
│       ├── index.js         # Enregistrement routes
│       ├── site.js          # GET /api/site
│       ├── events.js        # CRUD événements
│       ├── gallery.js       # CRUD galerie
│       ├── contact.js       # Formulaires
│       ├── auth.js          # Login
│       └── admin.js         # Routes admin
├── database/
│   └── adniamey.db          # SQLite (généré)
├── package.json
├── .env.example             # Template variables d'env
└── DEPLOIEMENT.md           # Guide complet
```

## Stack

| Couche | Technologie |
|--------|------------|
| **Frontend** | HTML5 + CSS3 + JavaScript vanilla |
| **Serveur** | Node.js 20+ + Fastify 5+ |
| **Base de données** | SQLite 3 (fichier local) |
| **Auth** | JWT + bcryptjs |
| **i18n** | Système data-i18n en JS |
| **Langues** | FR / EN / HA / IT |
| **Assets** | Minifiés (CSS/JS) |

## Installation locale

### Démarrage rapide

```bash
# 1. Dépendances
npm install

# 2. Générer la base de données
npm run seed

# 3. Build des assets (optionnel)
npm run build

# 4. Lancer en développement
npm run dev      # http://localhost:3001

# Ou production
npm start        # http://localhost:3001
```

### Accès

- **Site**: http://localhost:3001
- **Admin**: http://localhost:3001/admin/login.html (après seed: user/user123)
- **API**: http://localhost:3001/api/site
- **Docs API**: http://localhost:3001/docs

## API Endpoints

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/site` | ✗ | Tous les contenus du site |
| GET | `/api/events` | ✗ | Liste des événements |
| POST | `/api/events` | ✓ | Créer un événement |
| PUT | `/api/events/:id` | ✓ | Modifier un événement |
| DELETE | `/api/events/:id` | ✓ | Supprimer un événement |
| GET | `/api/gallery` | ✗ | Galerie photos |
| POST | `/api/gallery` | ✓ | Ajouter une photo |
| POST | `/api/contact` | ✗ | Soumettre un message |
| POST | `/api/prayer` | ✗ | Demande de prière |
| POST | `/api/auth/login` | ✗ | Authentification admin |

## Fonctionnalités

- **Multilingue** : FR/EN/HA/IT, bascule instant sans rechargement
- **Admin sécurisé** : Authentification JWT, édition en temps réel
- **Galerie** : Lightbox, catégories filtrables
- **Événements** : Liste, détails, statuts (à venir/passé)
- **Formulaires** : Contact, demandes de prière
- **PWA** : Service worker avec cache offline
- **SEO** : Meta tags, Open Graph, JSON-LD, hreflang
- **Responsive** : Optimisé mobile et desktop

## Variables d'environnement (.env)

```env
PORT=3001
JWT_SECRET=votre-secret-tres-fort-64-char-min
CORS_ORIGIN=http://localhost:3001,https://adniamey2000.org
```

Voir `.env.example` pour le template complet.
