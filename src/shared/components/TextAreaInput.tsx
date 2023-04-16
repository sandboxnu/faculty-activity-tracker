import React from 'react';

export interface TextAreaInputProps {
  value: string | number;
  change: (val: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  change,
  rows = 3,
  placeholder,
  className,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => change(e.target.value)}
      rows={rows}
      placeholder={placeholder || ''}
      className={
        className ||
        'border-[0.5px] border-g rounded-lg px-3 py-2 outline-none min-w-[175px]'
      }
    />
  );
};

export default TextAreaInput;
