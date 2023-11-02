import React from 'react';

const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className="w-1/4">
    <div className="relative h-0 w-full rounded-full border border-gray-700 bg-gray-200 bg-opacity-50 pb-[100%]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-red-500">
        {initials}
      </div>
    </div>
  </div>
);

export default Avatar;
