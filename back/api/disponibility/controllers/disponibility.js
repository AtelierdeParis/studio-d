"use strict";
const isAfter = require("date-fns/isAfter");
const max = require("date-fns/max");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const params = [
  "dispositif",
  "dispositif.companies",
  "dispositif.users_permissions_users",
];

module.exports = {
  async find(ctx) {
    const entities = ctx.query._q
      ? await strapi.services.disponibility.search(ctx.query, params)
      : await strapi.services.disponibility.find(ctx.query, params);

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.disponibility })
    );
  },

  createMany: async (ctx) => {
    const user = ctx.state.user;
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
      if (!place.filledUntil) {
        data["published"] = true;
      }
      strapi
        .query("espace")
        .update({ id: place.id }, data)
        .then(() => {
          if (!place.filledUntil) {
            // Send email to administration
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: process.env.EMAIL_RECIPIENT,
              },
              {
                templateId: "admin-new-place",
              },
              {
                user_type: user.type,
                user_name: user.firstname,
                slug: place.slug,
                url_strapi: `${process.env.BASE_URL}/admin/plugins/content-manager/collectionType/application::espace.espace/${place.id}`,
              },
              true
            );
          }
        });
    }

    return newDispo;
  },
};
