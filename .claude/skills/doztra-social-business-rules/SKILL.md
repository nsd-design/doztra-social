# Doztra Social — Règles de gestion (logique métier)

Cette skill est le pendant fonctionnel de `doztra-social-react-ui` (qui couvre le visuel). Elle s'applique à toute tâche touchant la logique de `useContenus`, la validation de formulaire, le filtrage/tri, ou l'écriture de tests — pour vérifier qu'une implémentation respecte le cahier des charges v2.0 (`docs/cahier-des-charges.md`), sans avoir à le relire en entier à chaque fois.

En cas de doute ou de contradiction apparente avec le code existant, le cahier des charges fait foi ; signaler l'écart plutôt que de trancher silencieusement.

## Modèle et statuts

- `Statut` : `'Brouillon' | 'Validé' | 'Publié'`. Aucune contrainte de séquence entre eux (RG9) : un contenu peut revenir en arrière (ex. "Publié" → "Brouillon").
- À la création, `statut` est **toujours** `'Brouillon'`, quelle que soit la saisie utilisateur — ce champ n'est même pas exposé dans le formulaire de création (RG2, RG7).
- Le changement de statut est possible par **deux chemins équivalents**, qui doivent aboutir au même résultat dans `useContenus` : le formulaire d'édition complet, et le menu déroulant à 3 options ouvert depuis le badge de statut (carte ou ligne de tableau) — RG8, RG21.

## Validation du formulaire (création et édition)

- RG1 : `sujet.trim()` doit être non vide. Sinon : bloquer la soumission, afficher "Le sujet est obligatoire.", ne pas fermer la modale, ne pas modifier `items`.
- L'erreur se recalcule en live dès que l'utilisateur retape dans le champ Sujet (pas seulement à la soumission suivante).
- RG3 : la date de publication prévue n'a pas de validation applicative dédiée au-delà de celle du composant natif `<input type="date">` — un champ vide reste valide.
- RG4/RG10 : en édition, **tous** les champs (y compris ceux non affichés dans un état particulier) sont préchargés depuis le contenu sélectionné ; annuler (RG12) ne doit rien persister.
- Le champ `reseauSocial` n'a pas de validation "obligatoire" au sens RG1 : il est toujours valorisé par construction (select sans option vide, défaut `'LinkedIn'`).
- À la création, `id` est généré côté client (ex. `crypto.randomUUID()`), `dateCreation` et `dateModification` sont horodatées au même instant. À l'édition, seule `dateModification` est mise à jour.

## Recherche, filtres, tri (RG16-RG20)

Ces mécanismes sont **cumulatifs** : une même liste filtrée doit satisfaire simultanément tous les critères actifs. Écrire la fonction de sélection comme une chaîne de `filter()` indépendants plutôt qu'un unique test conditionnel imbriqué, pour garder chaque règle testable isolément :

1. Filtre de statut (RG13-RG15) : `'Tous'` par défaut = pas de filtrage sur `statut`.
2. Filtre réseau social (RG17) : multi-sélection, ET logique côté "aucun réseau coché = tous les réseaux passent", mais dès qu'au moins un réseau est coché, seuls les contenus dont `reseauSocial` est dans la sélection passent.
3. Recherche (RG16) : `sujet` OU `publicCible` contient la requête, comparaison insensible à la casse (`toLowerCase()`).
4. Filtre de date du calendrier (RG19) : égalité stricte sur `datePublicationPrevue`, actif uniquement en vue Planification, réinitialisé au changement de vue (RG20).
5. Tri (RG18) : sur `datePublicationPrevue`, croissant par défaut ; les contenus sans date se trient en fin de liste (RG5) quel que soit le sens du tri.

Les deux vues (Planification, Tous les contenus) doivent appeler exactement la même fonction de sélection/tri — ne jamais dupliquer cette logique par vue (RG20).

## États d'affichage

- Liste vide après filtrage (RG6) : afficher l'état vide contextuel ("Aucun contenu ne correspond à ces filtres."), jamais un tableau/une grille vide sans message.
- Un compteur par statut (RG15) doit refléter le nombre total de contenus par statut **avant** application des autres filtres (recherche, réseau, date) — sinon les compteurs deviendraient incohérents entre eux quand un autre filtre est actif.

## Suppression (RG22 — point ouvert)

- Comportement actuel du prototype validé : suppression **immédiate** au clic sur l'icône corbeille, sans confirmation, sans possibilité d'annuler.
- Ce point est identifié comme un risque (perte de données accidentelle) mais **non tranché** par le commanditaire à ce stade. Ne pas ajouter unilatéralement une confirmation : implémenter le comportement du prototype tel quel, et signaler explicitement ce point ouvert dans toute revue ou tout plan d'implémentation qui touche la suppression.
- L'action de suppression peut être masquée globalement (flag de configuration) — prévoir ce cas dans les tests (contenu non supprimable ne doit pas afficher l'icône, pas seulement la désactiver).

## Checklist de revue rapide

Avant de considérer une fonctionnalité CRUD/filtrage terminée, vérifier explicitement :

- [ ] Un sujet vide ou uniquement composé d'espaces est rejeté, à la création comme à l'édition (RG1, RG11).
- [ ] Un nouveau contenu est toujours en statut "Brouillon", sans exception (RG2/RG7).
- [ ] Le statut peut être changé depuis le badge ET depuis le formulaire d'édition, avec le même effet (RG8/RG21).
- [ ] Recherche + filtre réseau + filtre statut + filtre date + tri se combinent correctement, y compris tous actifs en même temps (RG16-RG20).
- [ ] Changer de vue ne perd pas les filtres de recherche/statut/réseau/tri, mais réinitialise le filtre de date (RG20).
- [ ] L'état vide s'affiche quand le résultat filtré est vide (RG6).
- [ ] La suppression reste immédiate sans confirmation, sauf décision documentée contraire (RG22).