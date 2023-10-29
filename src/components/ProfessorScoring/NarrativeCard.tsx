import { NarrativeDto } from '@/models/narrative.model';
import { useEffect, useState } from 'react';
import { shortenDescription } from '@/shared/utils/misc.util';

interface NarrativeCardProps {
  narrative?: NarrativeDto;
  cookieKey: string;
}

const NarrativeCard: React.FC<NarrativeCardProps> = ({
  narrative,
  cookieKey,
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleDropDown = () => {
    const newState = !expanded;
    console.log(`SET sidebar-dropdown-${cookieKey} => ${newState}`);
    window.localStorage.setItem(
      `sidebar-dropdown-${cookieKey}`,
      JSON.stringify(newState),
    );
    setExpanded(newState);
  };

  useEffect(() => {
    const storedDropDownCookie = JSON.parse(
      window.localStorage.getItem(`sidebar-dropdown-${cookieKey}`) || 'null',
    );
    if (storedDropDownCookie !== null) {
      console.log(
        `GET sidebar-dropdown-${cookieKey} => ${storedDropDownCookie}`,
      );
      setExpanded(storedDropDownCookie);
    }
  }, [cookieKey]);

  return (
    <div
      className={`flex flex-col items-start justify-center relative rounded-lg gap-[20px] px-[20px] card py-[16px] cursor-pointer bg-gray-100 
          ${
            expanded
              ? 'border-gray-300 border-[1.5px] border-solid'
              : 'shadow-sm'
          }`}
      onClick={toggleDropDown}
      style={{ userSelect: 'none' }}
    >
      <div className="flex items-center relative w-full">
        <div className="flex flex-grow justify-start gap-[30px] items-center">
          <div className="relative w-fit mt-[-1.00px] text-heading-3">
            Narrative
          </div>
          {!expanded && (
            <div className="relative w-fit text-small">
              {narrative ? shortenDescription(narrative?.text) : 'No narrative'}
            </div>
          )}
        </div>
      </div>
      {expanded && <div className="text-regular">{narrative?.text}</div>}
    </div>
  );
};

export default NarrativeCard;
