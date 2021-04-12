"use strict";

const { sanitizeEntity } = require("strapi-utils");
const formatError = (error) => ({
  id: error.id,
  message: error.message,
  field: error.field,
});

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  "disponibilities",
  "disponibilities.espace",
  "company",
  "place",
  "histories",
];

module.exports = {
  async myBookings(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };
    return strapi.query("booking").find(
      {
        ...query,
        status_in: ["past", "accepted"],
      },
      populate
    );
  },
  async myRequests(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };
    return strapi.query("booking").find(
      {
        ...query,
        status_in: ["pending", "canceled"],
      },
      populate
    );
  },
  async create(ctx) {
    const { disponibilities, users_permissions_user } = ctx.request.body;

    if (disponibilities.length === 0) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.noDispo",
          message: "You must provide at least one disponibility",
        })
      );
    }

    Promise.all(
      disponibilities.map(async (dispoId) => {
        const entity = await strapi
          .query("disponibility")
          .findOne({ id: dispoId });

        if (!entity) {
          throw new Error(`Dispo with id ${dispoId} not found`);
        }

        if (entity.status !== "available") {
          throw new Error(
            `Dispo with id ${dispoId} is not available for a booking`
          );
        }

        // TODO: uncomment
        // if (entity.espace.users_permissions_user === users_permissions_user) {
        //   throw new Error(`You can not create a booking for yourself`);
        // }
        return dispoId;
      })
    )
      .then((res) => {
        res.map((dispoId) => {
          strapi
            .query("disponibility")
            .update({ id: dispoId }, { status: "pending" });
        });
      })
      .catch((err) => {
        console.log("err", err);
      });

    const entity = await strapi.services.booking.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.booking });
  },
};
