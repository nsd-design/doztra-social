import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Contenu, Statut } from '../../types/contenu';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from './StatusBadge';

export interface ContentTableProps {
  contenus: Contenu[];
  onEdit: (contenu: Contenu) => void;
  onDelete: (id: string) => void;
  onChangeStatut: (id: string, statut: Statut) => void;
}

const GRID_COLUMNS = 'grid-cols-[1.6fr_0.9fr_1.2fr_0.9fr_0.8fr_0.7fr]';
const HEADERS = ['Sujet', 'Réseau', 'Public cible', 'Statut', 'Date', 'Actions'];

export function ContentTable({ contenus, onEdit, onDelete, onChangeStatut }: ContentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className={`grid ${GRID_COLUMNS} gap-3 border-b border-border bg-canvas px-5 py-3.5`}>
        {HEADERS.map((header) => (
          <div key={header} className="text-[11px] font-bold uppercase tracking-wide text-ink-secondary">
            {header}
          </div>
        ))}
      </div>

      {contenus.map((contenu) => (
        <div
          key={contenu.id}
          className={`grid ${GRID_COLUMNS} items-center gap-3 border-b border-border px-5 py-3.5`}
        >
          <div className="text-sm font-semibold text-ink">{contenu.sujet}</div>
          <div className="text-sm text-ink-secondary">{contenu.reseauSocial}</div>
          <div className="text-sm text-ink-secondary">{contenu.publicCible}</div>
          <StatusBadge statut={contenu.statut} onSelectStatut={(s) => onChangeStatut(contenu.id, s)} />
          <div className="text-sm text-ink-secondary">{formatDate(contenu.datePublicationPrevue)}</div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faPen}
              role="button"
              tabIndex={0}
              onClick={() => onEdit(contenu)}
              className="cursor-pointer text-[13px] text-accent"
            />
            <FontAwesomeIcon
              icon={faTrash}
              role="button"
              tabIndex={0}
              onClick={() => onDelete(contenu.id)}
              className="cursor-pointer text-[13px] text-ink-placeholder hover:text-danger"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
