const { i18n } = require('./next-i18next.config')
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/core',
])

module.exports = withFonts(withTM({
  i18n,
  inlineFontLimit: 300000, // 300ko
  api: {
    responseLimit: false,
  },
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
}))
