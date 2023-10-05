import React from 'react';

const StaticSideBarBubble: React.FC<{
  title: string;
  children: JSX.Element;
}> = ({ title, children }) => {
  return (
    <div className="flex flex-col rounded-lg px-5 py-3 w-full bg-gray-100 shadow-sm">
      <div className="flex w-full mt-[-1.00px] text-body-bold ">{title}</div>
      <div className="flex text-body">{children}</div>
    </div>
  );
};

export default StaticSideBarBubble;
