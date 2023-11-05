import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'signIn';
export type ButtonSize = 'sm' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  onClick: () => void;
  disabled?: boolean;
  fillContainer?: boolean;
  size?: ButtonSize;
  addOnClass?: string;
  children: JSX.Element | string | string[];
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-red-500 border border-red-500 text-white',
  secondary: 'bg-white border border-gray-500 text-black',
  signIn: 'bg-white text-black shadow-md',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-3',
  lg: 'px-8 py-3',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled = false,
  fillContainer = false,
  size = 'sm',
  addOnClass = '',
  children,
}) => (
  <div
    className={clsx([
      'flex items-center justify-center rounded-lg text-base font-semibold leading-tight',
      sizeClasses[size],
      fillContainer ? 'flex-grow' : 'w-max',
      disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer',
      variantClasses[variant],
      addOnClass,
    ])}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Button;
