import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

export interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Aucun contenu ne correspond à ces filtres.' }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center text-ink-secondary">
      <FontAwesomeIcon icon={faFolderOpen} className="mb-2.5 text-[28px]" />
      <div className="text-sm font-medium">{message}</div>
    </div>
  );
}
