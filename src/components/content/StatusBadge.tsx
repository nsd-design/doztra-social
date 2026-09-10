import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { Statut } from '../../types/contenu';
import { STATUS_CLASSES, STATUS_DOT, STATUT_OPTIONS } from '../../data/statusStyles';

export interface StatusBadgeProps {
  statut: Statut;
  onSelectStatut?: (statut: Statut) => void;
}

export function StatusBadge({ statut, onSelectStatut }: StatusBadgeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsMenuOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setIsMenuOpen((current) => !current);
        }}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${STATUS_CLASSES[statut]}`}
      >
        <div className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[statut]}`} />
        <span>{statut}</span>
        <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[140px] rounded-xl border border-border bg-surface p-1.5 shadow-dropdown">
          {STATUT_OPTIONS.map((option) => (
            <div
              key={option}
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsMenuOpen(false);
                onSelectStatut?.(option);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setIsMenuOpen(false);
                  onSelectStatut?.(option);
                }
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-ink hover:bg-canvas"
            >
              <div className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[option]}`} />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
