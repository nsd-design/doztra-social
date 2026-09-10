# Doztra Social — Implémentation React + TypeScript + Tailwind

Cette skill encode la source de vérité visuelle et structurelle de **Doztra Social** (mini-planificateur de contenu pour réseaux sociaux) : le design canvas validé (`Doztra Social - Planificateur.dc.html`, vues "Planification" et "Tous les contenus") et le design system associé, tous deux repris dans le cahier des charges v2.0 (`docs/cahier-des-charges.md`). Elle s'applique à toute tâche de construction ou de retouche de l'interface en React 18+, TypeScript et Tailwind CSS.

Ne pas inventer de nouvelles couleurs, espacements, rayons ou icônes : tout ce dont l'implémentation a besoin est ci-dessous, extrait littéralement du prototype validé (pas de valeurs arrondies à une grille 4/8px différente de celle déjà utilisée). Pour les règles de gestion (validation, statuts, filtres), voir la skill compagnon `doztra-social-business-rules`.

## Pile technique attendue

- React 18+ avec TypeScript (composants fonctionnels, hooks — pas de classes).
- Tailwind CSS pour tout le style ; pas de CSS-in-JS, pas de fichiers `.css` par composant sauf le point d'entrée global (police + reset Tailwind).
- Police **Plus Jakarta Sans** (Google Fonts), poids 500/600/700/800 uniquement.
- Icônes **FontAwesome 6, famille Classic exclusivement, styles `solid` et `regular` uniquement** — jamais `light`, `thin`, `duotone`, `sharp` ni `brands`, même si un style plus fin semblerait "mieux" quelque part. Le prototype validé n'utilise que du texte pour les réseaux sociaux, jamais de logo de marque — ne pas ajouter `free-brands-svg-icons` sans demande explicite.

## Design tokens (Tailwind `theme.extend`)

```ts
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: { DEFAULT: '#7C5CFC', hover: '#6A47E8', tint: '#F3EFFE' },
        canvas: '#FAFAFB',   // fond de page
        surface: '#FFFFFF',  // cartes, sidebar, topbar, modale
        border: '#E4E4E7',
        ink: { DEFAULT: '#18181B', secondary: '#71717A', placeholder: '#A1A1AA' },
        danger: '#DC2626',
        status: {
          brouillon: { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' },
          valide:    { bg: '#FEF3E2', text: '#B45309', dot: '#F59E0B' },
          publie:    { bg: '#DCFCE7', text: '#15803D', dot: '#22C55E' },
        },
      },
      boxShadow: {
        dropdown: '0 12px 32px rgba(24,24,27,0.12)',
        modal: '0 20px 60px rgba(0,0,0,0.25)',
      },
    },
  },
}
```

L'échelle d'espacement (4/8/12/16/24/32/48/64px) et les rayons (`sm`=8px, `md`=12px, `lg`=16px, `pill`=999px) correspondent déjà à l'échelle par défaut de Tailwind — ne pas créer de tokens custom pour ça, utiliser directement `p-1..p-16`, `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-full` (pill).

Import de la police dans `index.html` :
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
```

**Échelle typographique** (nom · taille/interligne · poids) : Display 32/40 · 700, H1 24/32 · 700, H2 18/26 · 600, Body 15/22 · 500, Small 13/18 · 500, Label 12/16 · 700 (uppercase, tracking large — utilisé pour les libellés de statut/colonnes).

**Piège Tailwind à éviter** : les classes de statut ne doivent jamais être construites dynamiquement (`` `bg-status-${key}-bg` `` n'est pas détecté par le scanner JIT de Tailwind). Utiliser une table de correspondance à chaînes littérales complètes :
```ts
export const STATUS_CLASSES: Record<Statut, string> = {
  Brouillon: 'bg-status-brouillon-bg text-status-brouillon-text',
  'Validé':  'bg-status-valide-bg text-status-valide-text',
  'Publié':  'bg-status-publie-bg text-status-publie-text',
};
export const STATUS_DOT: Record<Statut, string> = {
  Brouillon: '#94A3B8', 'Validé': '#F59E0B', 'Publié': '#22C55E',
};
```

## FontAwesome — installation et mapping d'icônes

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome
```

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

<FontAwesomeIcon icon={faPen} className="text-xs" />
```

Ne jamais importer depuis `free-brands-svg-icons` ou un package Pro (light/thin/duotone/sharp). Table exhaustive des icônes utilisées dans le prototype validé :

| Usage | Style | Icône | Import |
|---|---|---|---|
| Nav "Planification" | solid | calendar-days | `faCalendarDays` |
| Nav "Tous les contenus" | solid | table-list | `faTableList` |
| Champ de recherche | solid | magnifying-glass | `faMagnifyingGlass` |
| Bouton "Filtres" | solid | sliders | `faSliders` |
| Case à cocher réseau (cochée) | solid | check | `faCheck` |
| Bouton "Nouveau contenu" | solid | plus | `faPlus` |
| Lien "Voir tous les contenus" | solid | arrow-right | `faArrowRight` |
| Navigation calendrier (préc./suiv.) | solid | chevron-left / chevron-right | `faChevronLeft` / `faChevronRight` |
| Puce "Filtré : date" (fermer) | solid | xmark | `faXmark` |
| Caret du badge de statut | solid | chevron-down | `faChevronDown` |
| Action "Modifier" | solid | pen | `faPen` |
| Action "Supprimer" | solid | trash | `faTrash` |
| État vide (aucun contenu) | regular | folder-open | `faFolderOpen` |
| Fermeture de la modale | regular | circle-xmark | `faCircleXmark` |
| Tri (croissant/décroissant) | solid | arrow-up-wide-short / arrow-down-wide-short | `faArrowUpWideShort` / `faArrowDownWideShort` |

## Modèle de données

```ts
export type Statut = 'Brouillon' | 'Validé' | 'Publié';
export type ReseauSocial = 'LinkedIn' | 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube';

