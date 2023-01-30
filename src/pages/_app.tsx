import Navbar from "@/shared/components/Navbar/Navbar";
import { store } from "@/store/app.store";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import "../styles/index.scss";

interface CustomPageProps {
  session: Session;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<CustomPageProps>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;