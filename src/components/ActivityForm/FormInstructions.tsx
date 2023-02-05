import Image from 'next/image';
import React from 'react';
import Tooltip from '../../shared/components/Tooltip';

interface FormInstructionsProps {
  showWeightGuidelines?: boolean; // whether to include weight guidelines
}

const FormInstructions: React.FC<FormInstructionsProps> = ({
  showWeightGuidelines,
}) => {
  return (
    <div className="">
      <div>
        <p className="text-2xl font-bold my-6">Instructions:</p>
        <ul className="list-inside space-y-3">
          <li>
            For each activity, select a category, insert information about each
            activity, and provide a concise description that provides context.
          </li>
          <li>
            Each activity should have a weight of major, significant, or minor.
          </li>
          <li>
            Guidelines are provided but are not strictly enforced in the score
            calculation.
          </li>
          <li>
            If you would like to make a weight claim that is different than
            listed, it must be justified in the description.
          </li>
          <li>
            If you would like to make a bonus claim meaning that your work in
            one category should overflow into another, then justify it in the
            description.
          </li>
          <li>
            The committee may ask for evidence for extra support and context.
          </li>
        </ul>
      </div>
      {showWeightGuidelines && (
        <div>
          <p className="text-2xl font-bold my-6">Weight Guidelines:</p>
          <div className="space-y-3">
            <p>
              8-10 Major Activity: 2 and above + Significant and Minor
              Activities: 10 and above
            </p>
            <p>
              7-8 Major Activity: 1-2 + Significant and Minor Activities: 6-10
            </p>
            <p>
              6-7 Major Activity: 0-1 + Significant and Minor Activities: 2-6
            </p>
            <p>6 Fulfilling required course load</p>
          </div>
          <div className="flex items-center space-x-2 mt-5">
            <Image
              src="/media/personIcon.svg"
              alt="Little person icon"
              width={22}
              height={22}
            />
            <Tooltip
              tooltipTitle={'Example persona for a score between 7-8'}
              text={[
                'Major: Teaching a new course, teaching a large course',
                'Significant: Organize workshop with partner institution',
                'Minor: Write 3 letters of recommendation, A directed or independent study, Give a guest lecture',
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormInstructions;
