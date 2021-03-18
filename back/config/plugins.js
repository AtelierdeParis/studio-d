module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST", "localhost"),
      port: env("SMTP_PORT", 25),
      auth:
        env("SMTP_USERNAME", null) && env("SMTP_PASSWORD", null)
          ? {
              user: env("SMTP_USERNAME"),
              pass: env("SMTP_PASSWORD"),
            }
          : undefined,
      ignoreTLS: true,
    },
  },
});
