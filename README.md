# AD Niamey 2000 — Site Web Officiel

Site web multilingue (FR/EN/HA/IT) de l'Église Assemblées de Dieu d'AD Niamey 2000.

## Architecture

```
adniamey2000site/
├── frontend/          # Site statique HTML/CSS/JS vanilla + i18n
│   ├── index.html     # Page d'accueil
│   ├── css/           # Styles complets
│   ├── js/
│   │   ├── dynamic.js # Script principal (i18n, thème, galerie, formulaires)
│   │   ├── i18n.js    # Système de traduction (data-i18n)
│   │   ├── api.js     # Client API REST (cache localStorage)
│   │   └── service-worker.js  # PWA cache
│   └── data/          # Fichiers de traduction JSON
│       ├── fr.json
│       ├── en.json
│       ├── ha.json
│       └── it.json
├── admin/             # Interface d'administration (HTML statique + API)
│   ├── login.html     # Connexion admin (JWT via backend)
│   ├── index.html     # Dashboard
│   ├── evenements.html
│   └── galerie.html
├── backend/           # API REST (Node.js + Fastify + SQLite)
│   └── src/
│       ├── index.js
│       ├── db/        # Schema + seed
│       ├── routes/    # events, gallery, site, auth
│       └── middleware/ # JWT auth
├── 404.html           # Redirection vers frontend/404.html (GitHub Pages)
├── robots.txt
└── favicon.svg
```

## Stack

| Couche | Technologie |
|--------|------------|
| **Frontend** | HTML5 + CSS3 + JavaScript vanilla (pas de framework) |
| **i18n** | Système data-i18n avec fichiers JSON |
| **Backend** | Node.js + Fastify + better-sqlite3 |
| **Base de données** | SQLite (`backend/database/adniamey.db`) |
| **Auth** | JWT (jsonwebtoken + bcryptjs) |
| **Langues** | FR / EN / HA / IT |

## Installation

### 1. Backend

```bash
cd backend
npm install
npm run seed    # Initialise la base avec des données fictives
npm run dev     # Lance le serveur sur http://localhost:3001
```

### 2. Frontend

Ouvrez `frontend/index.html` dans un navigateur, ou servez-le via :

```bash
cd frontend
python3 -m http.server 8000
# ou
npx serve .
```

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/events` | Liste des événements |
| GET | `/api/events/:id` | Détail d'un événement |
| GET | `/api/gallery` | Galerie photos |
| POST | `/api/auth/login` | Authentification admin |

## Fonctionnalités

- **Multilingue** : FR/EN/HA/IT avec bascule en direct (sans rechargement)
- **Lightbox** : pour la galerie photos
- **Admin** : panneau de gestion avec authentification JWT
- **PWA** : service worker avec cache offline
- **SEO** : meta tags, Open Graph, JSON-LD, sitemap, robots.txt
- **Cookies** : bannière de consentement
