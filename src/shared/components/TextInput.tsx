import React from 'react';

export interface TextInputProps {
  value: string | number;
  change: (val: string) => void;
  placeholder?: string;
  className?: string;
  fillContainer?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  change,
  placeholder,
  className,
  fillContainer = false,
}) => {
  return (
    <input
      type={'text'}
      placeholder={placeholder || ''}
      onChange={(e) => change(e.target.value)}
      value={value}
      className={
        className ||
        `border-[0.5px] border-gray-500 rounded-lg px-3 py-2 outline-none ${
          fillContainer ? 'flex flex-grow' : 'max-w-[175px]'
        }`
      }
    />
  );
};

export default TextInput;
