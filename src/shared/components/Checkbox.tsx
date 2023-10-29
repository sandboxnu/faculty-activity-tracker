import React, { ChangeEventHandler } from 'react';

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: ChangeEventHandler;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={'flex justify-start items-center'}>
      <input
        className={'flex mr-2'}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
