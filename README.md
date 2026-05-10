# AD Niamey 2000 — Site Web Officiel

Site web multilingue (FR/EN/HA/IT) de l'Église Assemblées de Dieu d'AD Niamey 2000.

## Architecture

```
adniamey2000site/
├── frontend/          # Site vitrine SPA (HTML/CSS/JS vanilla + i18n)
│   ├── index.html     # Page d'accueil (et pages par route)
│   ├── css/style.css  # Styles complets
│   ├── js/
│   │   ├── script.js  # Interactions, thème, audio, galerie, hash routing
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
│   ├── sermons.html
│   ├── blog.html
│   ├── evenements.html
│   └── galerie.html
├── backend/           # API REST (Node.js + Express + SQLite)
│   └── src/
│       ├── index.js
│       ├── db/        # Schema + seed
│       ├── routes/    # sermons, articles, events, gallery, auth
│       └── middleware/ # JWT auth
├── 404.html           # Page 404 personnalisée (racine)
├── robots.txt
├── sitemap.xml
└── favicon.svg
```

## Stack

| Couche | Technologie |
|--------|------------|
| **Frontend** | HTML5 + CSS3 + JavaScript vanilla (pas de framework) |
| **i18n** | Système data-i18n avec fichiers JSON |
| **Backend** | Node.js + Express + better-sqlite3 |
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
| GET | `/api/sermons` | Liste des sermons |
| GET | `/api/sermons/:id` | Détail d'un sermon |
| GET | `/api/articles` | Liste des articles |
| GET | `/api/articles/:id` | Détail d'un article |
| GET | `/api/events` | Liste des événements |
| GET | `/api/events/:id` | Détail d'un événement |
| GET | `/api/gallery` | Galerie photos |
| POST | `/api/auth/login` | Authentification admin |

## Fonctionnalités

- **Multilingue** : FR/EN/HA/IT avec bascule en direct (sans rechargement)
- **Thème clair/sombre** : avec persistance localStorage + détection système
- **Lecteur audio** : pour les sermons
- **Lightbox** : pour la galerie photos
- **Vidéos YouTube** : intégration avec lecteur modal
- **Hash routing** : pages détail articles via `#/article/:id`
- **Admin** : panneau de gestion avec authentification JWT
- **PWA** : service worker avec cache offline
- **SEO** : meta tags, Open Graph, JSON-LD, sitemap, robots.txt
- **Cookies** : bannière de consentement
