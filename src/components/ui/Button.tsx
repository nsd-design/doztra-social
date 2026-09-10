import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-surface border border-border text-ink hover:bg-canvas',
  ghost: 'bg-transparent text-ink-secondary hover:text-ink',
  danger: 'bg-danger text-white hover:opacity-90',
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  children?: ReactNode;
}

export function Button({
  variant = 'secondary',
  icon,
  iconPosition = 'left',
  ariaLabel,
  children,
  type = 'button',
  className = '',
  ...rest
}: ButtonProps) {
  const iconOnly = !!icon && !children;

  return (
    <button
      type={type}
      aria-label={iconOnly ? ariaLabel : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
        iconOnly ? 'p-2.5' : 'px-5 py-2.5'
      } ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} />}
      {children}
      {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} />}
    </button>
  );
}
