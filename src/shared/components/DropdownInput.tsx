import Image from 'next/image';
import React, { useState } from 'react';
import clsx from 'clsx';
import { incompleteBorderClass } from './InputContainer';

type OptionType = string | number;

export type Option<T = OptionType> = { label: string; value?: T };

interface DropdownInputProps<T> {
  options: Option<T>[];
  placeholder?: string;
  initialValue?: Option<T> | undefined;
  selectValue: (value: T | undefined) => void;
  addOnClass?: string;
  absoluteDropdown?: boolean;
  fillContainer?: boolean;
}

const DropdownInput = <T extends unknown>({
  options,
  placeholder,
  initialValue,
  selectValue,
  addOnClass = '',
  absoluteDropdown = true,
  fillContainer = false,
}: DropdownInputProps<T>): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(
    initialValue || null,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const allOptions = placeholder
    ? [{ label: placeholder, value: undefined }, ...options]
    : options;

  return (
    <div className="relative min-h-[40px] w-full">
      <div
        className={clsx([
          'flex cursor-pointer flex-col rounded-lg border-[0.5px] border-gray-500 bg-white',
          incompleteBorderClass,
          absoluteDropdown ? 'absolute' : 'relative',
          fillContainer ? 'w-full' : 'w-[175px]',
          addOnClass,
        ])}
      >
        <div
          className="flex items-center justify-between px-3 py-2"
          onClick={() => setDropdownOpen((b) => !b)}
        >
          <p className="">{selectedOption?.label || placeholder}</p>
          <Image
            className={`${dropdownOpen ? '-rotate-90' : 'rotate-90'} mr-1`}
            src={'/media/rightArrow.svg'}
            alt="down arrow"
            width={9}
            height={9}
          />
        </div>
        {dropdownOpen && (
          <>
            {allOptions.map((o, idx) => (
              <div
                className={clsx([
                  'w-full cursor-pointer px-3 py-2.5 hover:bg-gray-200',
                  selectedOption?.value === o.value && 'bg-gray-100',
                  o.value === undefined &&
                    'text-neutral-400 hover:text-gray-500',
                  idx === allOptions.length - 1 && 'rounded-b-lg',
                ])}
                key={o.value?.toString() || ''}
                onClick={() => {
                  setSelectedOption(o);
                  selectValue(o.value || undefined);
                  setDropdownOpen(false);
                }}
              >
                {o.label}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
