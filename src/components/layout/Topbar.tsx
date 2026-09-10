import { useState } from 'react';
import { faMagnifyingGlass, faPlus, faSliders } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/TextInput';
import { PlatformFilterDropdown } from '../filters/PlatformFilterDropdown';
import { SortToggle } from '../filters/SortToggle';

export interface TopbarProps {
  onOpenCreateModal: () => void;
}

export function Topbar({ onOpenCreateModal }: TopbarProps) {
  const [search, setSearch] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-8 py-4">
      <div className="w-80 max-w-full">
        <TextInput
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un contenu…"
          leadingIcon={faMagnifyingGlass}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Button variant="secondary" icon={faSliders} onClick={() => setIsFiltersOpen((current) => !current)}>
            Filtres
          </Button>
          <PlatformFilterDropdown isOpen={isFiltersOpen} />
        </div>
        <SortToggle />
        <Button variant="primary" icon={faPlus} onClick={onOpenCreateModal}>
          Nouveau contenu
        </Button>
      </div>
    </div>
  );
}
