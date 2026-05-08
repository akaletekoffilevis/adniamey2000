# Déploiement sur GitHub Pages

## Structure actuelle du site

```
AdNiamey2000Site/
├── index.html         ← Page d'accueil FR (racine du site)
├── fr/                ← Pages en français
│   ├── index.html
│   ├── a-propos.html
│   ├── pasteurs.html
│   ├── sermons.html
│   ├── evenements.html
│   ├── galerie.html
│   ├── blog.html
│   ├── contact.html
│   └── 404.html
├── en/                ← Pages en anglais
├── ha/                ← Pages en haoussa
├── admin/             ← Panneau d'administration
├── css/style.css
├── js/script.js
├── images/            ← Dossier pour les photos
├── BESOIN_CONTENU_REEL.md
├── sitemap.xml
├── robots.txt
└── favicon.svg
```

---

## 1. Créer un dépôt GitHub

1. Allez sur https://github.com et connectez-vous (créez un compte si besoin)
2. Cliquez sur le bouton vert **« New »** (ou **« New repository »**)
3. Nommez le dépôt (ex: `adniamey2000`)
4. Laissez **Public**
5. **Ne cochez PAS** « Initialize this repository with a README »
6. Cliquez sur **« Create repository »**

---

## 2. Pousser le site sur GitHub

Ouvrez un terminal dans le dossier du site :

```bash
# Allez dans le dossier du site
cd /home/akaletekoffilevis/Bureau/AdNiamey2000Site

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - site AD Niamey 2000"

# Ajouter le dépôt GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/adniamey2000.git

# Pousser sur GitHub
git push -u origin main
```

> Si la branche s'appelle `master` au lieu de `main`, faites :
> `git branch -M main` avant le `git push`.

---

## 3. Activer GitHub Pages

1. Allez sur https://github.com/USERNAME/adniamey2000
2. Cliquez sur l'onglet **Settings** (⚙️)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Branch**, sélectionnez `main` (ou `master`)
5. Laissez le dossier sur `/(root)`
6. Cliquez sur **Save**

⏳ Attendez 1 à 2 minutes, rafraîchissez la page.
Vous verrez : *"Your site is published at https://USERNAME.github.io/adniamey2000/"*

---

## 4. Configurer le 404 personnalisé

GitHub Pages utilise automatiquement le fichier `404.html` s'il est à la racine. Actuellement, notre 404 est dans `fr/404.html`. Pour qu'il soit global :

1. Copiez `fr/404.html` à la racine :
```bash
cp fr/404.html 404.html
```

> **Important :** Le fichier `404.html` DOIT être à la racine du dépôt pour que GitHub Pages l'utilise.

---

## 5. Ajouter un nom de domaine personnalisé (optionnel)

Si vous avez acheté `adniamey2000.org` :

1. Dans **Settings → Pages**, sous **Custom domain**, tapez `adniamey2000.org`
2. Cliquez **Save**
3. Chez votre fournisseur de domaine, ajoutez un enregistrement DNS :
   - **Type :** CNAME
   - **Nom :** `www` (ou `@`)
   - **Valeur :** `USERNAME.github.io`

---

## 6. Mettre à jour le site après modifications

```bash
# Dans le dossier du site
git add .
git commit -m "Description des changements"
git push
```

GitHub Pages mettra à jour le site automatiquement en ~1-2 minutes.

---

## 7. Enlever le site de GitHub Pages

### Méthode 1 : Désactiver GitHub Pages

1. Allez sur **Settings → Pages**
2. Sous **Branch**, sélectionnez **« None »**
3. **Save**

→ Le site n'est plus accessible. Le code reste sur GitHub mais n'est plus hébergé.

### Méthode 2 : Supprimer le dépôt (tout effacer)

1. Allez sur **Settings** → en bas, cliquez **« Delete this repository »**
2. Tapez le nom du dépôt pour confirmer
3. **« I understand, delete this repository »**

→ Tout est supprimé : code ET site.

### Méthode 3 : Rendre le dépôt privé (visible uniquement par vous)

1. **Settings → General** → **Danger Zone** → **« Change visibility »**
2. Sélectionnez **Private** et confirmez

→ GitHub Pages s'éteint automatiquement pour les dépôts privés (sauf compte payant).

---

## 8. Structure URL finale

```
https://USERNAME.github.io/adniamey2000/              ← FR Accueil
https://USERNAME.github.io/adniamey2000/fr/a-propos   ← FR À propos
https://USERNAME.github.io/adniamey2000/en/            ← EN Accueil
https://USERNAME.github.io/adniamey2000/ha/            ← HA Accueil
https://USERNAME.github.io/adniamey2000/en/sermons     ← EN Sermons
```
