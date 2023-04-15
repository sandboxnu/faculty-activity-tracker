import Image from 'next/image';
import React, { useState } from 'react';

type Option = { label: string; value: string };

interface DropdownInputProps {
  options: Option[];
  placeholder: string;
  selectValue: (value: string) => void;
  addOnClass?: string;
  absoluteDropdown?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder,
  selectValue,
  addOnClass = '',
  absoluteDropdown = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={`relative min-w-[175px] ${addOnClass}`}>
      <div
        className="flex items-center justify-between border-[0.5px] border-g rounded-lg px-3 py-2 cursor-pointer"
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
        <div
          className={`${
            absoluteDropdown && 'absolute top-full'
          } mt-2 bg-white border-[0.5px] border-g rounded-lg w-full shadow`}
        >
          {options.map((o, idx) => (
            <div
              className={`w-full px-3 py-2.5 cursor-pointer hover:bg-grey ${
                idx > 0 ? 'border-t-[0.5px] border-g' : ''
              } ${idx === 0 ? 'rounded-tl-lg rounded-tr-lg' : ''} ${
                idx === options.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''
              }`}
              key={o.value}
              onClick={() => {
                setSelectedOption(o);
                selectValue(o.value);
                setDropdownOpen(false);
              }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/*
<select
    value={weight || ''}
    onChange={handleWeightChange}
    className={inputBox}
  >
    <option value="">Select Weight</option>
    <option value="MAJOR">Major</option>
    <option value="SIGNIFICANT">Significant</option>
    <option value="MINOR">Minor</option>
  </select>
*/

export default DropdownInput;
