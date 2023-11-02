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
    <label className={'flex items-center justify-start'}>
      <input
        className={'mr-2 flex'}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
