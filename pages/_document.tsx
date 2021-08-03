import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { ColorModeScript } from '@chakra-ui/react';

import theme from '../utils/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white dark:bg-gray-900">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
