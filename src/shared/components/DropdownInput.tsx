import Image from 'next/image';
import React, { useState } from 'react';

type OptionType = string | number;

export type Option<T = OptionType> = { label: string; value?: T };

interface DropdownInputProps<T> {
  options: Option<T>[];
  placeholder: string;
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
  const emptyOption: Option<T> = { label: placeholder, value: undefined };
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(
    initialValue || null,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const allOptions = [emptyOption, ...options];

  return (
    <div className="relative w-full min-h-[40px]">
      <div
        className={`${absoluteDropdown ? 'absolute' : 'relative'} ${
          fillContainer ? 'w-full' : 'w-[175px]'
        } flex flex-col bg-white border-[0.5px] border-gray-500 rounded-lg cursor-pointer ${addOnClass}`}
      >
        <div
          className="flex items-center justify-between px-3 py-2"
          onClick={() => setDropdownOpen((b) => !b)}
        >
          <p className="">{selectedOption?.label || placeholder}</p>
          <Image
            className={`${dropdownOpen ? 'rotate-90' : '-rotate-90'} mr-1`}
            src={'/media/rightArrow.svg'}
            alt="down arrow"
            width={9}
            height={9}
          />
        </div>
        {dropdownOpen && (
          <>
            {allOptions
              .filter((o) => o.value !== selectedOption?.value)
              .map((o, idx) => (
                <div
                  className={`w-full px-3 py-2.5 cursor-pointer hover:bg-gray-100 ${
                    !o.value && 'text-neutral-400'
                  }`}
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
