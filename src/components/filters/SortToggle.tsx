import { faArrowDownWideShort, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/Button';

export interface SortToggleProps {
  isDescending: boolean;
  onToggle: () => void;
}

export function SortToggle({ isDescending, onToggle }: SortToggleProps) {
  return (
    <Button variant="secondary" icon={isDescending ? faArrowDownWideShort : faArrowUpWideShort} onClick={onToggle}>
      Trier
    </Button>
  );
}
