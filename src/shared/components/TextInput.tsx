import React from 'react';

export interface TextInputProps {
  value: string | number;
  change: (val: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  change,
  placeholder,
  className,
}) => {
  return (
    <input
      type={'text'}
      placeholder={placeholder || ''}
      onChange={(e) => change(e.target.value)}
      value={value}
      className={
        className ||
        'border-[0.5px] border-g rounded-lg px-3 py-2 outline-none max-w-[175px]'
      }
    />
  );
};

export default TextInput;
