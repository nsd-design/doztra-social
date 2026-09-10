import { useState } from 'react';
import { faArrowDownWideShort, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/Button';

export function SortToggle() {
  const [isDescending, setIsDescending] = useState(false);

  return (
    <Button
      variant="secondary"
      icon={isDescending ? faArrowDownWideShort : faArrowUpWideShort}
      onClick={() => setIsDescending((current) => !current)}
    >
      Trier
    </Button>
  );
}
