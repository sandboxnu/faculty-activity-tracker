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
    <div className="flex flex-col px-5 py-3 bg-gray-100 w-full rounded-lg shadow-sm">
      <div
        className="flex items-center space-x-4 cursor-pointer"
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
