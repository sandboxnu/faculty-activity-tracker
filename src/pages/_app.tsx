import Navbar from "@/shared/components/Navbar/Navbar";
import { store } from "@/store/app.store";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import "../styles/index.scss";

interface CustomPageProps {

}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;