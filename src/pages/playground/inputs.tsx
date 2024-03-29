import Button, { ButtonVariant } from '@/shared/components/Button';
import { Checkbox } from '@/shared/components/Checkbox';
import DropdownInput, { Option } from '@/shared/components/DropdownInput';
import InputContainer from '@/shared/components/InputContainer';
import TextAreaInput from '@/shared/components/TextAreaInput';
import TextInput from '@/shared/components/TextInput';
import Head from 'next/head';
import React, { useState } from 'react';

const TextInputPlayground: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [required, setRequired] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [fillContainer, setFillContainer] = useState(false);
  const [labelBold, setLabelBold] = useState(false);
  const [withMarginY, setWithMarginY] = useState(false);
  const [withContainer, setWithContainer] = useState(true);

  return (
    <div className="mb-4 flex w-full flex-col">
      <p
        className="cursor-pointer text-lg font-medium text-red-500"
        onClick={() => setOpen((b) => !b)}
      >
        TextInput
      </p>
      {open && (
        <div className="flex flex-col pl-4 pt-2">
          <Checkbox
            label="Required"
            value={required}
            onChange={() => setRequired((b) => !b)}
          />
          <Checkbox
            label="Incomplete"
            value={incomplete}
            onChange={() => setIncomplete((b) => !b)}
          />
          <Checkbox
            label="Show Tooltip"
            value={showTooltip}
            onChange={() => setShowTooltip((b) => !b)}
          />
          <Checkbox
            label="Full Width"
            value={fillContainer}
            onChange={() => setFillContainer((b) => !b)}
          />
          <Checkbox
            label="Bold Label"
            value={labelBold}
            onChange={() => setLabelBold((b) => !b)}
          />
          <Checkbox
            label="With Vertical Spacing"
            value={withMarginY}
            onChange={() => setWithMarginY((b) => !b)}
          />
          <Checkbox
            label="With InputContainer"
            value={withContainer}
            onChange={() => setWithContainer((b) => !b)}
          />
          <p className="my-2 text-lg text-gray-500">Result:</p>
          <div className="w-full border border-gray-200">
            {withContainer ? (
              <InputContainer
                label={'Label'}
                labelClass={!labelBold ? 'text-base font-medium' : undefined}
                required={required}
                incomplete={incomplete}
                incompleteMessage="Incomplete message"
                tooltipMessage={showTooltip ? 'Tooltip message' : ''}
                withMarginY={withMarginY}
              >
                <TextInput
                  fillContainer={fillContainer}
                  value={value}
                  change={setValue}
                />
              </InputContainer>
            ) : (
              <TextInput
                fillContainer={fillContainer}
                value={value}
                change={setValue}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TextAreaInputPlayground: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [required, setRequired] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [fillContainer, setFillContainer] = useState(false);
  const [labelBold, setLabelBold] = useState(false);
  const [withMarginY, setWithMarginY] = useState(false);
  const [withContainer, setWithContainer] = useState(true);

  return (
    <div className="mb-4 flex w-full flex-col">
      <p
        className="cursor-pointer text-lg font-medium text-red-500"
        onClick={() => setOpen((b) => !b)}
      >
        TextAreaInput
      </p>
      {open && (
        <div className="flex flex-col pl-4 pt-2">
          <Checkbox
            label="Required"
            value={required}
            onChange={() => setRequired((b) => !b)}
          />
          <Checkbox
            label="Incomplete"
            value={incomplete}
            onChange={() => setIncomplete((b) => !b)}
          />
          <Checkbox
            label="Full Width"
            value={fillContainer}
            onChange={() => setFillContainer((b) => !b)}
          />
          <Checkbox
            label="Bold Label"
            value={labelBold}
            onChange={() => setLabelBold((b) => !b)}
          />
          <Checkbox
            label="With Vertical Spacing"
            value={withMarginY}
            onChange={() => setWithMarginY((b) => !b)}
          />
          <Checkbox
            label="With InputContainer"
            value={withContainer}
            onChange={() => setWithContainer((b) => !b)}
          />
          <p className="my-2 text-lg text-gray-500">Result:</p>
          <div className="w-full border border-gray-200">
            {withContainer ? (
              <InputContainer
                label={'Label'}
                labelClass={!labelBold ? 'text-base font-medium' : undefined}
                required={required}
                incomplete={incomplete}
                incompleteMessage="Incomplete message"
                withMarginY={withMarginY}
              >
                <TextAreaInput
                  fillContainer={fillContainer}
                  value={value}
                  change={setValue}
                />
              </InputContainer>
            ) : (
              <TextInput
                fillContainer={fillContainer}
                value={value}
                change={setValue}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownInputPlayground: React.FC = () => {
  const options: Option<string>[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>('');
  const [required, setRequired] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [fillContainer, setFillContainer] = useState(false);
  const [hideValidation, setHideValidation] = useState(false);
  const [labelBold, setLabelBold] = useState(false);
  const [withMarginY, setWithMarginY] = useState(false);
  const [absoluteDropdown, setAbsoluteDropdown] = useState(false);
  const [withContainer, setWithContainer] = useState(true);

  return (
    <div className="mb-4 flex w-full flex-col">
      <p
        className="cursor-pointer text-lg font-medium text-red-500"
        onClick={() => setOpen((b) => !b)}
      >
        DropdownInput
      </p>
      {open && (
        <div className="flex flex-col pl-4 pt-2">
          <Checkbox
            label="Required"
            value={required}
            onChange={() => setRequired((b) => !b)}
          />
          <Checkbox
            label="Incomplete"
            value={incomplete}
            onChange={() => setIncomplete((b) => !b)}
          />
          <Checkbox
            label="Full Width"
            value={fillContainer}
            onChange={() => setFillContainer((b) => !b)}
          />
          <Checkbox
            label="Hide Validation"
            value={hideValidation}
            onChange={() => setHideValidation((b) => !b)}
          />
          <Checkbox
            label="Bold Label"
            value={labelBold}
            onChange={() => setLabelBold((b) => !b)}
          />
          <Checkbox
            label="With Vertical Spacing"
            value={withMarginY}
            onChange={() => setWithMarginY((b) => !b)}
          />
          <Checkbox
            label="Absolute Dropdown"
            value={absoluteDropdown}
            onChange={() => setAbsoluteDropdown((b) => !b)}
          />
          <Checkbox
            label="With InputContainer"
            value={withContainer}
            onChange={() => setWithContainer((b) => !b)}
          />
          <p className="my-2 text-lg text-gray-500">Result:</p>
          <div className="w-full border border-gray-200">
            {withContainer ? (
              <InputContainer
                label={'Label'}
                labelClass={!labelBold ? 'text-base font-medium' : undefined}
                required={required}
                incomplete={incomplete}
                incompleteMessage="Incomplete message"
                withMarginY={withMarginY}
              >
                <DropdownInput<string>
                  fillContainer={fillContainer}
                  options={options}
                  placeholder="Select a value"
                  absoluteDropdown={absoluteDropdown}
                  selectValue={(value) => setValue(value)}
                />
              </InputContainer>
            ) : (
              <DropdownInput<string>
                fillContainer={fillContainer}
                options={options}
                placeholder="Select a value"
                absoluteDropdown={absoluteDropdown}
                selectValue={(value) => setValue(value)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ButtonPlayground: React.FC = () => {
  const variantOptions: Option<ButtonVariant>[] = [
    { label: 'Primary Variant', value: 'primary' },
    { label: 'Secondary Variant', value: 'secondary' },
  ];
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [disabled, setDisabled] = useState(false);
  const [fillContainer, setFillContainer] = useState(false);

  return (
    <div className="mb-4 flex w-full flex-col">
      <p
        className="cursor-pointer text-lg font-medium text-red-500"
        onClick={() => setOpen((b) => !b)}
      >
        Button
      </p>
      {open && (
        <div className="flex flex-col pl-4 pt-2">
          <DropdownInput<ButtonVariant>
            options={variantOptions}
            initialValue={variantOptions[0]}
            selectValue={(val) => val && setVariant(val)}
          />
          <Checkbox
            label="Disabled"
            value={disabled}
            onChange={() => setDisabled((b) => !b)}
          />
          <Checkbox
            label="Full Width"
            value={fillContainer}
            onChange={() => setFillContainer((b) => !b)}
          />
          <p className="my-2 text-lg text-gray-500">Result:</p>
          <div className="w-full border border-gray-200">
            <Button
              variant={variant}
              onClick={() => {}}
              fillContainer={fillContainer}
              disabled={disabled}
            >
              Label
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const InputsPlayground: React.FC = () => {
  if (process.env.NODE_ENV !== 'development')
    return <p>You can only view this page in dev mode!</p>;

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Playground - Inputs</title>
      </Head>
      <TextInputPlayground />
      <TextAreaInputPlayground />
      <DropdownInputPlayground />
      <ButtonPlayground />
    </div>
  );
};

export default InputsPlayground;
