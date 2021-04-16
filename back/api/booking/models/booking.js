"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterFind(results) {
      if (results.length > 0) {
        await Promise.all(
          results.map(async (booking) => {
            const { status } = await strapi.services.booking.checkIsPast(
              booking
            );
            booking.status = status;
          })
        );
      }
    },
    async afterCreate(created) {
      await strapi.services.message.create({
        author: "company",
        status: "created",
        booking: created.id,
        place: created.espace.users_permissions_user,
        company: created.company.id,
      });
    },
    async afterUpdate(updated, params, body) {
      const rel = {
        booking: updated.id,
        place: updated.place.id,
        company: updated.company.id,
      };

      if (body.status) {
        switch (body.status) {
          case "canceled":
            strapi.services.message.create({
              author: "company",
              status: "canceled",
              ...rel,
            });
            break;
          case "canceledbyplace":
            strapi.services.message.create({
              author: "place",
              status: "canceledbyplace",
              ...rel,
            });
            break;
          case "askcancel":
            strapi.services.message.create({
              author: "company",
              status: "askcancel",
              ...rel,
            });
            break;
          case "accepted":
            strapi.services.message.create({
              author: "place",
              status: "accepted",
              ...rel,
            });
            break;
        }
      }
    },
  },
};
