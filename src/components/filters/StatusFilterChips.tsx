import type { Statut } from '../../types/contenu';

export type StatutFiltre = 'Tous' | Statut;

export interface StatusFilterChipsProps {
  activeStatut: StatutFiltre;
  onChange: (statut: StatutFiltre) => void;
  counts: Record<StatutFiltre, number>;
}

const FILTRES: StatutFiltre[] = ['Tous', 'Brouillon', 'Validé', 'Publié'];

export function StatusFilterChips({ activeStatut, onChange, counts }: StatusFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTRES.map((filtre) => {
        const isActive = filtre === activeStatut;
        return (
          <div
            key={filtre}
            role="button"
            tabIndex={0}
            onClick={() => onChange(filtre)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onChange(filtre);
            }}
            className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold ${
              isActive ? 'border-accent bg-accent-tint text-accent' : 'border-border bg-surface text-ink-secondary'
            }`}
          >
            {filtre} ({counts[filtre]})
          </div>
        );
      })}
    </div>
  );
}
