import type { Contenu } from '../types/contenu';
import { MOCK_CONTENUS } from '../data/mockContenus';
import { ContentTable } from '../components/content/ContentTable';
import { EmptyState } from '../components/content/EmptyState';

export interface AllContentViewProps {
  onEditContenu: (contenu: Contenu) => void;
}

function noopDelete() {
  // Suppression non câblée à cette étape (interface seule).
}

export function AllContentView({ onEditContenu }: AllContentViewProps) {
  if (MOCK_CONTENUS.length === 0) {
    return <EmptyState />;
  }

  return <ContentTable contenus={MOCK_CONTENUS} onEdit={onEditContenu} onDelete={noopDelete} />;
}
