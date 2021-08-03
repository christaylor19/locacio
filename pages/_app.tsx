import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import AppContextProvider from '../contexts/appContext';
import theme from '../utils/theme';

import type { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContextProvider>
  );
};

export default App;
