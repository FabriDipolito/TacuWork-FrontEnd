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

interface MyPageProps {
  session?: any; // Usa el tipo adecuado en lugar de 'any'
  [key: string]: any; // Permite otras propiedades
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<MyPageProps>): JSX.Element {
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

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
          integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
      </Head>
      <SessionProvider session={session}>
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
