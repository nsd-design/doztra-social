import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/Button';

export interface ViewHeaderProps {
  title: string;
  subtitle: string;
  showAllContentLink?: boolean;
  onNavigateAllContent?: () => void;
}

export function ViewHeader({ title, subtitle, showAllContentLink, onNavigateAllContent }: ViewHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="text-2xl font-bold leading-8 text-ink">{title}</div>
        <div className="mt-1 text-[15px] font-medium leading-[22px] text-ink-secondary">{subtitle}</div>
      </div>
      {showAllContentLink && (
        <Button variant="secondary" icon={faArrowRight} iconPosition="right" onClick={onNavigateAllContent}>
          Voir tous les contenus
        </Button>
      )}
    </div>
  );
}
