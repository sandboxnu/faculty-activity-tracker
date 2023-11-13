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
      className={`card relative flex cursor-pointer flex-col items-start justify-center gap-[20px] rounded-lg bg-gray-100 px-[20px] py-[16px] 
          ${
            expanded
              ? 'border-[1.5px] border-solid border-gray-300'
              : 'shadow-sm'
          }`}
      onClick={toggleDropDown}
      style={{ userSelect: 'none' }}
    >
      <div className="relative flex w-full items-center">
        <div className="flex flex-grow items-center justify-start gap-[30px]">
          <div className="relative mt-[-1.00px] w-fit text-heading-3">
            Narrative
          </div>
          {!expanded && (
            <div className="relative w-fit whitespace-pre-wrap text-small">
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
