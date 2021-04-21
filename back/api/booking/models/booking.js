"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const updateDispo = (dispos = [], status) => {
  if (!dispos || dispos.length === 0) return null;
  dispos.map(({ id }) => {
    strapi.query("disponibility").update({ id }, { status });
  });
};

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
            updateDispo(updated.disponibilities, "available");
            break;
          case "canceledbyplace":
            strapi.services.message.create({
              author: "place",
              status: "canceledbyplace",
              ...rel,
            });
            updateDispo(updated.disponibilities, "available");
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
            updateDispo(updated.disponibilities, "booked");
            break;
        }
      }
    },
  },
};
