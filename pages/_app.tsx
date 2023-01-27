import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/layout';
import { updateTheme } from '../components/DarkSystemLight';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(updateTheme, [Component]);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
