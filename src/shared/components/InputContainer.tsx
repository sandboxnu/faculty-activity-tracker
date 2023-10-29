import Image from 'next/image';
import React from 'react';
import InfoTooltip from './InfoTooltip';

type InputContainerProps = {
  label: string;
  labelClass?: string; // overriding label style
  required?: boolean; // whether the field is required
  incomplete?: boolean; // whether the field is currently incomplete or incorrect
  incompleteMessage?: string; // message to display when incomplete
  infoMessage?: string; // any additional info to provide on hover
  withMarginY?: boolean; // whether to include vertical margin
  children: JSX.Element;
};

// use to apply error border style to child component (TextInput, PercentageInfo, etc.)
// whenever the InputContainer is incomplete
export const incompleteBorderClass =
  'group-data-[input-status=error]:border-error-300 group-data-[input-status=error]:border-[1.5px]';

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  labelClass = 'text-body-bold',
  required = false,
  incomplete = false,
  incompleteMessage,
  infoMessage,
  withMarginY = false,
  children,
}) => {
  const IncompleteStatus = () => (
    <div className={`flex items-center mt-4`}>
      <Image
        src={'/media/exclamationTriangle.svg'}
        alt="Error"
        width={16}
        height={16}
        className="mr-2"
      />
      <p className="text-error-300 inline">{incompleteMessage}</p>
    </div>
  );

  return (
    <div className={`flex flex-col ${withMarginY ? 'my-2' : ''} space-y-1`}>
      <div className="flex items-center space-x-1">
        <p className={labelClass}>{label}</p>
        {required && <p className="text-red-500 text-lg">*</p>}
        {infoMessage && <InfoTooltip text={[infoMessage]} />}
      </div>
      <div
        data-input-status={incomplete ? 'error' : 'success'}
        className="flex items-center space-x-2 group"
      >
        {children}
      </div>
      {incomplete && incompleteMessage && <IncompleteStatus />}
    </div>
  );
};

export default InputContainer;
