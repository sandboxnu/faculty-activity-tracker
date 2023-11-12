import Image from 'next/image';
import React from 'react';
import InfoTooltip, { TooltipPosition } from './InfoTooltip';
import clsx from 'clsx';

type InputContainerProps = {
  label: string;
  labelClass?: string; // overriding label style
  required?: boolean; // whether the field is required
  incomplete?: boolean; // whether the field is currently incomplete or incorrect
  incompleteMessage?: string; // message to display when incomplete
  tooltipMessage?: string | string[]; // any additional info to provide on hover
  tooltipPosition?: TooltipPosition;
  withMarginY?: boolean; // whether to include vertical margin
  className?: string;
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
  tooltipMessage,
  tooltipPosition,
  withMarginY = false,
  className,
  children,
}) => {
  const IncompleteStatus = () => (
    <div className={`mt-4 flex items-center`}>
      <Image
        src={'/media/exclamationTriangle.svg'}
        alt="Error"
        width={16}
        height={16}
        className="mr-2"
      />
      <p className="inline text-error-300">{incompleteMessage}</p>
    </div>
  );

  return (
    <div className={`flex flex-col ${withMarginY ? 'my-2' : ''} space-y-1`}>
      <div className="flex items-center space-x-1">
        <p className={labelClass}>{label}</p>
        {required && <p className="text-lg text-red-500">*</p>}
        {tooltipMessage && (
          <InfoTooltip
            text={
              Array.isArray(tooltipMessage) ? tooltipMessage : [tooltipMessage]
            }
            tooltipPosition={tooltipPosition}
          />
        )}
      </div>
      <div
        data-input-status={incomplete ? 'error' : 'success'}
        className={clsx(className, 'group flex items-center space-x-2')}
      >
        {children}
      </div>
      {incomplete && incompleteMessage && <IncompleteStatus />}
    </div>
  );
};

export default InputContainer;
