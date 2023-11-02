import SideBarBubble from '@/shared/components/SideBarBubble';
import React from 'react';

const FormInstructions: React.FC = () => {
  return (
    <>
      <SideBarBubble title="Instructions" cookieKey="form-instructions">
        <ul className="my-4 list-inside space-y-3">
          <li className="text-sm">
            For each activity, select a category, insert information about each
            activity, and provide a concise description that provides context.
          </li>
          <li className="text-sm">
            Each activity should have a weight of major, significant, or minor.
          </li>
          <li className="text-sm">
            Guidelines are provided but are not strictly enforced in the score
            calculation.
          </li>
          <li className="text-sm">
            If you would like to make a weight claim that is different
            thanlisted, it must be justified in the description.
          </li>
          <li className="text-sm">
            If you would like to make a bonus claim meaning that your work inone
            category should overflow into another, then justify it in
            thedescription.
          </li>
          <li className="text-sm">
            The committee may ask for evidence for extra support and context.
          </li>
        </ul>
      </SideBarBubble>
    </>
  );
};

export default FormInstructions;
