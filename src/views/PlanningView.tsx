import type { Contenu, Statut } from '../types/contenu';
import { CalendarWidget } from '../components/calendar/CalendarWidget';
import { ContentCard } from '../components/content/ContentCard';
import { EmptyState } from '../components/content/EmptyState';

export interface PlanningViewProps {
  contenus: Contenu[];
  allContenus: Contenu[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
  onEditContenu: (contenu: Contenu) => void;
  onDelete: (id: string) => void;
  onChangeStatut: (id: string, statut: Statut) => void;
}

export function PlanningView({
  contenus,
  allContenus,
  selectedDate,
  onSelectDate,
  onEditContenu,
  onDelete,
  onChangeStatut,
}: PlanningViewProps) {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <CalendarWidget contenus={allContenus} selectedDate={selectedDate} onSelectDate={onSelectDate} />

      <div className="flex min-w-[320px] flex-1 flex-col gap-4">
        {contenus.length === 0 ? (
          <EmptyState />
        ) : (
          contenus.map((contenu) => (
            <ContentCard
              key={contenu.id}
              contenu={contenu}
              onEdit={onEditContenu}
              onDelete={onDelete}
              onChangeStatut={onChangeStatut}
            />
          ))
        )}
      </div>
    </div>
  );
}
