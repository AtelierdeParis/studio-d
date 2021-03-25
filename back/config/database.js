const url = require("url");

module.exports = ({ env }) => {
  const SSL = env.bool("POSTGRESQL_ADDON_SSL_SELF", false);
  const settings = {
    client: "postgres",
    host: env("POSTGRESQL_ADDON_HOST", "localhost"),
    port: env.int("POSTGRESQL_ADDON_PORT", 5432),
    database: env("POSTGRESQL_ADDON_DB", "strapi"),
    username: env("POSTGRESQL_ADDON_USER", "strapi"),
    password: env("POSTGRESQL_ADDON_PASSWORD", "strapi"),
    ssl: SSL && {
      rejectUnauthorized: SSL,
    },
  };

  if (process.env.DATABASE_URL) {
    const parsed = url.parse(process.env.DATABASE_URL, true);
    const [username, password] = parsed.auth.split(":");

    settings.host = parsed.hostname;
    settings.port = Number(parsed.port);
    settings.database = parsed.pathname.substr(1);
    settings.username = username;
    settings.password = password;
    settings.ssl = true;
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings,
        options: {
          autoMigration: true,
        },
      },
    },
  };
};
