# Guide de Déploiement — AD Niamey 2000

## Architecture de production

```
┌─────────────────────────────────────────┐
│  Utilisateurs                           │
├─────────────────────────────────────────┤
│  HTTPS (port 443)                       │
├─────────────────────────────────────────┤
│  Nginx (reverse proxy + SSL)            │
├─────────────────────────────────────────┤
│  Node.js + Fastify (port 3001)          │
│  ├─ Frontend statique (public/)         │
│  ├─ API REST (/api/*)                   │
│  ├─ Admin (/admin/login.html)           │
│  └─ Socket.IO (en temps réel)           │
├─────────────────────────────────────────┤
│  SQLite (database/adniamey.db)          │
└─────────────────────────────────────────┘
```

**Un seul serveur Node.js sert tout**: site, admin et API.  
PM2 garantit la continuité. Nginx protège et optimise en avant.

---

## Déploiement — Option 1: VPS Linux (Recommandé)

**Coût**: ~2–5€/mois pour un petit VPS.  
**Avantages**: Full control, SSL facile, WebSocket natif, SQLite local.

### Prérequis

Un serveur VPS Ubuntu 22.04+ (ex: Hetzner, OVH, Linode, DigitalOcean).

### 1. Accès SSH et setup initial

```bash
# Sur ton poste
ssh root@ton-serveur-ip

# Sur le serveur
apt update && apt upgrade -y
apt install -y nodejs npm git nginx certbot python3-certbot-nginx
sudo npm install -g pm2

# Utilisateur non-root (recommandé)
useradd -m -s /bin/bash adnuser
usermod -aG sudo adnuser
su - adnuser
```

### 2. Cloner le projet

```bash
cd /home/adnuser
git clone https://github.com/ton-compte/AdNiamey2000Site.git
cd AdNiamey2000Site
npm install
npm run seed    # Crée la base et les données initiales
```

### 3. Fichier .env

Créer `.env` à la racine du projet:

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=votre-secret-long-et-aleatoire-au-moins-32-chars
CORS_ORIGIN=https://adniamey2000.org,https://www.adniamey2000.org
```

> ⚠️ Le `JWT_SECRET` doit être **unique**, **aléatoire** et **long** (32+ caractères).  
> Générer avec: `openssl rand -hex 32`

### 4. Lancer avec PM2

```bash
pm2 start --name adniamey2000 npm -- start --env-file .env
pm2 save
pm2 startup
```

Copier-coller la commande suggérée pour activer le redémarrage automatique.

Vérifier:
```bash
pm2 status
pm2 logs adniamey2000
```

### 5. Configurer Nginx (reverse proxy)

Créer `/etc/nginx/sites-available/adniamey2000`:

```nginx
server {
    server_name adniamey2000.org www.adniamey2000.org;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (Socket.IO)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    listen 80;
}
```

Activer:
```bash
sudo ln -s /etc/nginx/sites-available/adniamey2000 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL avec Let's Encrypt

```bash
sudo certbot --nginx -d adniamey2000.org -d www.adniamey2000.org
```

Certbot configure automatiquement le HTTPS et le renouvellement.

Vérifier: https://adniamey2000.org

### 7. Points de contact

- Site: https://adniamey2000.org
- Admin: https://adniamey2000.org/admin/login.html
- API: https://adniamey2000.org/api/site
- Docs: https://adniamey2000.org/docs

---

## Déploiement — Option 2: Oracle Cloud Always Free

**Coût**: Gratuit (Always Free tier).  
**Avantages**: Pérenne, machine physique dédiée, bande passante illimitée.  
**Inconvénient**: Setup plus complexe, moins connu.

### 1. Créer un compte Oracle Cloud

https://www.oracle.com/cloud/free/

### 2. Créer une VM (Always Free)

- Image: Ubuntu 22.04 LTS
- Shape: Ampere (ARM) — Always Free
- Clé SSH: télécharger et garder safe
- VCN + Subnet: defaults

### 3. Configurer le firewall Oracle

Dans "Ingress Rules", ajouter:
- Port 80 (HTTP) - CIDR 0.0.0.0/0
- Port 443 (HTTPS) - CIDR 0.0.0.0/0

### 4. Se connecter et déployer

```bash
ssh ubuntu@ip-public

# Mêmes commandes que l'Option 1 à partir de l'étape 1
apt update && apt upgrade -y
apt install -y nodejs npm git nginx certbot python3-certbot-nginx
sudo npm install -g pm2

# Cloner, installer, seed
cd /home/ubuntu
git clone https://github.com/ton-compte/AdNiamey2000Site.git
cd AdNiamey2000Site
npm install
npm run seed

# .env, PM2, Nginx, SSL → mêmes que Option 1
```

### 5. Domaine DNS

Pointer `adniamey2000.org` vers l'IP publique d'Oracle.

---

## Déploiement — Option 3: Railway / Render (hébergement PaaS)

**Coût**: 5–10€/mois (après crédit gratuit).  
**Avantages**: Déploiement très simple, scaling automatique.  
**Inconvénient**: Moins de contrôle, SQLite peut être problématique sur disque éphémère.

### Railway.app

