import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import React from 'react';


//TODO: add PROPS
const ScoringInfo: React.FC = () => {
  return (
    <>
    <StaticSideBarBubble title="Teaching Release">
      <div className="space-y-2 my-2">
        <p>
          {' '}
          N/A
        </p>
      </div>
    </StaticSideBarBubble>
    <StaticSideBarBubble title="Activity Rubric">
      <div className="space-y-2 my-2">
        <p>
          {' '}
          8 significants = 1 major activity
        </p>
        <p>
          {' '}
          4 significants = 1 minor activity
        </p>
      </div>
    </StaticSideBarBubble>
    </>
  );
};

export default ScoringInfo;
