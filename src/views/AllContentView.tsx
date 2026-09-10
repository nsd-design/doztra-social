import type { Contenu, Statut } from '../types/contenu';
import { ContentTable } from '../components/content/ContentTable';
import { EmptyState } from '../components/content/EmptyState';

export interface AllContentViewProps {
  contenus: Contenu[];
  onEditContenu: (contenu: Contenu) => void;
  onDelete: (id: string) => void;
  onChangeStatut: (id: string, statut: Statut) => void;
}

export function AllContentView({ contenus, onEditContenu, onDelete, onChangeStatut }: AllContentViewProps) {
  if (contenus.length === 0) {
    return <EmptyState />;
  }

  return (
    <ContentTable contenus={contenus} onEdit={onEditContenu} onDelete={onDelete} onChangeStatut={onChangeStatut} />
  );
}
