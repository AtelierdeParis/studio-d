"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createMany: async (ctx) => {
    if (!Array.isArray(ctx.request.body))
      return ctx.badRequest(
        null,
        formatError({
          id: "error.arrayProvide",
          message: "You must provide an array",
        })
      );

    return Promise.all(
      ctx.request.body.map((dispo) =>
        strapi.query("disponibility").create(dispo)
      )
    );
  },
};