1. Créer un compte: https://railway.app
2. Connecter le dépôt GitHub
3. Configuration:
   - **Root directory**: `.` (racine)
   - **Start command**: `npm start`
   - **Port**: `3001`
   - **Variables d'env**: `PORT`, `JWT_SECRET`, `CORS_ORIGIN`
4. Ajouter domaine personnalisé
5. Déployer

⚠️ **SQLite**: Pour la persistance, configurer un volume pour `database/`.

### Render.com

Même processus, mais déploiement via GitHub Actions recommandé.

---

## Checklist avant production

- [ ] `JWT_SECRET` changé et cryptographiquement aléatoire
- [ ] `CORS_ORIGIN` défini au domaine réel
- [ ] Données réelles populées via `/admin/login.html` (user/user123)
- [ ] Mots de passe admin changés
- [ ] Images, événements, horaires à jour
- [ ] `.env` ajouté à `.gitignore`
- [ ] `.env` sécurisé (permissions 600)
- [ ] HTTPS fonctionnel et certificat valide
- [ ] Backups SQLite programmées
- [ ] PM2 / systemd configuré pour redémarrage auto
- [ ] Logs monitorées (PM2 logs)
- [ ] Domaine et DNS vérifiés

---

## Maintenance (VPS / Oracle)

### Logs

```bash
pm2 logs adniamey2000                # En direct
pm2 logs adniamey2000 --lines 100    # Dernières 100 lignes
pm2 save                             # Sauvegarder la config PM2
```

### Redémarrage et arrêt

```bash
pm2 restart adniamey2000
pm2 stop adniamey2000
pm2 start adniamey2000
```

### Mise à jour du site

```bash
cd /home/adnuser/AdNiamey2000Site
git pull origin main
npm install          # si nouvelle dépendance
npm run build        # rebuild CSS/JS si modifiés
pm2 restart adniamey2000
```

### Sauvegarde SQLite

```bash
# Copie locale
cp database/adniamey.db database/adniamey.db.backup-$(date +%Y%m%d-%H%M%S)

# Backup distant (ex: sur ton ordinateur)
scp adnuser@ton-serveur:/home/adnuser/AdNiamey2000Site/database/adniamey.db ~/backup/
```

### Renouvellement SSL (Let's Encrypt)

Automatique via certbot (renouvellement tous les 90 jours).  
Vérifier:
```bash
sudo certbot renew --dry-run
```

---

## Dépannage

### Le site n'est pas accessible

```bash
# Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# Vérifier Node.js
pm2 status
pm2 logs adniamey2000

# Vérifier le firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Socket.IO ne fonctionne pas

- Vérifier que le proxy WebSocket est configuré dans Nginx (`Upgrade` headers)
- Vérifier le port 3001 accessible depuis l'extérieur (`telnet ip-serveur 3001`)

### SQLite database locked

- Arrêter PM2, redémarrer, vérifier les permissions
- ```bash
  sudo chown adnuser:adnuser database/adniamey.db
  chmod 644 database/adniamey.db
  ```

### Performance lente

- Vérifier la RAM et le CPU: `htop`
- Vérifier les logs Node: `pm2 logs`
- Optimiser Nginx et ajouter cache: https://nginx.org/en/docs/

---

## Commandes rapides

```bash
# Status global
pm2 status

# Logs temps réel
pm2 logs adniamey2000

# Redémarrer
pm2 restart adniamey2000

# Arrêter
pm2 stop adniamey2000

# Supprimer du registre PM2
pm2 delete adniamey2000

# Sauvegarder la config PM2
pm2 save

# Restaurer la config PM2
pm2 resurrect
```

---

## Support domaine et DNS

### Registraires recommandés

- **Namecheap**: $8.88/an pour `.org` (bonne rep, cheap)
- **Gandi**: €12/an (français, réputé)
- **Ionos**: ~€1/an promo (pas mal en promo)
- **Verisign** (registrar officiel `.org`): varie

### Configuration DNS

Pointer vers l'IP du serveur:

```
A    adniamey2000.org          123.45.67.89       (IP du VPS/Oracle)
A    www.adniamey2000.org      123.45.67.89
MX   adniamey2000.org          mail.adniamey2000.org (optional, si mail)
```

La plupart des registraires offrent une interface simple pour ça.

---

## FAQ

**Q: Je veux garder adniamey2000.org gratuit?**  
R: Pas totalement fiable à long terme. Les domaines `.org` coûtent minimum ~8€/an chez la plupart des registraires. Oracle Cloud Always Free est vraiment gratuit pour le serveur, ça compense.

**Q: Puis-je upgrader la base SQLite plus tard?**  
R: Oui, mais ça demande une migration. Pour du sérieux à terme, passer à PostgreSQL est recommandé. C'est plus facile sur un VPS que sur un PaaS.

**Q: Comment backuper sans perte?**  
R: Copier `database/adniamey.db` régulièrement (mensuel minimum). Ajouter un script cron:

```bash
0 2 * * * cp /home/adnuser/AdNiamey2000Site/database/adniamey.db /home/adnuser/backup/adniamey.db.$(date +\%Y\%m\%d)
```

**Q: Comment activer HTTPS sans Let's Encrypt?**  
R: Certificat autosigné est possible mais pas fiable pour public. Let's Encrypt reste le meilleur gratuit et automatisé.
