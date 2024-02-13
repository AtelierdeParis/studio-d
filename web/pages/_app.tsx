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
import ErrorPage from '~pages/_error'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import 'swiper/swiper-bundle.min.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import CampaignProvider from '~components/Campaign/CampaignProvider'
// import './schedule.css'

let ErrorBoundary: BugsnagErrorBoundary

if (isBugsnagEnabled) {
  ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, test) => {
      if (sessionStorage) {
        const prevPath = sessionStorage.getItem('sd-currentPath')
        sessionStorage.setItem('sd-prevPath', prevPath)
        sessionStorage.setItem('sd-currentPath', url)
      }
    }
    router.events.on('beforeHistoryChange', handleRouteChange)
    initYupLocale()
  }, [])
  const content = (
    <>
      <DefaultSeo
        title="Studio D"
        description="Plateforme solidaire de mise à disposition de studios de danse"
        titleTemplate="%s | Studio D"
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_FRONT_URL,
          site_name: 'Studio D',
          images: [
            {
              url:
                process.env.NEXT_PUBLIC_FRONT_URL +
                '/assets/img/logo-studio-d.svg',
            },
          ],
        }}
        twitter={{
          handle: '@studiodphoto',
          cardType: 'summary_large_image',
        }}
      />
      <Provider session={pageProps.session}>
        <QueryClientProvider client={client}>
          <ChakraProvider theme={theme}>
            <CampaignProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CampaignProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </>
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
