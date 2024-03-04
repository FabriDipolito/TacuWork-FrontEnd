import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "src/utils/theme";
import Background from "src/sections/Background/Background";
import { Provider } from "react-redux";
import store from "@redux/store";
import { Header } from "src/components/Header/Header";
import { NavBar } from "src/components/NavBar/NavBar";
import { SessionProvider } from "next-auth/react";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Bold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <SessionProvider session={session} basePath="/api/auth">
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            <Background>
              <Header />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <NavBar />
                <Component {...pageProps} />
              </div>
            </Background>
          </Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
