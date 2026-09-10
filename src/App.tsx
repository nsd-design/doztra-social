import { useState } from 'react';
import type { Contenu } from './types/contenu';
import { MOCK_CONTENUS } from './data/mockContenus';
import { Sidebar, type ViewId } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ViewHeader } from './components/layout/ViewHeader';
import { StatusFilterChips, type StatutFiltre } from './components/filters/StatusFilterChips';
import { ContentFormModal } from './components/content/ContentFormModal';
import { PlanningView } from './views/PlanningView';
import { AllContentView } from './views/AllContentView';

const VIEW_COPY: Record<ViewId, { title: string; subtitle: string }> = {
  planning: { title: 'Planification éditoriale', subtitle: 'Votre calendrier de publication à venir.' },
  all: { title: 'Tous les contenus', subtitle: "L'ensemble de votre calendrier de publication." },
};

export function App() {
  const [activeView, setActiveView] = useState<ViewId>('planning');
  const [activeStatut, setActiveStatut] = useState<StatutFiltre>('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingContenu, setEditingContenu] = useState<Contenu | undefined>(undefined);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);

  function openCreateModal() {
    setModalMode('create');
    setEditingContenu(undefined);
    setModalInstanceKey((current) => current + 1);
    setIsModalOpen(true);
  }

  function openEditModal(contenu: Contenu) {
    setModalMode('edit');
    setEditingContenu(contenu);
    setModalInstanceKey((current) => current + 1);
    setIsModalOpen(true);
  }

  const counts: Record<StatutFiltre, number> = {
    Tous: MOCK_CONTENUS.length,
    Brouillon: MOCK_CONTENUS.filter((c) => c.statut === 'Brouillon').length,
    'Validé': MOCK_CONTENUS.filter((c) => c.statut === 'Validé').length,
    'Publié': MOCK_CONTENUS.filter((c) => c.statut === 'Publié').length,
  };

  const { title, subtitle } = VIEW_COPY[activeView];

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenCreateModal={openCreateModal} />

        <div className="flex flex-1 flex-col gap-6 p-8">
          <ViewHeader
            title={title}
            subtitle={subtitle}
            showAllContentLink={activeView === 'planning'}
            onNavigateAllContent={() => setActiveView('all')}
          />

          <StatusFilterChips activeStatut={activeStatut} onChange={setActiveStatut} counts={counts} />

          {activeView === 'planning' ? (
            <PlanningView onEditContenu={openEditModal} />
          ) : (
            <AllContentView onEditContenu={openEditModal} />
          )}
        </div>
      </div>

      <ContentFormModal
        key={modalInstanceKey}
        isOpen={isModalOpen}
        mode={modalMode}
        initialContenu={editingContenu}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
