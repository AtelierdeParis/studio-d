"use strict";
const isAfter = require("date-fns/isAfter");
const max = require("date-fns/max");

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

    const newDispo = await Promise.all(
      ctx.request.body.map((dispo) =>
        strapi.query("disponibility").create(dispo)
      )
    );

    const maxDate = max(newDispo.map((dispo) => new Date(dispo.end)));
    const place = newDispo[0].espace;

    if (!place.filledUntil || isAfter(maxDate, new Date(place.filledUntil))) {
      const data = { filledUntil: maxDate };
      if (!place.filledUntil) data["published"] = true;
      strapi.query("espace").update({ id: place.id }, data);
    }

    return newDispo;
  },
};
