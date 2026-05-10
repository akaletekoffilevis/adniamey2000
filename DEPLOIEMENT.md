# Guide de Déploiement — AD Niamey 2000

## Architecture

```
Frontend (statique)  ──────┐
  HTML + CSS + JS          │
  servis par le backend    │
                            ├──▶ Un seul serveur Node.js
Backend (API)  ────────────┘    port 3001
  Fastify + SQLite
```

**Le backend sert aussi le frontend** (via `@fastify/static`).  
→ Un seul processus à lancer = site + API fonctionnent ensemble.

---

## Option 1 : Serveur VPS (Recommandée)

### 1. Prérequis sur le serveur

```bash
# Node.js 20+
sudo apt update && sudo apt install -y nodejs npm

# PM2 pour garder le serveur en vie
sudo npm install -g pm2

# Nginx (reverse proxy + SSL)
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2. Envoyer les fichiers sur le serveur

```bash
# Depuis ton poste
scp -r /chemin/local/AdNiamey2000Site user@ton-serveur:/home/user/
```

### 3. Configurer l'environnement

```bash
cd /home/user/AdNiamey2000Site/backend
```

Éditer `.env` :
```env
PORT=3001
JWT_SECRET=79474cfe1655b6bf0c8f125d940737cf2ca5f645b6a2ce32196db24227a8b36f
CORS_ORIGIN=https://adniamey2000.org
```

> `CORS_ORIGIN` = le domaine final (séparer par des virgules si plusieurs)

### 4. Installer les dépendances et seed

```bash
cd /home/user/AdNiamey2000Site/backend
npm install
npm run seed
```

### 5. Lancer avec PM2

```bash
cd /home/user/AdNiamey2000Site/backend
pm2 start src/index.js --name adniamey2000 -- --env-file .env
pm2 save
pm2 startup   # ← suit les instructions affichées
```

### 6. Configurer Nginx (reverse proxy + SSL)

Fichier `/etc/nginx/sites-available/adniamey2000` :

```nginx
server {
    listen 80;
    server_name adniamey2000.org www.adniamey2000.org;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Augmente la limite pour les uploads admin
    client_max_body_size 10M;
}
```

Activer et obtenir SSL :

```bash
sudo ln -s /etc/nginx/sites-available/adniamey2000 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Certificat SSL (Let's Encrypt)
sudo certbot --nginx -d adniamey2000.org -d www.adniamey2000.org
```

### 7. Vérifier

- https://adniamey2000.org → site
- https://adniamey2000.org/api/site → API
- https://adniamey2000.org/admin/login.html → admin

---

## Option 2 : Hébergement mutualisé (frontend seul)

Si tu n'as qu'un hébergement PHP/static (sans Node.js) :

### Backend à part (ex: Railway, Render, Fly.io)

```bash
# Sur railway.app ou render.com
# 1. Connecter le dépôt GitHub
# 2. Racine : /backend
# 3. Commande : npm start
# 4. Variable d'environnement : PORT=3001
```

### Frontend static (Netlify, Vercel, GitHub Pages)

Le frontend est déjà en HTML/CSS/JS pur, aucun build nécessaire.

**Mais** : le frontend utilise l'API → il faut changer l'URL de l'API.

#### 1. Modifier `frontend/js/api.js`

```js
var API_URL = 'https://ton-backend.railway.app/api';  // URL du backend distant
```

#### 2. Rebuild

```bash
cd frontend
npm run build
```

#### 3. Uploader le dossier `frontend/` vers Netlify/Vercel/GitHub Pages

> ⚠️ **Socket.IO** nécessite WebSocket.  
> Vérifie que ton hébergeur supporte les WebSocket (pas GitHub Pages).

---

## Option 3 : Docker (avancé)

### Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .
COPY frontend/ ../frontend/
EXPOSE 3001
CMD ["node", "--env-file", ".env", "src/index.js"]
```

```bash
docker build -t adniamey2000 .
docker run -d -p 3001:3001 --env-file backend/.env adniamey2000
```

---

## Checklist pré-déploiement

- [ ] **JWT_SECRET** généré (déjà fait : 64 hex chars)
- [ ] **CORS_ORIGIN** configuré avec le vrai domaine
- [ ] **Données réelles** populées via `/admin/`
- [ ] **Mots de passe admin** changés
- [ ] **Liens réseaux sociaux** mis à jour (Facebook, YouTube, WhatsApp)
- [ ] **Coordonnées** email/téléphone réelles
- [ ] **Images** uploadées (pasteurs, événements, etc.)
- [ ] **.env** sécurisé (hors git)
- [ ] **HTTPS** activé (via certbot ou hébergeur)

---

## Commandes utiles (PM2)

```bash
pm2 status                    # Voir l'état
pm2 logs adniamey2000         # Voir les logs
pm2 restart adniamey2000      # Redémarrer
pm2 stop adniamey2000         # Arrêter
pm2 delete adniamey2000       # Supprimer du registre
```
