<img src="favicon.svg" width="64" align="right" alt="AD Niamey 2000">

# AD Niamey 2000 — Site Officiel de l'Église

**Assemblées de Dieu au Niger — Niamey**

Site web statique, multilingue et responsive de l'église AD Niamey 2000. Conçu pour être léger, accessible et facile à déployer.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **🌍 3 langues** | Français (`/fr/`), Anglais (`/en/`), Haoussa (`/ha/`) avec sélecteur dans la navbar |
| **📖 Pages d'information** | Accueil, À propos (histoire, mission, doctrine), Équipe pastorale |
| **🎧 Sermons & Podcasts** | Lecteur audio avec barre de progression, filtres par catégorie (Dimanche, Étude, Conférence, Jeunesse) |
| **📸 Galerie photo** | Lightbox, filtres (Cultes, Événements, Jeunesse, Baptêmes) |
| **📅 Calendrier** | Calendrier dynamique des événements avec navigation mois par mois |
| **📝 Blog** | Articles avec catégories, sidebar, formulaire d'abonnement newsletter |
| **🙏 Formulaire de prière** | Section dédiée avec types de demande (guérison, famille, finances, etc.) |
| **💳 Dons en ligne** | Orange Money, Wave, M-Pesa |
| **🎨 Animations** | Apparition au défilement (IntersectionObserver) |
| **📱 Responsive** | Menu hamburger mobile, grilles adaptatives |
| **🍪 RGPD** | Bannière de consentement cookies avec localStorage |
| **⬆️ Retour en haut** | Bouton flottant après 400px de scroll |
| **🔧 Administration** | Dashboard, gestion sermons/blog/événements/galerie (templates statiques) |

---

## 🏗️ Structure du projet

```
AdNiamey2000Site/
│
├── index.html              # Accueil FR (racine du site)
├── 404.html                # Page d'erreur (pour GitHub Pages)
│
├── fr/                     # Version française
│   ├── index.html
│   ├── a-propos.html
│   ├── pasteurs.html
│   ├── sermons.html
│   ├── evenements.html
│   ├── galerie.html
│   ├── blog.html
│   ├── contact.html
│   └── 404.html
│
├── en/                     # English version
│   ├── index.html
│   ├── a-propos.html       (About)
│   ├── pasteurs.html       (Team)
│   ├── sermons.html
│   ├── evenements.html     (Events)
│   ├── galerie.html        (Gallery)
│   ├── blog.html
│   ├── contact.html
│   └── 404.html
│
├── ha/                     # Harshen Hausa
│   ├── index.html
│   ├── a-propos.html       (Game da Mu)
│   ├── pasteurs.html       (Tawaga)
│   ├── sermons.html        (Wa'azi)
│   ├── evenements.html     (Abubuwa)
│   ├── galerie.html        (Hotuna)
│   ├── blog.html           (Labarai)
│   ├── contact.html        (Tuntuɓi)
│   └── 404.html
│
├── admin/                  # Panneau d'administration
│   ├── login.html
│   ├── index.html          (Dashboard)
│   ├── sermons.html
│   ├── blog.html
│   ├── evenements.html
│   └── galerie.html
│
├── css/
│   └── style.css           # Styles uniques (variables, layout, composants)
│
├── js/
│   └── script.js           # JS vanilla (menu, filtres, animations, lightbox, audio)
│
├── images/                 # 📥 Dossier pour ajouter les photos
├── favicon.svg             # Icône du site (croix bleue)
├── sitemap.xml             # Plan du site (27 URLs)
├── robots.txt              # Autorise tous les crawlers
├── BESOIN_CONTENU_REEL.md  # 📋 Liste de tout le contenu à authentifier
└── DEPLOIEMENT.md          # 📦 Guide complet de déploiement
```

---

## 🧰 Technologies utilisées

- **HTML5** sémantique (balises `article`, `section`, `nav`, `aside`, `main`, `footer`)
- **CSS3** pur — variables CSS, Flexbox, Grid, animations, Media Queries
- **JavaScript** vanilla (ES6) — sans jQuery, sans framework
- **Google Fonts** — Inter (sans-serif) + Playfair Display (serif)
- **SVG** pour toutes les icônes (intégrées, pas de fichiers externes)
- **Schema.org** — microdonnées pour le référencement
- **Open Graph / Twitter Cards** — partage sur les réseaux sociaux

Zéro dépendance. Zéro build. Ouvre `index.html` et ça marche.

---

## 🚀 Déploiement rapide

### GitHub Pages

```bash
# 1. Créer le dépôt sur https://github.com/new (nom: adniamey2000, Public)
# 2. Pousser le code
git remote add origin https://github.com/akaletekoffilevis/adniamey2000.git
git push -u origin main

# 3. Activer dans Settings → Pages → Branch: main → Save
```

Le site sera en ligne sur :
**`https://akaletekoffilevis.github.io/adniamey2000/`**

### Noms de domaine

| Page | URL |
|---|---|
| Accueil FR | `https://.../adniamey2000/` |
| Accueil EN | `https://.../adniamey2000/en/` |
| Accueil HA | `https://.../adniamey2000/ha/` |
| Sermons EN | `https://.../adniamey2000/en/sermons` |

---

## 📋 Contenu à personnaliser

Avant la mise en ligne, voir **`BESOIN_CONTENU_REEL.md`** pour remplacer :

- [ ] Photos de l'église, des pasteurs, des événements (`images/`)
- [ ] Numéros de téléphone réels (Orange Money, Wave, M-Pesa)
- [ ] Adresse exacte et boîte postale
- [ ] Noms réels des pasteurs et responsables
- [ ] Fichiers audio des sermons (`audio/`)
- [ ] Liens réseaux sociaux (Facebook, YouTube, WhatsApp)
- [ ] Témoignages de vrais membres

---

## 👥 Équipe (contenu fictif à valider)

| Rôle | Nom |
|---|---|
| Pasteur Principal | Amadou Issoufou |
| Pasteur Associé | Samuel Tchétché |
| Pasteur des Jeunes | David Yacoubou |
| Responsable Louange | Élie Garba |
| Responsable Enseignement | Moïse Moussa |
| Responsable Intercession | Esther Oumarou |
| Responsable Jeunesse | Jonas Boubacar |
| Responsable Action Sociale | Marie Halidou |
| Responsable Administration | Pierre Kalla |

---

## 📞 Contact

- **Adresse :** Quartier Yantala Haut, Niamey, Niger
- **Email :** contact@adniamey2000.org
- **Téléphone :** +227 90 00 00 00

---

## 📄 Licence

© 2025 AD Niamey 2000 — Assemblées de Dieu au Niger.
