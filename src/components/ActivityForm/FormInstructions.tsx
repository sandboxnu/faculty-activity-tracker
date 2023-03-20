import Image from 'next/image';
import React from 'react';
import Tooltip from '../../shared/components/Tooltip';


const FormInstructions: React.FC = () => {
  return (
    <>
      <div className='flex flex-col p-5 bg-medium-grey w-full rounded-lg'>
        <h3>Instructions:</h3>
        <ul className="list-inside space-y-3 my-4">
          <li className='text-sm'>For each activity, select a category, insert information about each activity, and provide a concise description that provides context.</li>
          <li className='text-sm'>Each activity should have a weight of major, significant, or minor.</li>
          <li className='text-sm'>Guidelines are provided but are not strictly enforced in the score calculation.</li>
          <li className='text-sm'>If you would like to make a weight claim that is different thanlisted, it must be justified in the description.</li>
          <li className='text-sm'>If you would like to make a bonus claim meaning that your work inone category should overflow into another, then justify it in thedescription.</li>
          <li className='text-sm'>The committee may ask for evidence for extra support and context.</li>
        </ul>
      </div>
    </>
  );
};

export default FormInstructions;
