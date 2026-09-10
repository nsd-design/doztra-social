import type { ChangeEvent } from 'react';

export interface SelectInputOption {
  value: string;
  label: string;
}

export interface SelectInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectInputOption[];
}

export function SelectInput({ id, label, value, onChange, options }: SelectInputProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
