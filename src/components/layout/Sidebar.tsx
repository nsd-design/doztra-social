import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faTableList } from '@fortawesome/free-solid-svg-icons';

export type ViewId = 'planning' | 'all';

export interface SidebarProps {
  activeView: ViewId;
  onChangeView: (view: ViewId) => void;
}

const NAV_ITEMS: { id: ViewId; label: string; icon: typeof faCalendarDays }[] = [
  { id: 'planning', label: 'Planification', icon: faCalendarDays },
  { id: 'all', label: 'Tous les contenus', icon: faTableList },
];

export function Sidebar({ activeView, onChangeView }: SidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col justify-between overflow-y-auto border-r border-border bg-surface p-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-extrabold text-white">
            D
          </div>
          <div>
            <div className="text-base font-bold leading-5 text-ink">Doztra Social</div>
            <div className="text-xs font-medium text-ink-secondary">Planificateur de contenu</div>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeView;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onChangeView(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') onChangeView(item.id);
                }}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                  isActive ? 'bg-accent-tint text-accent' : 'text-ink-secondary hover:bg-canvas'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 text-center" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-tint text-sm font-bold text-accent">
          MD
        </div>
        <div>
          <div className="text-sm font-semibold leading-[18px] text-ink">Mounia Diallo</div>
          <div className="text-xs font-medium text-ink-secondary">Responsable social media</div>
        </div>
      </div>
    </aside>
  );
}
