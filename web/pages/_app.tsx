import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import NextApp, { AppProps } from 'next/app'
import { client } from '~api/client-react-query'
import Layout from '~components/Layout'
import { QueryClientProvider } from 'react-query'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import theme from '~theme'
import { initYupLocale } from '~initYupLocale'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    initYupLocale()
  }, [])
  const content = (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )

  return content
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return { ...appProps }
}

export default appWithTranslation(App)
