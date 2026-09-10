# Cahier des charges fonctionnel et technique
## Doztra Social — Mini-planificateur de contenu pour réseaux sociaux

| | |
|---|---|
| **Nom du produit** | **Doztra Social** |
| **Type de document** | Cahier des charges fonctionnel et technique |
| **Version** | 2.0 |
| **Date** | 09/09/2026 |
| **Rédigé par** | Lead Product Manager & Architecte Logiciel Senior |
| **Statut** | Aligné sur le prototype validé — prêt pour l'implémentation |
| **Périmètre** | MVP (Minimum Viable Product) — périmètre validé par prototype cliquable |
| **Phase d'implémentation actée** | Phase 1 — Frontend seul (Option A, section 5.1), stack verrouillée (section 5.1), backend différé à une phase ultérieure |

### Historique des versions

| Version | Date | Modifications |
|---|---|---|
| 1.0 | 03/09/2026 | Version initiale du cahier des charges |
| 1.1 | 03/09/2026 | Décision actée : démarrage de l'implémentation avec l'Option A (frontend seul, persistance `localStorage`) ; le développement du backend est reporté à une phase ultérieure. Mise à jour des sections 1.1, 3.3 et 5 en conséquence |
| 1.2 | 03/09/2026 | Attribution du nom de la plateforme : **Doztra Social** |
| 1.3 | 07/09/2026 | Ajout de la section 4.3 "Design system" (palette, typographie, espacements, composants), produit à partir d'un modèle de référence fourni. Mise à jour de la palette de statuts en 4.2 en cohérence avec le design system |
| 2.0 | 09/09/2026 | **Alignement complet sur le prototype cliquable validé** (`Doztra Social - Planificateur.dc.html`) avant démarrage de l'implémentation : élargissement du périmètre MVP (recherche, filtre par réseau social, tri, vue calendrier, vue tableau, suppression — sections 1.1, 1.2, 2.7 à 2.12), changement de statut en un clic décrit (RG21), liste des réseaux sociaux alignée sur le prototype (section 2.1, 3.1), correction de la section 4.1 (deux vues navigables, non deux breakpoints responsives), verrouillage de la stack technique (React 18 + TypeScript + Vite + Tailwind CSS + FontAwesome 6 Classic — section 5.1), ajout d'un point ouvert sur la confirmation de suppression (RG22) |

---

## Sommaire

1. Présentation du projet & Objectifs
2. Spécifications fonctionnelles détaillées
3. Modèle de données (Data Schema)
4. Ergonomie & Parcours Utilisateur (UX/UI)
5. Recommandations techniques

---

## 1. Présentation du projet & Objectifs

### 1.1 Vision globale et périmètre (MVP)

