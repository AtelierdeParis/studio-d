module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'localhost'),
      port: env('SMTP_PORT', 25),
      auth:
        env('SMTP_USERNAME', null) && env('SMTP_PASSWORD', null)
          ? {
              user: env('SMTP_USERNAME'),
              pass: env('SMTP_PASSWORD'),
            }
          : undefined,
      ignoreTLS: true,
    },
    settings: {
      defaultFrom: `StudioD <${process.env.EMAIL_SENDER}>`,
      defaultReplyTo: `StudioD <${process.env.EMAIL_REPLY_TO}>`,
    },
  },
  upload: {
    provider: process.env.NODE_ENV === 'development' ? 'local' : 'do',
    providerOptions: {
      key: process.env.DO_SPACE_ACCESS_KEY,
      secret: process.env.DO_SPACE_SECRET_KEY,
      endpoint: process.env.DO_SPACE_ENDPOINT,
      space: process.env.DO_SPACE_BUCKET,
      directory: process.env.DO_SPACE_DIRECTORY,
      cdn: process.env.DO_SPACE_CDN,
    },
  },
})
