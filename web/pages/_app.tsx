import React, { useEffect } from 'react'
import { BugsnagErrorBoundary } from '@bugsnag/plugin-react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import NextApp, { AppProps } from 'next/app'
import { client } from '~api/client-react-query'
import Layout from '~components/Layout'
import { QueryClientProvider } from 'react-query'
import { appWithTranslation } from 'next-i18next'
import theme from '~theme'
import Bugsnag, { isBugsnagEnabled } from '~utils/bugsnag'
import { initYupLocale } from '~initYupLocale'
import '../styles/globals.css'
import 'swiper/swiper-bundle.min.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'

let ErrorBoundary: BugsnagErrorBoundary
if (isBugsnagEnabled) {
  ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
}

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

  if (isBugsnagEnabled) {
    return (
      <ErrorBoundary
        // @ts-ignore
        FallbackComponent={ErrorPage}
      >
        {content}
      </ErrorBoundary>
    )
  }

  return content
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return { ...appProps }
}

export default appWithTranslation(App)
