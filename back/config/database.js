module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: env("POSTGRESQL_ADDON_HOST", "localhost"),
          port: env.int("POSTGRESQL_ADDON_PORT", 5432),
          database: env("POSTGRESQL_ADDON_DB", "strapi"),
          username: env("POSTGRESQL_ADDON_USER", "strapi"),
          password: env("POSTGRESQL_ADDON_PASSWORD", "strapi"),
        },
        options: {
          autoMigration: true,
        },
      },
    },
  };
};
