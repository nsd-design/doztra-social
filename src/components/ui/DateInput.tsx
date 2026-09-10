import type { ChangeEvent } from 'react';

export interface DateInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ id, label, value, onChange }: DateInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        value={value}
        onChange={handleChange}
        className="rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none"
      />
    </div>
  );
}
