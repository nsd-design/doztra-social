import type { Contenu, ReseauSocial, StatutFiltre } from '../types/contenu';
import { STATUT_OPTIONS } from '../data/statusStyles';

export interface SelectionCriteria {
  contenus: Contenu[];
  activeStatut: StatutFiltre;
  search: string;
  selectedReseaux: ReseauSocial[];
  selectedDate: string | null;
  sortDescending: boolean;
}

function compareByDate(a: Contenu, b: Contenu, sortDescending: boolean): number {
  if (!a.datePublicationPrevue && !b.datePublicationPrevue) return 0;
  if (!a.datePublicationPrevue) return 1;
  if (!b.datePublicationPrevue) return -1;

  const comparison = a.datePublicationPrevue.localeCompare(b.datePublicationPrevue);
  return sortDescending ? -comparison : comparison;
}

export function selectContenus(criteria: SelectionCriteria): Contenu[] {
  const { contenus, activeStatut, search, selectedReseaux, selectedDate, sortDescending } = criteria;

  let filtered = contenus;

  if (activeStatut !== 'Tous') {
    filtered = filtered.filter((c) => c.statut === activeStatut);
  }

  const query = search.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(
      (c) => c.sujet.toLowerCase().includes(query) || (c.publicCible ?? '').toLowerCase().includes(query),
    );
  }

  if (selectedReseaux.length > 0) {
    filtered = filtered.filter((c) => selectedReseaux.includes(c.reseauSocial));
  }

  if (selectedDate !== null) {
    filtered = filtered.filter((c) => c.datePublicationPrevue === selectedDate);
  }

  return [...filtered].sort((a, b) => compareByDate(a, b, sortDescending));
}

export function countByStatut(contenus: Contenu[]): Record<StatutFiltre, number> {
  const counts: Record<StatutFiltre, number> = {
    Tous: contenus.length,
    Brouillon: 0,
    'Validé': 0,
    'Publié': 0,
  };

  for (const statut of STATUT_OPTIONS) {
    counts[statut] = contenus.filter((c) => c.statut === statut).length;
  }

  return counts;
}
