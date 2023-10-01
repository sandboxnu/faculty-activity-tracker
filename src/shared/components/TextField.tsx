import React from 'react';
import clsx from 'clsx';

interface TextFieldProps {
  value: string;
  fillContainer?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  fillContainer = false,
}) => (
  <p
    className={clsx([
      'px-3 py-2 border-[0.5px] border-gray-500 rounded-lg',
      fillContainer ? 'flex flex-grow' : 'min-w-[175px]',
    ])}
  >
    {value || <>&nbsp;</>}
  </p>
);

export default TextField;
