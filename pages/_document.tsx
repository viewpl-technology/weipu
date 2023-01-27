import Script from 'next/script';

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          strategy='beforeInteractive'
          src='https://unpkg.com/flowbite@1.5.5/dist/flowbite.js'
        />
      </body>
    </Html>
  );
}
