import { store } from '@/store/app.store';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/index.css';
import '../styles/utilities.css';
import AppLayout from '@/shared/components/AppLayout';

interface CustomPageProps {
  session: Session;
  hideLeftSidebar?: boolean;
  hideRightSidebar?: boolean;
  hideNavbar?: boolean;
}

function MyApp({
  Component,
  pageProps: {
    session,
    hideLeftSidebar = false,
    hideRightSidebar = false,
    hideNavbar = false,
    ...pageProps
  },
}: AppProps<CustomPageProps>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <AppLayout
          hideLeftSidebar={hideLeftSidebar}
          hideRightSidebar={hideRightSidebar}
          hideNavbar={hideNavbar}
        >
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
