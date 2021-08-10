import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { FC } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import theme from '../utils/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
