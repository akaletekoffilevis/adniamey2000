# Besoin de Contenu Réel

Ce fichier liste toutes les informations qui doivent être remplacées par du contenu authentique avant la mise en production du site AD Niamey 2000.

---

## 1. Photos et Images

| Emplacement | Description | Statut |
|---|---|---|
| `images/` (dossier vide) | Photos réelles de l'église, des cultes, événements, pasteurs | À fournir |
| `galerie.html` (8 emplacements) | Remplacer les dégradés bleus par des photos réelles | À fournir |
| `pasteurs.html` (6 avatars) | Photos des pasteurs et responsables de ministères | À fournir |
| `blog.html` (3 articles) | Images d'illustration pour chaque article | À fournir |
| `index.html` (sermons preview) | Images des prédicateurs ou visuels de sermons | À fournir |
| `index.html` (hero section) | Image de fond ou visuel de l'église | Optionnel |
| `favicon.svg` | Logo officiel de l'église au format SVG | Optionnel (actuel OK) |

## 2. Informations de Contact

| Information | Valeur actuelle | Action requise |
|---|---|---|
| Adresse exacte | Quartier Yantala Haut, Niamey | **À confirmer/vérifier** |
| Boîte postale | BP : 12345 Niamey, Niger | **À remplacer par la vraie BP** |
| Téléphone | +227 90 00 00 00 | **À remplacer par le vrai numéro** |
| Email | contact@adniamey2000.org | **À créer/configurer si pas déjà fait** |
| Orange Money | +227 90 12 34 56 | **À remplacer par le vrai numéro** |
| Wave | +227 90 12 34 57 | **À remplacer par le vrai numéro** |
| M-Pesa | +227 90 12 34 58 | **À remplacer par le vrai numéro** |
| Google Maps | Yantala, Niamey, Niger | **À confirmer les coordonnées GPS** |

## 3. Équipe Pastorale

| Personne | Rôle | Action requise |
|---|---|---|
| Pasteur Amadou Issoufou | Pasteur Principal | **Confirmer nom réel, ajouter biographie réelle** |
| Pasteur Samuel Tchétché | Pasteur Associé | **Confirmer nom réel, ajouter biographie réelle** |
| Pasteur David Yacoubou | Pasteur des Jeunes | **Confirmer nom réel, ajouter biographie réelle** |
| Frère Élie Garba | Responsable Louange | **Confirmer nom réel** |
| Frère Moïse Moussa | Responsable Enseignement | **Confirmer nom réel** |
| Sœur Esther Oumarou | Responsable Intercession | **Confirmer nom réel** |
| Frère Jonas Boubacar | Responsable Jeunesse | **Confirmer nom réel** |
| Sœur Marie Halidou | Responsable Action Sociale | **Confirmer nom réel** |
| Frère Pierre Kalla | Responsable Administration | **Confirmer nom réel** |

## 4. Audio (Sermons/Podcasts)

Les 6 sermons listés pointent vers des fichiers audio inexistants :

| Titre | Fichier attendu |
|---|---|
| La Foi qui déplace les montagnes - Pasteur Amadou | `audio/la-foi-qui-deplace-les-montagnes.mp3` |
| La Paix de Dieu qui surpasse l'intelligence - Pasteur Samuel T. | `audio/la-paix-de-dieu.mp3` |
| L'Espérance vivante par la résurrection - Pasteur David Y. | `audio/esperance-vivante.mp3` |
| Le Combat de la Foi - Pasteur Amadou | `audio/le-combat-de-la-foi.mp3` |
| La Joie du Seigneur est ma force - Pasteur Samuel T. | `audio/la-joie-du-seigneur.mp3` |
| Noël, l'Emmanuel : Dieu avec nous - Pasteur David Y. | `audio/noel-emmanuel.mp3` |

**Action :** Créer le dossier `audio/` et y placer les fichiers MP3 réels, ou mettre à jour les liens `data-src` dans `sermons.html` vers des URLs d'hébergement (SoundCloud, YouTube, etc.)

## 5. Calendrier d'Événements

Le calendrier utilise des dates fictives en mai/juin 2026. **Actions :**
- Mettre à jour les événements avec les vraies dates
- Ajouter/supprimer des événements selon le planning réel de l'église
- Le calendrier JS dans `js/script.js` affiche le mois actuel — vérifier qu'il fonctionne

## 6. Contenu Textuel

| Page | Élément | Action |
|---|---|---|
| `a-propos.html` | Histoire de l'église | **Remplacer par l'histoire réelle** (fondation, année, circonstances) |
| `a-propos.html` | Mission et valeurs | **Adapter si différent** |
| `a-propos.html` | Confession de foi (4 doctrines) | **Valider avec le pasteur** selon la doctrine des AD du Niger |
| `index.html` | Témoignages (Hadiza, Mamane, Adamou) | **Remplacer par de vrais témoignages** de membres |
| `index.html` | Statistiques (120 membres, 15 ans, etc.) | **Mettre les chiffres réels** |
| `sermons.html` | Descriptions des sermons | **Ajouter passages bibliques réels, descriptions** |
| `blog.html` | Articles | **Remplacer par de vrais articles** |

## 7. Réseaux Sociaux

Les icônes Facebook, YouTube, WhatsApp dans le footer pointent vers `#`. **Actions :**
- [ ] Créer une page Facebook officielle : `https://facebook.com/...`
- [ ] Créer une chaîne YouTube : `https://youtube.com/...`
- [ ] Créer un groupe WhatsApp : `https://chat.whatsapp.com/...`
- [ ] Mettre à jour les liens dans tous les footers

## 8. Administration

| Fonctionnalité | Statut |
|---|---|
| Login admin | Page statique uniquement (pas de backend) |
| Dashboard | Stats fictives |
| CRUD Sermons/Blog/Événements/Galerie | Templates statiques uniquement |

**Action :** Un vrai backend est nécessaire (Firebase, localStorage avec JSON, ou PHP/MySQL)

## 9. SEO et Hébergement

| Élément | Action |
|---|---|
| Nom de domaine | `adniamey2000.org` — **est-il acheté/configuré ?** |
| Hébergement | **Choisir un hébergeur** (Netlify, GitHub Pages, Hostinger, etc.) |
| Google Analytics | **Ajouter un tracker** pour les statistiques |
| Google Search Console | **Configurer** pour le référencement |
| Certificat SSL | **S'assurer que HTTPS fonctionne** |

## 10. Autres

- [ ] Newsletter (formulaire dans `blog.html`) : **connecter à Mailchimp / Sendinblue**
- [ ] Liens WhatsApp et Messenger (chat en direct)
- [ ] Page « Mentions Légales » (obligatoire en France, recommandé au Niger)
- [ ] Page « Politique de Confidentialité »
