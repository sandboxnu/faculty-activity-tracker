import Navbar from '@/shared/components/Navbar';
import { store } from '@/store/app.store';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/index.css';
import '../styles/utilities.css';
import SideNavbar from '@/shared/components/SideNavbar';
import Header from '@/shared/components/Header';

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
        <div className='flex w-screen'>
          <SideNavbar />
          <div className='flex-1 overflow-x-hidden'>
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
