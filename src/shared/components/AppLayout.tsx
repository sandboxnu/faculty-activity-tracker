import React from 'react';
import SideNavbar from '@/shared/components/SideNavbar';
import Header from '@/shared/components/Header';
import InfoSidebar from '@/shared/components/InfoSidebar';

interface AppLayoutProps {
  children: JSX.Element;
  hideSidebars?: boolean;
  hideNavbar?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  hideSidebars = false,
  hideNavbar = false,
}) => {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      {!hideNavbar && <Header />}
      <div className="flex w-full flex-grow">
        {!hideSidebars && <SideNavbar />}
        <div className="flex-1 overflow-x-hidden flex self-stretch border-x border-light-grey px-10 py-6">
          {children}
        </div>
        {!hideSidebars && <InfoSidebar />}
      </div>
    </div>
  );
};

export default AppLayout;
