import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { RESEAUX_SOCIAUX } from '../../data/reseauxSociaux';
import type { ReseauSocial } from '../../types/contenu';

export interface PlatformFilterDropdownProps {
  isOpen: boolean;
}

export function PlatformFilterDropdown({ isOpen }: PlatformFilterDropdownProps) {
  const [selected, setSelected] = useState<ReseauSocial[]>([]);

  function toggle(reseau: ReseauSocial) {
    setSelected((current) =>
      current.includes(reseau) ? current.filter((item) => item !== reseau) : [...current, reseau],
    );
  }

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-30 flex w-[200px] flex-col gap-2 rounded-xl border border-border bg-surface p-3 shadow-dropdown">
      <div className="mb-0.5 text-xs font-bold uppercase tracking-wide text-ink-secondary">Réseau social</div>
      {RESEAUX_SOCIAUX.map((reseau) => {
        const checked = selected.includes(reseau);
        return (
          <div
            key={reseau}
            role="button"
            tabIndex={0}
            onClick={() => toggle(reseau)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') toggle(reseau);
            }}
            className="flex cursor-pointer items-center gap-2.5 py-1"
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded ${
                checked ? 'border border-accent bg-accent' : 'border border-border bg-surface'
              }`}
            >
              {checked && <FontAwesomeIcon icon={faCheck} className="text-[9px] text-white" />}
            </div>
            <span className="text-[13px] font-medium text-ink">{reseau}</span>
          </div>
        );
      })}
    </div>
  );
}
