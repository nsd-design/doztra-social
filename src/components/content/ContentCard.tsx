import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Contenu, Statut } from '../../types/contenu';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from './StatusBadge';

export interface ContentCardProps {
  contenu: Contenu;
  onEdit: (contenu: Contenu) => void;
  onDelete: (id: string) => void;
  onChangeStatut: (id: string, statut: Statut) => void;
}

export function ContentCard({ contenu, onEdit, onDelete, onChangeStatut }: ContentCardProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-surface p-5">
      <div className="text-xs font-bold tracking-wide text-ink-secondary">
        {contenu.reseauSocial.toUpperCase()} · {formatDate(contenu.datePublicationPrevue)}
      </div>
      <div className="text-[15px] font-semibold leading-[22px] text-ink">{contenu.sujet}</div>
      <div className="text-[13px] font-medium leading-[18px] text-ink-secondary">{contenu.publicCible}</div>

      <div className="mt-2.5 flex items-center justify-between">
        <StatusBadge statut={contenu.statut} onSelectStatut={(s) => onChangeStatut(contenu.id, s)} />
        <div className="flex items-center gap-3.5">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onEdit(contenu)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onEdit(contenu);
            }}
            className="flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-accent"
          >
            <FontAwesomeIcon icon={faPen} className="text-[11px]" />
            <span>Modifier</span>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            role="button"
            tabIndex={0}
            onClick={() => onDelete(contenu.id)}
            className="cursor-pointer text-[13px] text-ink-placeholder hover:text-danger"
          />
        </div>
      </div>
    </div>
  );
}
