import 'antd/dist/antd.less';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import {
  DEFAULT_FONT_SIZE,
  PRIMARY_BACKGROUND_COLOR,
} from '@/constants/common';

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
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </Head>

      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
