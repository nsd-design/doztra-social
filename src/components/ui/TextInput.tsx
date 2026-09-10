import type { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface TextInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'search';
  leadingIcon?: IconDefinition;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = 'text',
  leadingIcon,
}: TextInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
          {required && ' *'}
        </label>
      )}
      <div className="relative">
        {leadingIcon && (
          <FontAwesomeIcon
            icon={leadingIcon}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-secondary"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink-placeholder ${
            leadingIcon ? 'pl-[38px]' : ''
          } ${error ? 'border-danger' : 'border-border'}`}
        />
      </div>
      {error && <div className="text-xs font-medium text-danger">{error}</div>}
    </div>
  );
}
