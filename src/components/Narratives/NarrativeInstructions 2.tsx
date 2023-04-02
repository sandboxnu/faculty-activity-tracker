import SideBarBubble from '@/shared/components/SideBarBubble';
import React from 'react';

const NarrativeInstructions: React.FC = () => {
  return (
    <SideBarBubble title="Instructions ">
      <div className="space-y-2 my-2">
        <p>
          {' '}
          ∙ Please provide your narrative of teaching including highlights and
          context. Include up to 5 of the most impactful specific actions you
          did that improved student learning in response to COVID. This text
          will help the chair for writing the merit letter.
        </p>
        <p>
          {' '}
          ∙ If you would like to make a weight claim that is different than
          listed it must be justified in the description or narrative.{' '}
        </p>
        <p>
          ∙ If you would like to make a bonus claim meaning that your work in
          one category should overflow into another, then justify it in the
          narrative.{' '}
        </p>
      </div>
    </SideBarBubble>
  );
};

export default NarrativeInstructions;
