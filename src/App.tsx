import { useState } from 'react';
import type { Contenu, ContenuInput, ReseauSocial, Statut, StatutFiltre } from './types/contenu';
import { useContenus } from './hooks/useContenus';
import { selectContenus, countByStatut } from './utils/selectContenus';
import { Sidebar, type ViewId } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ViewHeader } from './components/layout/ViewHeader';
import { StatusFilterChips } from './components/filters/StatusFilterChips';
import { ContentFormModal } from './components/content/ContentFormModal';
import { PlanningView } from './views/PlanningView';
import { AllContentView } from './views/AllContentView';

const VIEW_COPY: Record<ViewId, { title: string; subtitle: string }> = {
  planning: { title: 'Planification éditoriale', subtitle: 'Votre calendrier de publication à venir.' },
  all: { title: 'Tous les contenus', subtitle: "L'ensemble de votre calendrier de publication." },
};

export function App() {
  const { contenus, upsertContenu, removeContenu, setStatut } = useContenus();

  const [activeView, setActiveView] = useState<ViewId>('planning');
  const [activeStatut, setActiveStatut] = useState<StatutFiltre>('Tous');
  const [search, setSearch] = useState('');
  const [selectedReseaux, setSelectedReseaux] = useState<ReseauSocial[]>([]);
  const [sortDescending, setSortDescending] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingContenu, setEditingContenu] = useState<Contenu | undefined>(undefined);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);

  function handleChangeView(view: ViewId) {
    setActiveView(view);
    setSelectedDate(null);
  }

  function handleToggleReseau(reseau: ReseauSocial) {
    setSelectedReseaux((current) =>
      current.includes(reseau) ? current.filter((r) => r !== reseau) : [...current, reseau],
    );
  }

  function handleToggleSort() {
    setSortDescending((current) => !current);
  }

  function handleChangeStatut(id: string, statut: Statut) {
    setStatut(id, statut);
  }

  function handleDelete(id: string) {
    removeContenu(id);
  }

  function handleSubmitForm(input: ContenuInput, id?: string) {
    upsertContenu(input, id);
  }

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

  const counts = countByStatut(contenus);

  const effectiveSelectedDate = activeView === 'planning' ? selectedDate : null;
  const filteredContenus = selectContenus({
    contenus,
    activeStatut,
    search,
    selectedReseaux,
    selectedDate: effectiveSelectedDate,
    sortDescending,
  });

  const { title, subtitle } = VIEW_COPY[activeView];

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar activeView={activeView} onChangeView={handleChangeView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          search={search}
          onSearchChange={setSearch}
          selectedReseaux={selectedReseaux}
          onToggleReseau={handleToggleReseau}
          sortDescending={sortDescending}
          onToggleSort={handleToggleSort}
          onOpenCreateModal={openCreateModal}
        />

        <div className="flex flex-1 flex-col gap-6 p-8">
          <ViewHeader
            title={title}
            subtitle={subtitle}
            showAllContentLink={activeView === 'planning'}
            onNavigateAllContent={() => handleChangeView('all')}
          />

          <StatusFilterChips activeStatut={activeStatut} onChange={setActiveStatut} counts={counts} />

          {activeView === 'planning' ? (
            <PlanningView
              contenus={filteredContenus}
              allContenus={contenus}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onEditContenu={openEditModal}
              onDelete={handleDelete}
              onChangeStatut={handleChangeStatut}
            />
          ) : (
            <AllContentView
              contenus={filteredContenus}
              onEditContenu={openEditModal}
              onDelete={handleDelete}
              onChangeStatut={handleChangeStatut}
            />
          )}
        </div>
      </div>

      <ContentFormModal
        key={modalInstanceKey}
        isOpen={isModalOpen}
        mode={modalMode}
        initialContenu={editingContenu}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
}
