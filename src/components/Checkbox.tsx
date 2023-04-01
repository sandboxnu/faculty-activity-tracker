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
<<<<<<< HEAD
    <label className={'flex justify-start'}>
      <input
        className={'flex mr-4'}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
=======
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
>>>>>>> b0231a145e6fd9c3fffdd0011b7f3794502463c1
      {label}
    </label>
  );
};
