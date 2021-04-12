"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(created) {
      await strapi.services.history.create({
        status: "created",
        booking: entity.id,
      });
    },
    async afterUpdate(updated, params, body) {
      if (body.status) {
        switch (body.status) {
          case "canceled":
            strapi.services.history.create({
              status: "canceled",
              booking: updated.id,
            });
            break;

          default:
            break;
        }
      }
    },
  },
};
