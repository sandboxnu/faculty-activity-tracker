import React from 'react';
import clsx from 'clsx';
import { incompleteBorderClass } from './InputContainer';

export interface TextAreaInputProps {
  value: string | number;
  change: (val: string) => void;
  numRows?: number;
  placeholder?: string;
  fillContainer?: boolean;
  addOnClass?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  change,
  numRows = 3,
  placeholder,
  fillContainer = false,
  addOnClass = '',
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => change(e.target.value)}
      rows={numRows}
      placeholder={placeholder || ''}
      className={clsx([
        'rounded-lg border-[0.5px] border-gray-500 px-3 py-2 outline-none',
        incompleteBorderClass,
        fillContainer ? 'flex flex-grow' : 'min-w-[175px]',
        addOnClass,
      ])}
    />
  );
};

export default TextAreaInput;
