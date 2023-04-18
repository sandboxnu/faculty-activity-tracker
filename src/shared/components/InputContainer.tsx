import Image from 'next/image';
import React from 'react';

type InputContainerProps = {
  label: string;
  incomplete: boolean;
  incompleteMessage: string;
  children: JSX.Element;
  statusPosition?: 'top' | 'right';
};

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  incomplete,
  incompleteMessage,
  children,
  statusPosition = 'top',
}) => {
  const Status = () => (
    <div className="flex items-center py-2">
      <Image
        src={`/media/${incomplete ? 'failureWarning' : 'successCheckmark'}.svg`}
        alt="Icon"
        width={16}
        height={16}
        className="mx-2"
      />
      {incomplete && <p className="text-ruby inline">{incompleteMessage}</p>}
    </div>
  );

  return (
    <div className="flex flex-col my-2 space-y-1">
      <div className="flex items-center">
        <p className="text-base font-bold">{label}</p>
        {statusPosition === 'top' && <Status />}
      </div>
      <div className="flex items-center space-x-2">
        {children}
        {statusPosition === 'right' && <Status />}
      </div>
    </div>
  );
};

export default InputContainer;
