import Image from 'next/image';
import React from 'react';

type InputContainerProps = {
  label: string;
  labelClass?: string; // overriding label style
  required?: boolean; // whether the field is required
  incomplete: boolean;
  incompleteMessage: string; // message to display when incomplete
  infoMessage?: string; // any additional info to provide on hover
  statusPosition?: 'top' | 'right'; // whether to display the status on top (next to label) or on the right (next to input)
  hideValidation?: boolean; // whether to display the validation/incomplete status
  withMarginY?: boolean; // whether to include vertical margin
  children: JSX.Element;
};

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  labelClass = 'text-base font-bold',
  required = false,
  incomplete,
  incompleteMessage,
  hideValidation = false,
  statusPosition = 'top',
  withMarginY = false,
  children,
}) => {
  const Status = () => (
    <div className={`flex items-center ${withMarginY ? 'py-2' : ''}`}>
      <Image
        src={`/media/${incomplete ? 'failureWarning' : 'successCheckmark'}.svg`}
        alt="Icon"
        width={16}
        height={16}
        className="mx-2"
      />
      {incomplete && <p className="text-red-500 inline">{incompleteMessage}</p>}
    </div>
  );

  const InfoWarning = (warning: string) => (
    <div className={`flex items-center`}>
      <Image
        src="/media/infoIcon.svg"
        alt="Icon"
        width={16}
        height={16}
        className="mx-2"
      />
      {incomplete && <p className="text-red-500 inline">{incompleteMessage}</p>}
    </div>
  );

  return (
    <div className={`flex flex-col ${withMarginY ? 'my-2' : ''} space-y-1`}>
      <div className="flex items-center">
        <p className={labelClass}>{label}</p>
        {required && <p className="text-red-500 ml-1 text-lg">*</p>}
        {statusPosition === 'top' && !hideValidation && <Status />}
      </div>
      <div className="flex items-center space-x-2">
        {children}
        {statusPosition === 'right' && !hideValidation && <Status />}
      </div>
    </div>
  );
};

export default InputContainer;
