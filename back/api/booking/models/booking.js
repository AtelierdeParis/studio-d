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
        booking: created.id,
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
          case "canceledbyplace":
            strapi.services.history.create({
              status: "canceledbyplace",
              booking: updated.id,
            });
            break;
          case "askcancel":
            strapi.services.history.create({
              status: "askcancel",
              booking: updated.id,
            });
            break;
          case "accepted":
            strapi.services.history.create({
              status: "accepted",
              booking: updated.id,
            });
            break;
        }
      }
    },
  },
};
