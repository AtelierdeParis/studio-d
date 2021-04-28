import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const isBugsnagEnabled =
  process.env.NODE_ENV !== 'development' && !process.env.CI

if (isBugsnagEnabled) {
  Bugsnag.start({
    apiKey:
      serverRuntimeConfig.BUGSNAG_API_KEY ||
      publicRuntimeConfig.BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact(React)],
    appType: typeof window === 'undefined' ? 'server' : 'browser',
    releaseStage: process.env.BUGSNAG_RELEASE_STAGE,
  })
}

export default Bugsnag
