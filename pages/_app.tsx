/* eslint-disable prettier/prettier */
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "src/utils/theme";
import Background from "src/sections/Background/Background";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <link
                rel="preload"
                href="/fonts/Causten-Regular.otf"
                as="font"
                crossOrigin="anonymous"
                />
                <link
                rel="preload"
                href="/fonts/Causten-SemiBold.otf"
                as="font"
                crossOrigin="anonymous"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <CssBaseline />
                    <Background>
                        <Component {...pageProps} />
                    </Background>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
