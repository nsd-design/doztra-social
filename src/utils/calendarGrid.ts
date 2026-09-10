import type { Contenu } from '../types/contenu';

export interface CalendarCell {
  date: string | null;
  day: number | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasContent: boolean;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getCalendarGrid(year: number, month: number, contenus: Contenu[]): CalendarCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const today = todayIso();

  const cells: CalendarCell[] = [];
  for (let i = 0; i < totalCells; i += 1) {
    const dayNum = i - firstWeekday + 1;
    const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
    const date = isCurrentMonth
      ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
      : null;
    const hasContent = isCurrentMonth && contenus.some((c) => c.datePublicationPrevue === date);

    cells.push({
      date,
      day: isCurrentMonth ? dayNum : null,
      isCurrentMonth,
      isToday: date !== null && date === today,
      hasContent,
    });
  }
  return cells;
}
