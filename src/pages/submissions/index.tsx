import React from 'react';
import Link from 'next/link';
import { toTitleCase } from '@/shared/utils/misc.util';

const SubmissionsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <h1>Activities</h1>
      <div className="flex space-x-5">
        {['teaching', 'service', 'research'].map((category) => (
          <div
            key={`link-${category}`}
            className="border-b-2 border-transparent hover:border-red-500"
          >
            <Link href={`/submissions/${category}`}>
              {toTitleCase(category)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsPage;
