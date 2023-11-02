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
      'rounded-lg border-[0.5px] border-gray-500 px-3 py-2',
      fillContainer ? 'flex flex-grow' : 'min-w-[175px]',
    ])}
  >
    {value || <>&nbsp;</>}
  </p>
);

export default TextField;
