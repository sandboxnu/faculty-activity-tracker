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
      <div className="flex items-center w-full mb-2 pr-5">
        <p className="text-base font-bold mr-2">{label}</p>
        <div className="flex-grow h-[1px] bg-gray-200" />
      </div>
      {children}
    </div>
  );
};

export default ProfileInfoSection;
