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
    <label className={'flex justify-start'}>
      <input
        className={'flex mr-4'}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
