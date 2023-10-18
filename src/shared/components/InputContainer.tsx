import Image from 'next/image';
import React from 'react';
import Tooltip from './Tooltip';

type InputContainerProps = {
  label: string;
  labelClass?: string; // overriding label style
  required?: boolean; // whether the field is required
  incompleteMessage?: string; // message to display when incomplete
  infoMessage?: string; // any additional info to provide on hover
  withMarginY?: boolean; // whether to include vertical margin
  children: JSX.Element;
};

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  labelClass = 'text-body-bold',
  required = false,
  incompleteMessage,
  infoMessage,
  withMarginY = false,
  children,
}) => {
  const IncompleteMessage = () => (
    <div className={`flex items-center mt-1`}>
      <Image
        src={`/media/exclamationTriangle.svg`}
        alt="Icon"
        width={16}
        height={16}
        className="mr-2"
      />
      <p className="text-error-300 inline">{incompleteMessage}</p>
    </div>
  );

  return (
    <div className={`flex flex-col ${withMarginY ? 'my-2' : ''} space-y-1`}>
      <div className="flex items-center">
        <p className={labelClass}>{label}</p>
        {required && <p className="text-red-500 ml-1 text-lg">*</p>}
        {infoMessage && <Tooltip tooltipTitle="" text={[infoMessage]} />}
      </div>
      <div className="flex items-center space-x-2">{children}</div>
      {incompleteMessage && <IncompleteMessage />}
    </div>
  );
};

export default InputContainer;
