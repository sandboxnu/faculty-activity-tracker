import { store } from '@/store/app.store';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/index.css';
import '../styles/utilities.css';

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
        <Component {...pageProps} />
        {/* <div className="flex flex-col w-screen min-h-screen">
          <Header />
          <div className="flex w-full flex-grow">
            <SideNavbar />
            <div className="flex-1 overflow-x-hidden flex self-stretch border-x border-light-grey px-10 py-6">
              <Component {...pageProps} />
            </div>
            <InfoSidebar />
          </div>
        </div> */}
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
