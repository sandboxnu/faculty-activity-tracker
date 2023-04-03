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
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Anybody:wght@100;200;400;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,500;0,600;1,200;1,300&display=swap"
            rel="stylesheet"
          />
        </Head>
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
