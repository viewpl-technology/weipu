import { useEffect } from 'react'
import '../styles/globals.css'
import { AppPropsWithLayout } from '../types'
import Layout from '../components/layout'
import { updateTheme } from '../components/DarkSystemLight'
import { AuthProvider } from '../contexts/auth'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(updateTheme, [Component])

  const component = <Component {...pageProps} />

  return (
    <AuthProvider>
      {Component.getLayout ? (
        Component.getLayout(component)
      ) : (
        <Layout>{component}</Layout>
      )}
    </AuthProvider>
  )
}
