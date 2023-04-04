import Image from 'next/image';
import { useState } from 'react';

const SideBarBubble: React.FC<{ title: string; children: JSX.Element }> = ({
  title,
  children,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="flex flex-col px-5 py-3 bg-medium-grey w-full rounded-lg shadow-sm">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => setDropDownOpen((b) => !b)}
      >
        <Image
          className={dropDownOpen ? 'rotate-90' : ''}
          src={'/media/rightArrow.svg'}
          alt="right arrow"
          width={9}
          height={9}
        />
        <h3> {title} </h3>
      </div>
      {dropDownOpen && children}
    </div>
  );
};

export default SideBarBubble;
