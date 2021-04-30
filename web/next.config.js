const { i18n } = require('./next-i18next.config')
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
])

module.exports = withTM({
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
  },
})
