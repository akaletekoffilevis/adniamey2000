# AD Niamey 2000 — Site Officiel

Site web de l'église **AD Niamey 2000** (Assemblées de Dieu au Niger), une communauté chrétienne située à Niamey.

## Fonctionnalités

- Pages d'information : Accueil, À propos, Équipe pastorale, Sermons, Galerie, Blog, Contact
- **3 langues** : Français (`/fr/`), Anglais (`/en/`), Haoussa (`/ha/`)
- Lecteur audio pour les sermons avec barre de progression
- Galerie photo avec lightbox et filtres
- Calendrier dynamique des événements
- Formulaire de contact et de demande de prière
- Animations au défilement (IntersectionObserver)
- Bannière de consentement cookies (RGPD)
- Filtres par catégorie (sermons, galerie)
- Menu mobile responsive
- Panneau d'administration (templates statiques)

## Structure

```
index.html         → Page d'accueil FR (racine)
fr/                → Pages françaises
en/                → Pages anglaises
ha/                → Pages haoussa
admin/             → Administration
css/style.css      → Styles
js/script.js       → Interactivité
images/            → Photos (à ajouter)
```

## Technologies

- **HTML5** sémantique
- **CSS3** (variables, Flexbox, Grid, animations)
- **JavaScript** vanilla (pas de framework)
- Aucune dépendance externe — fonctionne en ouvrant simplement `index.html`

## Déploiement

```bash
git remote add origin https://github.com/akaletekoffilevis/adniamey2000.git
git push -u origin main
```

Puis : **Settings → Pages → Branch: main → Save**

Le site sera accessible à :
`https://akaletekoffilevis.github.io/adniamey2000/`

## Contenu à personnaliser

Avant la mise en production, voir `BESOIN_CONTENU_REEL.md` pour la liste des informations à authentifier (photos, numéros de téléphone, noms des pasteurs, fichiers audio, etc.).

## Licence

© 2025 AD Niamey 2000. Tous droits réservés.
