import Navbar from '@/shared/components/Navbar';
import { store } from '@/store/app.store';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { getSession, SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/index.css';
import '../styles/utilities.css';
import SideNavbar from '@/shared/components/SideNavbar';
import Header from '@/shared/components/Header';
import InfoSidebar from '@/shared/components/InfoSidebar';
import Head from 'next/head';

interface CustomPageProps {
  session: Session;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<CustomPageProps>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {/*<Navbar />*/}
        <Header />
        <div className="flex w-screen min-h-screen">
          <SideNavbar />
          <div className="flex-1 overflow-x-hidden flex self-stretch border-x border-light-grey my-5">
            <Component {...pageProps} />
          </div>
          <InfoSidebar />
        </div>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
