import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Contenu } from '../../types/contenu';
import { getCalendarGrid } from '../../utils/calendarGrid';
import { formatDate } from '../../utils/formatDate';

export interface CalendarWidgetProps {
  contenus: Contenu[];
}

const FRENCH_MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const WEEKDAY_LABELS = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

const now = new Date();

export function CalendarWidget({ contenus }: CalendarWidgetProps) {
  const [visible, setVisible] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { year: visibleYear, month: visibleMonth } = visible;

  function shiftMonth(delta: number) {
    setVisible((current) => {
      let month = current.month + delta;
      let year = current.year;
      if (month < 0) {
        month = 11;
        year -= 1;
      } else if (month > 11) {
        month = 0;
        year += 1;
      }
      return { year, month };
    });
  }

  const cells = getCalendarGrid(visibleYear, visibleMonth, contenus);

  return (
    <div className="flex-[0_0_340px] min-w-[300px] rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <div
          role="button"
          tabIndex={0}
          onClick={() => shiftMonth(-1)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') shiftMonth(-1);
          }}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-ink-secondary"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </div>
        <div className="text-[15px] font-bold capitalize text-ink">
          {FRENCH_MONTHS[visibleMonth]} {visibleYear}
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => shiftMonth(1)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') shiftMonth(1);
          }}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-ink-secondary"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </div>
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="text-center text-[11px] font-bold text-ink-secondary">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          const isSelected = !!cell.date && cell.date === selectedDate;
          const isClickable = cell.isCurrentMonth && !!cell.date;

          return (
            <div
              key={cell.date ?? `empty-${index}`}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={() => {
                if (!isClickable || !cell.date) return;
                setSelectedDate((current) => (current === cell.date ? null : cell.date));
              }}
              onKeyDown={(event) => {
                if (!isClickable || !cell.date) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelectedDate((current) => (current === cell.date ? null : cell.date));
                }
              }}
              className={`text-center ${isClickable ? 'cursor-pointer' : ''}`}
            >
              <div
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-semibold ${
                  !cell.isCurrentMonth
                    ? 'text-transparent'
                    : isSelected
                      ? 'bg-accent text-white'
                      : cell.isToday
                        ? 'bg-accent-tint text-accent'
                        : 'text-ink'
                }`}
              >
                {cell.day ?? ''}
              </div>
              <div
                className={`mx-auto mt-[3px] h-[5px] w-[5px] rounded-full bg-accent ${
                  cell.hasContent && !isSelected ? 'visible' : 'invisible'
                }`}
              />
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-full bg-accent-tint px-3.5 py-2 text-[13px] font-semibold text-accent">
          <span>Filtré : {formatDate(selectedDate)}</span>
          <FontAwesomeIcon
            icon={faXmark}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDate(null)}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
