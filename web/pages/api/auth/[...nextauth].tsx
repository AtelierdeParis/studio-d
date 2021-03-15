import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    // OAuth authentication providers
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Sign in with email
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      tls: { rejectUnauthorized: false },
    }),
  ],
  // SQL or MongoDB database (or leave empty)
  database: {
    type: "postgres",
    host: process.env.POSTGRESQL_ADDON_HOST,
    port: process.env.POSTGRESQL_ADDON_PORT,
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
  },
};

export default (req, res) => NextAuth(req, res, options);
