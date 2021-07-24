import 'antd/dist/antd.less';

import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import { DEFAULT_FONT_SIZE } from '@/constants/fontSize';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: ${DEFAULT_FONT_SIZE}px;

    background-color: #eac990;
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
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
