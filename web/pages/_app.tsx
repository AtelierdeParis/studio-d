import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import NextApp, { AppProps } from 'next/app'
import { client } from '~api/client-react-query'
import Layout from '~components/Layout'
import { QueryClientProvider } from 'react-query'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import theme from '~theme'

const App = ({ Component, pageProps }: AppProps) => {
  console.log(theme)
  const content = (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )

  return content
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return { ...appProps }
}

export default appWithTranslation(App)