export interface Contenu {
  id: string;
  sujet: string;
  publicCible?: string;
  reseauSocial: ReseauSocial; // toujours valorisé, pas d'option vide dans le sélecteur — défaut 'LinkedIn'
  datePublicationPrevue?: string; // ISO 8601
  statut: Statut;
  dateCreation: string;
  dateModification: string;
}
```

**Décidé en v2.0 du cahier des charges** : la liste des réseaux sociaux est alignée sur le prototype (`LinkedIn, Instagram, Facebook, TikTok, YouTube`) — ne pas réintroduire "X" ou "Autre" sans une demande explicite du commanditaire ; si cela arrive, mettre à jour ce type ET `docs/cahier-des-charges.md` section 3 dans le même changement.

## Persistance et accès aux données (Phase 1 — frontend seul)

Isoler tout accès aux données derrière un hook dédié, jamais d'appel direct à `localStorage` dans les composants d'UI :

```ts
// hooks/useContenus.ts
export function useContenus() {
  // charge depuis localStorage au montage, expose contenus + upsertContenu + removeContenu + setStatut
  // upsertContenu applique RG1 (sujet non vide après trim) et RG2/RG7 (statut = 'Brouillon' à la création)
  // toute mutation persiste immédiatement dans localStorage (source unique de vérité)
}
```

Cette couche est celle qui sera remplacée par des appels API lors du passage en Phase 2 (backend), sans changement des composants d'UI.

## Inventaire des composants

```
src/
  types/contenu.ts
  data/statusStyles.ts        # STATUS_CLASSES, STATUS_DOT
  hooks/useContenus.ts
  components/
    layout/Sidebar.tsx        # 260px fixe, sticky, logomark + nav (Planification / Tous les contenus) + profil bas de sidebar
    layout/Topbar.tsx         # recherche + FiltersDropdown + SortToggle + bouton primaire "Nouveau contenu"
    layout/ViewHeader.tsx     # titre + sous-titre, lien "Voir tous les contenus" (vue Planification uniquement)
    filters/StatusFilterChips.tsx   # Tous / Brouillon / Validé / Publié, avec compteur
    filters/PlatformFilterDropdown.tsx
    filters/SortToggle.tsx
    calendar/CalendarWidget.tsx     # mois navigable, pastille sur les jours avec contenu, clic = filtre par date
    content/ContentCard.tsx         # vue Planification
    content/ContentTable.tsx        # vue Tous les contenus (grille 1.6fr .9fr 1.2fr .9fr .8fr .7fr)
    content/StatusBadge.tsx         # badge pilule + StatusMenu (changement de statut en un clic, RG8/RG21)
    content/ContentFormModal.tsx    # création/édition — champ Sujet requis avec erreur inline (RG1/F2)
    content/EmptyState.tsx
    ui/Button.tsx / TextInput.tsx / SelectInput.tsx / DateInput.tsx
  views/PlanningView.tsx
  views/AllContentView.tsx
```

## Points d'attention fonctionnels

- Le changement de statut se fait directement depuis le badge (menu déroulant avec les 3 valeurs), en plus de l'édition complète — RG8/RG21 du cahier des charges v2.0.
- Le filtre "Tous" est actif par défaut (RG13) ; chaque puce affiche un compteur.
- Le formulaire bloque la soumission si `sujet.trim()` est vide, affiche "Le sujet est obligatoire." en rouge sous le champ et met la bordure du champ en `border-danger` (RG1).
- **Décidé en v2.0** : le périmètre inclut désormais la recherche, le filtre par réseau social, le tri, la vue calendrier, la vue tableau et la suppression — ce ne sont plus des extensions hors périmètre mais des fonctionnalités actées (voir cahier des charges section 1.1 et F7-F12). Pour la logique de ces règles (RG16-RG22), utiliser la skill `doztra-social-business-rules`.
- La suppression est aujourd'hui immédiate sans confirmation dans le prototype (RG22, point ouvert non tranché) — reproduire ce comportement tel quel sauf décision contraire documentée dans le cahier des charges.
- Voir `CLAUDE.md` à la racine du dépôt pour les conventions de code générales (naming, exports, commandes npm) qui s'appliquent à toute cette implémentation.

