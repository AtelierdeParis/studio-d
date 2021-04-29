const Bugsnag = require("@bugsnag/js");

module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const middleware = Bugsnag.getPlugin("koa");
        strapi.app.use(middleware.requestHandler);
        strapi.app.on("error", middleware.errorHandler);
        await next();
      });
    },
  };
};
