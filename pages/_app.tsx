import 'antd/dist/antd.less';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import {
  DEFAULT_FONT_SIZE,
  PRIMARY_BACKGROUND_COLOR,
} from '@/constants/common';
import { gaPageView } from '@/utils/googleAnalytics';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: ${DEFAULT_FONT_SIZE}px;

    background-color: ${PRIMARY_BACKGROUND_COLOR};
    background-image: url('https://i.imgur.com/4rKVgAQ.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Send GA page-view event when route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gaPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <GoogleAnalytics />
      </Head>

      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
