# CLAUDE.md — Doztra Social

Instructions de contexte pour tout travail sur ce dépôt. Ce fichier donne les conventions et commandes du projet ; il ne remplace pas les documents de référence ci-dessous — il y renvoie.

## Contexte du projet

Doztra Social est un **mini-planificateur de contenu pour réseaux sociaux** : formulaire de création/édition, liste de contenus avec statuts (Brouillon / Validé / Publié), calendrier éditorial, recherche, filtres, tri. Phase 1 en cours : application **frontend seul**, sans backend, données persistées dans `localStorage`. Le backend (Phase 2) n'est pas dans le périmètre actuel.

## Documents et outils de référence

Toujours consulter ces documents avant de trancher une question fonctionnelle ou visuelle — ne jamais improviser une règle de gestion ou une couleur non documentée :

| Document / outil | Rôle | Emplacement |
|---|---|---|
| `docs/cahier-des-charges.md` | Référence fonctionnelle et technique (user stories, règles de gestion RG1-RG22, modèle de données) | Dépôt, dossier `docs/` |
| Design system « Doztra Social — Design System » | Référence visuelle (couleurs, typographie, espacements, composants) | Artifact publié |
| Prototype cliquable « Doztra Social - Planificateur » | Référence comportementale (interactions, états, logique d'affichage exacte) | Fourni par l'équipe produit |
| Skill `doztra-social-react-ui` | Tokens Tailwind, mapping FontAwesome, inventaire des composants | Skill Claude |
| Skill `doztra-social-business-rules` | Checklist des règles de gestion (RG1-RG22) à appliquer/vérifier | Skill Claude |

**Avant toute tâche d'implémentation ou de revue touchant l'UI, invoquer la skill `doztra-social-react-ui`. Avant toute tâche touchant la création/édition/statuts/filtres/suppression d'un contenu, invoquer `doztra-social-business-rules`.**

## Stack technique (verrouillée)

- **React 18** + **TypeScript** (mode strict) — composants fonctionnels et hooks uniquement, jamais de composants classe.
- **Vite** comme bundler/dev server.
- **Tailwind CSS** pour tout le style — pas de CSS-in-JS, pas de bibliothèque de composants tierce (pas de MUI, Chakra, Ant Design, etc.).
- **FontAwesome 6, famille Classic, styles `solid` et `regular` exclusivement** via `@fortawesome/react-fontawesome` — jamais `light`, `thin`, `duotone`, `sharp` ni `brands` (voir skill `doztra-social-react-ui` pour le mapping exact des icônes).
- Pas de backend en Phase 1 : persistance via `localStorage`, isolée derrière le hook `useContenus` (jamais d'appel direct à `localStorage` dans un composant d'UI).

## Commandes

```bash
npm install        # installation des dépendances
npm run dev         # serveur de développement Vite
npm run build        # build de production
npm run typecheck    # vérification TypeScript (tsc --noEmit)
npm run lint          # ESLint
npm run test          # tests (Vitest + React Testing Library)
```

Avant de considérer une tâche terminée : `npm run typecheck` et `npm run lint` doivent passer sans erreur.

## Conventions de code

- Un composant par fichier, nommé en `PascalCase.tsx` ; hooks et utilitaires en `camelCase.ts`.
- Exports nommés (pas d'`export default`) pour tous les composants, hooks et types, afin de garder des noms cohérents entre déclaration et import.
- Props typées via une interface `XxxProps` déclarée juste au-dessus du composant.
- Aucune couleur, taille de police, espacement ou rayon en valeur brute dans le JSX : utiliser exclusivement les classes Tailwind issues des tokens définis dans `tailwind.config.ts` (`accent`, `canvas`, `surface`, `border`, `ink`, `status.*`, `danger` — voir skill `doztra-social-react-ui`).
- Ne jamais construire une classe Tailwind par concaténation de variable (ex. `` `bg-status-${statut}-bg` ``) — le scanner JIT de Tailwind ne la détecterait pas. Toujours passer par une table de correspondance à chaînes littérales complètes (`STATUS_CLASSES`, déjà définie dans la skill `doztra-social-react-ui`).
- Toute mutation de la liste de contenus passe par le hook `useContenus` (fonctions `upsertContenu`, `removeContenu`, `setStatut`) — jamais de mutation directe d'un tableau d'état.
- Les mises à jour de contenu sont immutables (nouvel objet, jamais de mutation de l'existant).

## Modèle de données

Le type `Contenu` et ses champs (`sujet`, `publicCible`, `reseauSocial`, `datePublicationPrevue`, `statut`, `dateCreation`, `dateModification`) sont définis dans `docs/cahier-des-charges.md` section 3 et repris tels quels dans `src/types/contenu.ts` — ne pas renommer ou ajouter de champ sans mettre à jour le cahier des charges en parallèle.

## Règles de gestion incontournables (résumé — liste complète RG1-RG22 dans le cahier des charges)

- Le sujet est obligatoire (non vide après `trim()`) ; erreur inline "Le sujet est obligatoire." + bordure rouge sinon (RG1).
- Un nouveau contenu est toujours créé avec le statut "Brouillon" (RG2, RG7).
- Le statut peut être changé via le formulaire d'édition **ou** via le menu déroulant du badge, sur la carte comme sur la ligne de tableau (RG8, RG21).
- Le filtre de statut "Tous" est actif par défaut (RG13) ; la recherche, le filtre réseau social, le tri et le filtre de date du calendrier se combinent tous entre eux (RG16-RG20).
- **Point ouvert (RG22)** : la suppression d'un contenu est aujourd'hui immédiate au clic, sans confirmation, dans le prototype validé. Reproduire ce comportement tant qu'aucune décision contraire n'est actée — ne pas ajouter unilatéralement une modale de confirmation sans en informer l'équipe produit.

## Ce qu'il ne faut pas faire

- Ne pas introduire de bibliothèque de composants UI tierce.
- Ne pas utiliser d'icônes hors FontAwesome Classic solid/regular.
- Ne pas coder de logique de backend ou d'appel réseau en Phase 1 (le projet est frontend seul).
- Ne pas modifier le modèle de données (`src/types/contenu.ts`) sans répercuter le changement dans `docs/cahier-des-charges.md`.
- Ne pas supposer une authentification ou une gestion multi-utilisateurs : l'application est mono-utilisateur en Phase 1.
