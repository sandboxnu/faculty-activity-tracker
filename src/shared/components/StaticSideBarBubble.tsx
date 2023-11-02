import React from 'react';

const StaticSideBarBubble: React.FC<{
  title: string;
  children: JSX.Element;
}> = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-100 px-5 py-3 shadow-sm">
      <div className="mt-[-1.00px] flex w-full text-body-bold ">{title}</div>
      <div className="flex text-body">{children}</div>
    </div>
  );
};

export default StaticSideBarBubble;
