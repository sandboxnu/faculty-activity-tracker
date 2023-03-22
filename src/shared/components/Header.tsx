import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-baseline w-screen bg-black font-bold px-12 py-6">
      <Image src="/media/neuLogo.svg" alt="CAMD Logo" width={200} height={50} />
    </div>
  );
};

export default Header;
