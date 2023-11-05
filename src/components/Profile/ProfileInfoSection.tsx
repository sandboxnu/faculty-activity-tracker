import React from 'react';

interface ProfileInfoSectionProps {
  label: string;
  children: JSX.Element;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  label,
  children,
}) => {
  return (
    <div>
      <div className="mb-2 flex w-full items-center pr-5">
        <p className="mr-2 text-base font-bold">{label}</p>
        <div className="h-[1px] flex-grow bg-gray-200" />
      </div>
      {children}
    </div>
  );
};

export default ProfileInfoSection;
