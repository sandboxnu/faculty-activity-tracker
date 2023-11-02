import Image from 'next/image';
import { useEffect, useState } from 'react';

const SideBarBubble: React.FC<{
  title: string;
  cookieKey: string;
  children: JSX.Element;
}> = ({ title, cookieKey, children }) => {
  const [dropDownOpen, setDropDownOpen] = useState(true);

  const toggleDropDown = () => {
    const newState = !dropDownOpen;
    console.log(`SET sidebar-dropdown-${cookieKey} => ${newState}`);
    window.localStorage.setItem(
      `sidebar-dropdown-${cookieKey}`,
      JSON.stringify(newState),
    );
    setDropDownOpen(newState);
  };

  useEffect(() => {
    const storedDropDownCookie = JSON.parse(
      window.localStorage.getItem(`sidebar-dropdown-${cookieKey}`) || 'null',
    );
    if (storedDropDownCookie !== null) {
      console.log(
        `GET sidebar-dropdown-${cookieKey} => ${storedDropDownCookie}`,
      );
      setDropDownOpen(storedDropDownCookie);
    }
  }, [cookieKey]);

  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-100 px-5 py-3 shadow-sm">
      <div
        className="flex cursor-pointer items-center space-x-4"
        onClick={toggleDropDown}
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
