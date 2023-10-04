import React from 'react';

export interface TextInputProps {
  value: string | number;
  change: (val: string) => void;
  placeholder?: string;
  className?: string;
  fillContainer?: boolean;
  onSubmit?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  change,
  placeholder,
  className,
  fillContainer = false,
  onSubmit = () => {},
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
