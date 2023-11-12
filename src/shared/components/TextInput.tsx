import clsx from 'clsx';
import React from 'react';
import { incompleteBorderClass } from './InputContainer';

export interface TextInputProps {
  value: string | number;
  change: (val: string) => void;
  placeholder?: string;
  className?: string;
  fillContainer?: boolean;
  centerText?: boolean;
  onSubmit?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  change,
  placeholder,
  className,
  fillContainer = false,
  centerText = false,
  onSubmit = () => {},
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <input
      type={'text'}
      placeholder={placeholder || ''}
      onChange={(e) => change(e.target.value)}
      onKeyDown={onKeyDown}
      value={value}
      className={clsx(
        className,
        'rounded-lg border-[0.5px] border-gray-500 px-3 py-2 outline-none',
        incompleteBorderClass,
        fillContainer ? 'flex flex-grow' : 'max-w-[175px]',
        centerText ? 'text-center' : '',
      )}
    />
  );
};

export default TextInput;
