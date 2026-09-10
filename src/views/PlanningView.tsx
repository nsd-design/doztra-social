import type { Contenu } from '../types/contenu';
import { MOCK_CONTENUS } from '../data/mockContenus';
import { CalendarWidget } from '../components/calendar/CalendarWidget';
import { ContentCard } from '../components/content/ContentCard';
import { EmptyState } from '../components/content/EmptyState';

export interface PlanningViewProps {
  onEditContenu: (contenu: Contenu) => void;
}

function noopDelete() {
  // Suppression non câblée à cette étape (interface seule).
}

export function PlanningView({ onEditContenu }: PlanningViewProps) {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <CalendarWidget contenus={MOCK_CONTENUS} />

      <div className="flex min-w-[320px] flex-1 flex-col gap-4">
        {MOCK_CONTENUS.length === 0 ? (
          <EmptyState />
        ) : (
          MOCK_CONTENUS.map((contenu) => (
            <ContentCard key={contenu.id} contenu={contenu} onEdit={onEditContenu} onDelete={noopDelete} />
          ))
        )}
      </div>
    </div>
  );
}
