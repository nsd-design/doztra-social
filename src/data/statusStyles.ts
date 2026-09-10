import type { Statut } from '../types/contenu';

export const STATUT_OPTIONS: Statut[] = ['Brouillon', 'Validé', 'Publié'];

export const STATUS_CLASSES: Record<Statut, string> = {
  Brouillon: 'bg-status-brouillon-bg text-status-brouillon-text',
  'Validé': 'bg-status-valide-bg text-status-valide-text',
  'Publié': 'bg-status-publie-bg text-status-publie-text',
};

export const STATUS_DOT: Record<Statut, string> = {
  Brouillon: 'bg-status-brouillon-dot',
  'Validé': 'bg-status-valide-dot',
  'Publié': 'bg-status-publie-dot',
};
