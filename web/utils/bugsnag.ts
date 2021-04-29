import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

// export const isBugsnagEnabled =
//   process.env.NODE_ENV !== 'development' && !process.env.CI
export const isBugsnagEnabled = false

if (isBugsnagEnabled) {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact(React)],
    appType: typeof window === 'undefined' ? 'server' : 'browser',
  })
}

export default Bugsnag