Le projet consiste à concevoir et développer une application web nommée **Doztra Social** (ci-après désignée « Doztra Social » ou « l'application »), permettant à un utilisateur (community manager, marketeur, freelance ou petite équipe marketing) de **planifier, organiser et suivre l'avancement de ses contenus destinés aux réseaux sociaux**, depuis l'idée jusqu'à la publication.

L'objectif du MVP n'est pas de proposer un outil de publication automatisée (aucune connexion aux API des réseaux sociaux n'est requise à ce stade), mais de fournir, avec Doztra Social, un **espace de planification éditoriale centralisé**, simple et rapide à utiliser, qui répond à un besoin concret : savoir en un coup d'œil *quoi publier, où, pour qui, quand,* et *à quel stade d'avancement* se trouve chaque contenu.

Le périmètre du MVP a été **validé et élargi par un prototype cliquable** (`Doztra Social - Planificateur.dc.html`), construit à partir du design system (section 4.3) et désormais source de vérité pour l'implémentation, aux côtés du présent document :

| Pilier | Contenu du périmètre MVP (v2.0 — aligné sur le prototype) | Explicitement hors périmètre |
|---|---|---|
| Création / édition | Formulaire de création/édition, validation du sujet | Upload de médias (images/vidéos), éditeur de texte riche |
| Suivi | Liste des contenus avec statuts (Brouillon, Validé, Publié), changement de statut en un clic (RG21) | Workflow de validation multi-utilisateurs, historique des changements de statut |
| Organisation | Filtrage par statut, **filtrage par réseau social, recherche textuelle, tri par date, calendrier éditorial navigable, deux vues (Planification / Tous les contenus), suppression d'un contenu** | Tags/catégories libres, tri multi-critères combinés au-delà de la date |
| Diffusion | — | Connexion aux API des réseaux sociaux, publication automatique, planification programmée réelle |
| Collaboration | Utilisateur unique (pas d'authentification multi-comptes dans le MVP) ; un bloc profil statique (nom, rôle) est affiché en bas de la navigation latérale, sans mécanisme de connexion | Gestion des rôles, permissions, commentaires, mentions, authentification |

Les éléments en gras ci-dessus étaient explicitement exclus du MVP dans la version 1.x du présent document ; ils sont désormais **inclus**, le prototype cliquable ayant été validé avec ce périmètre.

> **Décisions actées** (validées pour le lancement de l'implémentation) :
> - L'implémentation démarre avec l'**Option A** des recommandations techniques (section 5.1) : application **frontend seul**, sans backend, avec persistance des données dans le navigateur (`localStorage`).
> - Le **développement du backend est reporté à une phase ultérieure** ; il n'est donc pas requis pour le lancement du chantier de développement (voir section 5.1 — Phase 2).
> - La stack technique est verrouillée : **React 18 + TypeScript + Vite + Tailwind CSS + FontAwesome 6 Classic (styles solid et regular uniquement)** — voir section 5.1 et la skill d'implémentation `doztra-social-react-ui`.

> **Hypothèses de cadrage restant à valider avec le commanditaire** (non précisées dans le brief initial) :
> - L'application est monoposte / mono-utilisateur pour la Phase 1 (pas de gestion de comptes ni d'authentification) — cette hypothèse découle directement du choix de l'Option A, qui ne prévoit pas de backend partagé. Le nom/rôle affichés dans la sidebar (ex. "Mounia Diallo — Responsable social media") sont, à ce stade, une valeur statique de configuration, pas le résultat d'une connexion utilisateur.
> - Le champ "Réseau social" est une liste fermée alignée sur le prototype : **LinkedIn, Instagram, Facebook, TikTok, YouTube** (remplace la liste hypothétique de la v1.x qui incluait "X" et "Autre" — à reconfirmer si ces réseaux doivent être réintroduits).
> - Seul le champ "Sujet" est obligatoire par validation explicite ; le champ "Réseau social" est techniquement toujours valorisé (le sélecteur ne propose pas d'option vide, valeur par défaut "LinkedIn") sans qu'il s'agisse d'une règle de validation à proprement parler.

### 1.2 Cas d'usage principaux

| # | Cas d'usage | Acteur | Résultat attendu |
|---|---|---|---|
| CU1 | Planifier un nouveau contenu | Community manager | Un nouveau contenu apparaît dans la liste avec le statut "Brouillon" |
| CU2 | Corriger ou compléter un contenu existant | Community manager | Le contenu est mis à jour sans perte des informations non modifiées |
| CU3 | Suivre l'avancement de la production de contenu | Community manager / Responsable marketing | Visualisation rapide du nombre de contenus par statut |
| CU4 | Se concentrer sur les contenus à traiter en priorité | Community manager | Affichage filtré (ex. uniquement les "Brouillons" à finaliser, ou les "Validés" en attente de publication) |
| CU5 | Vérifier qu'aucun contenu incomplet n'est enregistré | Système | Blocage de l'enregistrement et message d'erreur si le sujet est vide |
| CU6 | Retrouver un contenu par mots-clés | Community manager | La liste se restreint aux contenus dont le sujet ou le public cible correspond à la recherche |
| CU7 | Filtrer les contenus d'un ou plusieurs réseaux sociaux | Community manager | La liste ne montre que les contenus des réseaux sociaux cochés |
| CU8 | Trier les contenus par date de publication | Community manager | La liste s'ordonne par date croissante ou décroissante selon le sens choisi |
| CU9 | Consulter le calendrier éditorial et naviguer entre les mois | Community manager | Les jours contenant au moins un contenu sont repérés visuellement ; cliquer sur un jour filtre la liste sur cette date |
| CU10 | Basculer entre la vue "Planification" (calendrier + cartes) et la vue "Tous les contenus" (tableau) | Community manager | La liste et les filtres actifs restent cohérents d'une vue à l'autre |
| CU11 | Changer le statut d'un contenu sans ouvrir le formulaire complet | Community manager | Un menu déroulant sur le badge de statut permet de choisir directement le nouveau statut |
| CU12 | Supprimer un contenu devenu inutile | Community manager | Le contenu disparaît définitivement de la liste |

---

## 2. Spécifications fonctionnelles détaillées

### 2.1 F1 — Formulaire de création / édition de contenu

**Description.** Un formulaire unique sert à la fois à la création d'un nouveau contenu et à l'édition d'un contenu existant (mêmes champs, même comportement de validation). Il expose les champs suivants :

| Champ | Obligatoire | Type de saisie | Exemple |
|---|---|---|---|
| Sujet | **Oui** (validé par RG1) | Champ texte court | "Lancement de la nouvelle fonctionnalité X" |
| Public cible | Non | Champ texte court | "Décideurs marketing B2B" |
| Réseau social | Toujours valorisé (pas de validation dédiée — pas d'option vide dans le sélecteur) | Liste déroulante à choix unique | LinkedIn, Instagram, Facebook, TikTok, YouTube |
| Date de publication prévue | Non | Sélecteur de date | 15/09/2026 |

**User Stories.**

- *En tant qu'utilisateur, je veux créer un nouveau contenu en renseignant son sujet, son public cible, le réseau social visé et une date de publication prévue, afin de planifier ma prochaine publication.*
- *En tant qu'utilisateur, je veux que le formulaire d'édition soit strictement identique au formulaire de création, afin de ne pas avoir à réapprendre une nouvelle interface pour corriger un contenu.*

**Règles de gestion.**

- RG1 : le champ "Sujet" ne peut pas être vide, ni composé uniquement d'espaces, à la validation du formulaire.
- RG2 : à la création, le statut du contenu est automatiquement fixé à "Brouillon" (non modifiable depuis le formulaire de création).
- RG3 : la date de publication prévue, si renseignée, doit être une date valide (le composant de saisie empêche nativement la saisie d'une date incorrecte).
- RG4 : en mode édition, tous les champs sont pré-remplis avec les valeurs existantes du contenu sélectionné.

### 2.2 F2 — Validation du formulaire et gestion des erreurs

**Description.** Le formulaire est validé côté client avant tout enregistrement (création ou mise à jour). Si le sujet est vide, l'enregistrement est bloqué et un message d'erreur explicite est affiché à proximité immédiate du champ concerné.

**User Story.**

- *En tant qu'utilisateur, je veux être averti clairement si j'ai oublié de renseigner le sujet de mon contenu, afin de corriger ma saisie avant d'enregistrer un contenu incomplet.*

**Règles de gestion et états d'erreur.**

| Condition | Comportement attendu |
|---|---|
| Sujet vide à la soumission | Blocage de l'enregistrement + message "Le sujet est obligatoire." affiché sous le champ + bordure du champ en couleur d'erreur |
| Sujet renseigné mais uniquement des espaces | Traité comme vide (trim avant validation) — même comportement que ci-dessus |
| Sujet corrigé après une première erreur | Le message d'erreur disparaît dès que l'utilisateur commence à saisir un caractère valide (validation réactive) |
| Tous les champs obligatoires valides | Le contenu est enregistré, un message de confirmation discret (toast) peut être affiché, et le formulaire se ferme |

### 2.3 F3 — Liste des contenus

**Description.** L'ensemble des contenus est présenté selon deux **vues navigables** (et non deux affichages responsives d'une même vue — correction apportée en v2.0, voir section 4.1) : la vue **"Planification"** (cartes de contenu accompagnées du calendrier éditorial, section 2.10) et la vue **"Tous les contenus"** (tableau, section 2.11). Chaque carte ou ligne affiche a minima : le sujet, le réseau social, le public cible, la date de publication prévue et le statut.

**User Story.**

- *En tant qu'utilisateur, je veux visualiser tous mes contenus planifiés en un seul endroit, afin d'avoir une vue d'ensemble de ma stratégie éditoriale sans avoir à ouvrir chaque contenu individuellement.*

**Règles de gestion.**

- RG5 : les contenus sont triés par défaut par date de publication prévue croissante ; les contenus sans date sont affichés en fin de liste.
- RG6 : si aucun contenu n'existe (première utilisation) ou si le filtre actif ne retourne aucun résultat, un état vide explicite est affiché (voir section 4.2).

### 2.4 F4 — Gestion des statuts

**Description.** Chaque contenu possède un statut parmi trois valeurs possibles : **Brouillon** (valeur par défaut à la création), **Validé**, **Publié**. Le statut représente l'avancement du contenu dans le cycle de production éditoriale.

**User Story.**

- *En tant qu'utilisateur, je veux voir immédiatement le statut de chaque contenu (Brouillon, Validé, Publié), afin de savoir ce qu'il me reste à faire avant publication.*
- *En tant qu'utilisateur, je veux pouvoir faire évoluer le statut d'un contenu (par exemple de "Brouillon" à "Validé"), afin de refléter l'avancement réel de mon travail.*

**Règles de gestion.**

- RG7 : le statut par défaut à la création est toujours "Brouillon", quelle que soit la saisie de l'utilisateur.
- RG8 : le changement de statut se fait, au choix, via le formulaire d'édition complet, **ou via un menu déroulant accessible en un clic sur le badge de statut** (carte comme ligne de tableau — RG21, aligné sur le prototype en v2.0).
- RG9 : aucune contrainte de séquence n'est imposée dans le MVP entre les statuts (un contenu "Publié" peut être repassé en "Brouillon" en cas d'erreur), sauf décision contraire du commanditaire.

### 2.5 F5 — Édition d'un contenu existant

**Description.** Chaque carte ou ligne de la liste dispose d'un bouton d'action "Modifier" qui ouvre le formulaire (section 2.1) pré-rempli avec les données du contenu sélectionné.

**User Story.**

- *En tant qu'utilisateur, je veux pouvoir modifier un contenu existant en un clic, afin de corriger une information sans avoir à recréer l'ensemble du contenu.*

**Règles de gestion.**

- RG10 : le bouton "Modifier" charge l'intégralité des champs existants, y compris le statut courant.
- RG11 : les mêmes règles de validation que la création s'appliquent à la sauvegarde d'une édition (RG1).
- RG12 : une action d'annulation permet de fermer le formulaire d'édition sans enregistrer les modifications.

### 2.6 F6 — Filtrage par statut

**Description.** Un contrôle de filtrage (ex. onglets ou boutons segmentés) permet d'afficher dynamiquement les contenus selon leur statut : "Tous", "Brouillon", "Validé", "Publié". Le filtrage s'applique instantanément, sans rechargement de page.

**User Story.**

- *En tant qu'utilisateur, je veux filtrer ma liste de contenus par statut, afin de me concentrer rapidement sur les contenus qui nécessitent une action (par exemple uniquement mes brouillons à finaliser).*

**Règles de gestion.**

- RG13 : le filtre "Tous" est sélectionné par défaut à l'ouverture de l'application.
- RG14 : le filtrage est purement d'affichage : il ne modifie ni ne supprime aucune donnée.
- RG15 : chaque option de filtre peut afficher, à titre indicatif, le nombre de contenus correspondants (ex. "Brouillon (4)").

### 2.7 F7 — Recherche textuelle *(nouveau en v2.0)*

**Description.** Un champ de recherche, situé dans la barre supérieure, filtre la liste en temps réel sur le sujet et le public cible du contenu.

**User Story.**

- *En tant qu'utilisateur, je veux retrouver rapidement un contenu en tapant quelques mots-clés, afin de ne pas avoir à parcourir toute ma liste.*

**Règles de gestion.**

- RG16 : la recherche porte sur les champs `sujet` et `publicCible`, sans distinction de casse ; elle se combine avec les filtres de statut (F6), de réseau social (F8) et de date sélectionnée (F10), ainsi qu'avec le tri (F9).
- La recherche est déclenchée à chaque frappe (pas de bouton de validation), sans délai de "debounce" imposé dans le MVP.

### 2.8 F8 — Filtrage par réseau social *(nouveau en v2.0)*

**Description.** Un panneau "Filtres" (accessible depuis un bouton dans la barre supérieure) propose une sélection à cases à cocher des réseaux sociaux ; un ou plusieurs réseaux peuvent être cochés simultanément.

**User Story.**

- *En tant qu'utilisateur, je veux ne voir que les contenus d'un ou plusieurs réseaux sociaux précis, afin de préparer ma publication réseau par réseau.*

**Règles de gestion.**

- RG17 : le filtre réseau social est **multi-sélection** et cumulatif (ET logique) avec les autres filtres actifs (statut, recherche, date). Aucun réseau coché équivaut à "tous les réseaux".

### 2.9 F9 — Tri par date de publication *(nouveau en v2.0)*

**Description.** Un bouton "Trier" bascule l'ordre d'affichage de la liste entre date de publication prévue croissante et décroissante.

**User Story.**

- *En tant qu'utilisateur, je veux inverser l'ordre chronologique de ma liste, afin de voir en premier soit mes prochaines échéances, soit mes contenus les plus récents.*

**Règles de gestion.**

- RG18 : le tri s'applique sur `datePublicationPrevue` ; l'ordre croissant est la valeur par défaut à l'ouverture (cohérent avec RG5) ; un clic sur le bouton "Trier" inverse le sens et met à jour l'icône (flèche vers le haut/bas).

### 2.10 F10 — Vue "Planification" (calendrier éditorial) *(nouveau en v2.0)*

**Description.** La vue par défaut de l'application combine un widget calendrier (navigation mois par mois) et la liste de cartes de contenu. Les jours du mois contenant au moins un contenu planifié sont repérés par une pastille ; le jour courant est mis en évidence.

**User Story.**

- *En tant qu'utilisateur, je veux visualiser mon calendrier de publication et cliquer sur un jour précis, afin de voir immédiatement ce qui est prévu ce jour-là.*

**Règles de gestion.**

- RG19 : cliquer sur un jour du calendrier filtre la liste de contenus sur cette date exacte ; un badge "Filtré : [date]" apparaît avec une action pour retirer ce filtre ; cliquer à nouveau sur le même jour retire également le filtre.
- La navigation mois précédent/suivant ne modifie pas le filtre de date actif.

### 2.11 F11 — Vue "Tous les contenus" (tableau) *(nouveau en v2.0)*

**Description.** Une vue alternative, accessible depuis la navigation latérale, affiche l'ensemble des contenus sous forme de tableau (colonnes : Sujet, Réseau, Public cible, Statut, Date, Actions), sans le calendrier.

**User Story.**

- *En tant qu'utilisateur, je veux une vue tabulaire dense de tous mes contenus, afin de comparer et traiter un grand nombre d'éléments rapidement.*

**Règles de gestion.**

- RG20 : les vues "Planification" et "Tous les contenus" partagent exactement les mêmes filtres actifs (recherche, statut, réseau social, tri) ; changer de vue ne réinitialise pas les filtres, à l'exception du filtre de date du calendrier qui n'a pas de sens hors de la vue "Planification" et est réinitialisé au changement de vue.

### 2.12 F12 — Suppression d'un contenu *(nouveau en v2.0)*

**Description.** Une action "Supprimer" (icône corbeille), disponible sur chaque carte et chaque ligne de tableau, retire définitivement un contenu.

**User Story.**

- *En tant qu'utilisateur, je veux pouvoir supprimer un contenu qui n'est plus pertinent, afin de garder ma liste de planification propre.*

**Règles de gestion.**

- L'action de suppression peut être masquée globalement (bascule de configuration), par exemple pour un profil qui ne devrait pas pouvoir supprimer — utile en anticipation d'une future gestion des rôles (Phase 2).
- **RG22 — Point ouvert à trancher avant l'implémentation finale :** dans le prototype validé, la suppression est **immédiate au clic**, sans confirmation. Le risque de perte de données accidentelle étant réel (aucun "annuler" possible), il est recommandé d'ajouter une confirmation (modale "Confirmer la suppression ?" ou action "Annuler" temporaire de quelques secondes) avant suppression définitive. À valider avec le commanditaire ; en l'absence de décision contraire, l'implémentation reproduira le comportement du prototype (suppression immédiate).

### Synthèse des règles de gestion

| Code | Fonctionnalité | Règle |
|---|---|---|
| RG1 | Formulaire | Le sujet est obligatoire (non vide, non composé uniquement d'espaces) |
| RG2 | Formulaire | Statut forcé à "Brouillon" à la création |
| RG3 | Formulaire | La date de publication doit être valide si renseignée |
| RG4 | Édition | Pré-remplissage complet des champs existants |
| RG5 | Liste | Tri par défaut par date de publication croissante |
| RG6 | Liste | Affichage d'un état vide si aucun résultat |
| RG7 | Statuts | "Brouillon" = valeur par défaut immuable à la création |
| RG8 | Statuts | Changement de statut via édition **ou** menu déroulant sur le badge (RG21) |
| RG9 | Statuts | Pas de contrainte de séquence entre statuts |
| RG10 | Édition | Chargement intégral des données existantes |
| RG11 | Édition | Mêmes règles de validation qu'à la création |
| RG12 | Édition | Annulation possible sans sauvegarde |
| RG13 | Filtres | "Tous" sélectionné par défaut |
| RG14 | Filtres | Filtrage sans impact sur les données |
| RG15 | Filtres | Compteur indicatif par statut (recommandé) |
| RG16 | Recherche | Porte sur `sujet` + `publicCible`, insensible à la casse, cumulable avec les autres filtres |
| RG17 | Filtres | Filtre réseau social multi-sélection, cumulatif (ET logique) |
| RG18 | Tri | Tri sur `datePublicationPrevue`, croissant par défaut, bascule au clic |
| RG19 | Calendrier | Clic sur un jour = filtre par date exacte ; re-clic ou "×" retire le filtre |
| RG20 | Vues | Filtres partagés entre les deux vues ; filtre de date réinitialisé au changement de vue |
| RG21 | Statuts | Changement de statut en un clic via menu déroulant sur le badge (carte et tableau) |
| RG22 | Suppression | **Point ouvert** — suppression immédiate sans confirmation dans le prototype ; confirmation recommandée, à trancher |

---

## 3. Modèle de données (Data Schema)

### 3.1 Entité "Contenu"

| Champ | Type | Obligatoire | Contraintes | Valeur par défaut |
|---|---|---|---|---|
| `id` | UUID / string | Oui | Généré automatiquement, unique | Généré à la création |
| `sujet` | string | **Oui** | Non vide après suppression des espaces ; longueur max recommandée : 200 caractères | — |
| `publicCible` | string | Non | Longueur max recommandée : 150 caractères | `null` / chaîne vide |
| `reseauSocial` | enum (string) | Toujours valorisé (pas d'option vide dans le sélecteur) | Valeurs autorisées : `LinkedIn`, `Instagram`, `Facebook`, `TikTok`, `YouTube` | `LinkedIn` |
| `datePublicationPrevue` | date (ISO 8601) | Non | Doit être une date valide si renseignée | `null` |
| `statut` | enum (string) | Oui | Valeurs autorisées : `Brouillon`, `Validé`, `Publié` | `Brouillon` |
| `dateCreation` | datetime (ISO 8601) | Oui | Généré automatiquement, non modifiable | Date/heure de création |
| `dateModification` | datetime (ISO 8601) | Oui | Mis à jour automatiquement à chaque enregistrement | Date/heure de dernière modification |

### 3.2 Exemple de représentation JSON

```json
{
  "id": "c1a2b3c4-d5e6-7f89-0123-456789abcdef",
  "sujet": "Lancement de la nouvelle fonctionnalité X",
  "publicCible": "Décideurs marketing B2B",
  "reseauSocial": "LinkedIn",
  "datePublicationPrevue": "2026-09-15",
  "statut": "Brouillon",
  "dateCreation": "2026-09-03T09:12:00Z",
  "dateModification": "2026-09-03T09:12:00Z"
}
```

### 3.3 Remarques sur le modèle

- L'énumération `statut` doit être centralisée dans une constante partagée (front) afin d'éviter toute divergence entre le formulaire, l'affichage et le filtrage.
- Le champ `dateModification` permet, en évolution future, de trier ou d'auditer les contenus récemment modifiés — non exploité dans le MVP mais recommandé dès la conception du schéma.
- Aucune relation avec d'autres entités (utilisateur, campagne, média) n'est nécessaire dans le périmètre du MVP.

**Impact de la Phase 1 (Option A — sans backend) sur le modèle de données.**

- En l'absence de backend, l'`id` de chaque contenu est généré **côté client** (ex. `crypto.randomUUID()`), ce qui est suffisant tant que les données ne sont pas partagées entre appareils.
- L'ensemble de l'entité `Contenu` (schéma ci-dessus) est sérialisé tel quel en JSON et persisté dans le `localStorage` du navigateur ; ce schéma est conçu pour rester **compatible sans modification** avec une future base de données (Option B), ce qui évite toute refonte du modèle lors du passage au backend.
- Point de vigilance pour la Phase 2 : lors de l'introduction du backend, prévoir un mécanisme de **migration/import** des contenus existants en `localStorage` vers la base de données, afin de ne pas faire perdre aux utilisateurs les contenus déjà planifiés.

---

## 4. Ergonomie & Parcours Utilisateur (UX/UI)

### 4.1 Layout de la page *(mis à jour en v2.0 — aligné sur le prototype cliquable)*

L'application est une application à page unique (pas de navigation multi-pages), structurée en trois zones fixes plus une couche modale, conformément au prototype validé :

| Zone | Contenu | Comportement |
|---|---|---|
| Navigation latérale | 260px, fixe et sticky ; logo/nom "Doztra Social", deux entrées de navigation ("Planification", "Tous les contenus"), bloc profil statique en pied de sidebar | Toujours visible, indépendante du défilement du contenu |
| Barre supérieure | Champ de recherche (F7), bouton "Filtres" (panneau réseau social, F8), bouton "Trier" (F9), bouton principal "+ Nouveau contenu" | Sticky en haut de la zone de contenu |
| Zone principale | Titre + sous-titre de la vue active, puces de filtre par statut (F6), puis selon la vue active : **Planification** (calendrier + cartes, F10) ou **Tous les contenus** (tableau, F11) | Change selon la navigation latérale ; les filtres actifs sont conservés (RG20) |
| Formulaire | Fenêtre modale centrée, ouverte par "+ Nouveau contenu" ou "Modifier" | Superposée à toute l'application, ferme au clic en dehors ou sur l'icône de fermeture |

**Correction apportée en v2.0 :** la version 1.x du présent document décrivait "cartes en mobile / tableau en desktop" comme deux affichages responsives d'une même liste. Le prototype validé montre en réalité **deux vues distinctes et navigables** (Planification avec calendrier, et Tous les contenus en tableau), accessibles depuis la navigation latérale, indépendamment de la taille d'écran — chacune restant elle-même responsive sur son propre contenu.

Le choix d'un formulaire en fenêtre modale (plutôt qu'une page dédiée ou un panneau latéral) permet de conserver le contexte de la liste visible en arrière-plan, et correspond à l'usage attendu d'un outil de planification rapide.

### 4.2 Feedbacks visuels

**Code couleur par statut** (issu du design system Doztra Social, section 4.3) :

| Statut | Fond | Texte / pastille | Usage |
|---|---|---|---|
| Brouillon | `#F1F5F9` | `#475569` (pastille `#94A3B8`) | Badge de statut, pastille de carte |
| Validé | `#FEF3E2` | `#B45309` (pastille `#F59E0B`) | Badge de statut, pastille de carte |
| Publié | `#DCFCE7` | `#15803D` (pastille `#22C55E`) | Badge de statut, pastille de carte |

Ces couleurs sont volontairement issues d'une même famille de badges "pilule" à fond clair et texte foncé, plutôt que de couleurs pleines, afin de rester lisibles et peu agressives dans une liste dense de contenus.

**Messages d'erreur.**

- Affichés en rouge, directement sous le champ concerné.
- Accompagnés d'une icône d'alerte pour une identification rapide, y compris pour les utilisateurs daltoniens (ne pas se reposer uniquement sur la couleur).
- Le champ en erreur reçoit une bordure rouge et le focus clavier est ramené sur ce champ à la tentative de soumission.

**État vide.**

- Si la liste est vide (aucun contenu créé) : message d'accueil invitant à créer le premier contenu, avec un bouton d'action menant directement vers le formulaire.
- Si un filtre ne retourne aucun résultat : message contextuel du type "Aucun contenu avec le statut « Validé » pour le moment."

**Confirmations.**

- Un message de confirmation discret (toast/notification temporaire) est affiché après chaque création, modification ou changement de statut réussi.

**Icônes.**

- Toutes les icônes de l'interface utilisent **FontAwesome 6, famille Classic, styles `solid` et `regular` exclusivement** (jamais `light`, `thin`, `duotone`, `sharp` ni `brands`). Le mapping exhaustif icône ↔ usage est détaillé dans la skill d'implémentation `doztra-social-react-ui` et dans `CLAUDE.md`.

### 4.3 Design system

Un design system visuel dédié — **« Doztra Social — Design System »** — a été produit à partir d'un modèle de référence (tableau de bord SaaS à navigation latérale, badges de statut arrondis, cartes de contenu), puis affiné en un **prototype cliquable complet** (`Doztra Social - Planificateur.dc.html`) couvrant les deux vues, le calendrier, le tableau et la modale de formulaire. Ce prototype est désormais la référence visuelle et comportementale pour l'implémentation, au même titre que le présent cahier des charges. Le design system précise, au-delà du présent document :

| Fondation | Choix retenu |
|---|---|
| Couleur d'accent | Violet `#7C5CFC` ("Doztra Violet") |
| Neutres | Fond `#FAFAFB`, surface `#FFFFFF`, bordure `#E4E4E7`, texte secondaire `#71717A`, texte primaire `#18181B` |
| Typographie | Plus Jakarta Sans (police unique, hiérarchie par poids/taille — Display, H1, H2, Body, Small, Label) |
| Espacements | Échelle en base 4 (4, 8, 12, 16, 24, 32, 48, 64 px) |
| Rayons | `sm` 8px, `md` 12px, `lg` 16px, `pill` 999px |

Le design system illustre également les composants clés issus des sections 2 et 4 : boutons (primaire/secondaire/texte), champs de formulaire (état normal et état d'erreur du champ "Sujet", conformément à RG1/F2), badges de statut, filtres segmentés (F6), carte de contenu (F3/F4/F5) et navigation latérale. Il sert de référence unique pour l'implémentation de l'interface en Phase 1 (section 5.1) et pourra être enrichi au fil du projet.

---

## 5. Recommandations techniques

### 5.1 Architecture retenue et trajectoire d'évolution

Le MVP ne nécessite ni authentification multi-utilisateurs, ni logique métier complexe côté serveur : la priorité est la vitesse de mise en œuvre et la simplicité de maintenance. Trois options avaient été envisagées, classées de la plus rapide à la plus robuste :

| Option | Stack | Avantages | Limites |
|---|---|---|---|
| **A — Frontend seul ✅ RETENUE POUR LA PHASE 1** | **React 18 + TypeScript + Vite + Tailwind CSS + FontAwesome 6 Classic (solid/regular)** — stack verrouillée en v2.0, voir détails ci-dessous | Aucun backend à héberger, développement très rapide, coût nul | Données non partagées entre appareils/utilisateurs, pas de sauvegarde centralisée |
| **B — Fullstack léger (prévue en Phase 2, à confirmer)** | React + Vite (front) / Supabase ou Firebase (backend-as-a-service : base de données + API auto-générée) | Persistance centralisée, évolutif vers du multi-utilisateur, mise en place en quelques heures | Dépendance à un service tiers, coûts au-delà d'un certain volume |
| **C — No-code / Low-code (écartée)** | Bubble, ou Airtable (base de données) + Softr/Glide (interface) | Aucun développement requis, prototypage quasi instantané | Personnalisation UX limitée, moins adapté à une montée en charge ou à une intégration future avec des API de réseaux sociaux |

**Décision actée — Phase 1 (implémentation immédiate) :** le développement démarre avec l'**Option A**, sur une stack désormais verrouillée : **React 18, TypeScript, Vite, Tailwind CSS, icônes FontAwesome 6 Classic (styles `solid` et `regular` uniquement)**. L'application est un frontend autonome, sans aucun backend ni API : toutes les données (contenus, statuts, filtres) sont gérées en mémoire côté client et persistées dans le `localStorage` du navigateur via un hook dédié (`useContenus`, section 5.2). Cette approche permet de livrer rapidement une version fonctionnelle complète des sections 2, 3 et 4 du présent cahier des charges, et de valider l'usage réel de l'outil avant tout investissement backend. Les détails d'implémentation (tokens Tailwind, mapping d'icônes, arborescence de composants) sont portés par le fichier `CLAUDE.md` du dépôt et par la skill `doztra-social-react-ui` — le présent document reste la référence fonctionnelle, ces outils portent le "comment coder".

**Phase 2 (ultérieure, hors périmètre du chantier actuel) :** le backend sera développé dans un second temps, lorsque le besoin de persistance centralisée, de sauvegarde ou de partage multi-appareils/multi-utilisateurs sera confirmé. L'**Option B** (Supabase/Firebase) reste la piste recommandée à ce stade pour cette phase, car elle permet une migration progressive sans réécriture du frontend ni du modèle de données (cf. section 3.3) — ce choix technologique définitif devra toutefois être reconfirmé au lancement de la Phase 2, en fonction des besoins précisés à ce moment-là (volumétrie, authentification, budget).

**Points de vigilance pour préparer la transition Phase 1 → Phase 2 dès la Phase 1 :**

- Isoler l'accès aux données (lecture/écriture des contenus) derrière une couche d'abstraction dédiée (ex. un module ou un hook `useContenus`) plutôt que d'appeler `localStorage` directement dans les composants d'interface — cela permettra de remplacer cette couche par des appels API sans modifier l'UI.
- Conserver le modèle de données de la section 3 comme unique source de vérité du format des contenus, y compris en Phase 1.
- Ne pas coder de logique métier qui supposerait un utilisateur unique de façon irréversible (ex. éviter de stocker des données globales non rattachées à une notion de "contenu"), afin de simplifier une future gestion multi-utilisateurs.

### 5.2 Principes de gestion d'état (State Management)

| Principe | Application au projet |
|---|---|
| **Source unique de vérité** | La liste complète des contenus est stockée une seule fois (état global ou store) ; la vue filtrée est **dérivée** de cette liste + du filtre actif, jamais dupliquée dans un état séparé |
| **État local vs état partagé** | L'état du formulaire (champs en cours de saisie, erreurs de validation) reste local au composant formulaire ; l'état de la liste des contenus et du filtre actif est partagé au niveau de l'application |
| **Outil recommandé** | Pour la Phase 1 (Option A) en React : `useState` / `useReducer` + Context API suffisent ; si la complexité augmente lors du passage en Phase 2 (backend), une librairie légère comme Zustand est recommandée plutôt que Redux, pour limiter le code répétitif |
| **Flux de mise à jour** | Toute création/édition passe par une fonction unique de mise à jour de la liste (ex. `upsertContenu`), garantissant que l'ajout et la modification suivent la même logique de validation et de recalcul du filtrage |
| **Persistance** | Phase 1 : synchronisation de l'état global vers `localStorage` à chaque mutation. Phase 2 : cette même fonction de persistance sera remplacée par des appels à l'API backend, avec gestion optimiste de l'interface (l'UI se met à jour immédiatement, sans attendre la confirmation serveur) — d'où l'importance d'isoler cette logique (cf. section 5.1) |
| **Immutabilité** | Les mises à jour de contenu créent un nouvel objet plutôt que de muter l'existant, afin de garantir la prévisibilité du re-rendu et de faciliter un futur historique des modifications |

### 5.3 Documents et outils du projet *(nouveau en v2.0)*

| Document / outil | Rôle |
|---|---|
| Présent cahier des charges | Référence fonctionnelle et technique — le "quoi" et le "pourquoi" |
| Design system « Doztra Social — Design System » | Référence visuelle (couleurs, typographie, espacements, composants) |
| Prototype cliquable « Doztra Social - Planificateur » | Référence comportementale (interactions, états, logique d'affichage) |
| `CLAUDE.md` (racine du dépôt) | Instructions de contexte pour l'implémentation assistée — commandes, conventions, architecture |
| Skill `doztra-social-react-ui` | Procédure d'implémentation UI en React/TypeScript/Tailwind (tokens, composants, icônes FontAwesome) |
| Skill `doztra-social-business-rules` | Procédure de vérification des règles de gestion (RG1-RG22) lors de l'implémentation ou de la revue de code |

---

*Fin du document — Doztra Social — Version 2.0*
