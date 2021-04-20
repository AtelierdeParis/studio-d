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

const populate = ["disponibilities", "company", "espace", "place", "messages"];

const getMybookings = (query, user) => {
  return strapi
    .query("booking")
    .find(query, populate)
    .then((res) => {
      return Promise.all(
        res.map(async (booking) => {
          return {
            ...booking,
            notifications: await strapi.services.message.getNbNotifications({
              id: user.id,
              type: user.type,
              bookingId: booking.id,
            }),
          };
        })
      );
    });
};

module.exports = {
  async myBookings(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };
    return getMybookings(
      {
        ...query,
        status_in: ["past", "accepted", "canceledbyplace", "askcancel"],
        _sort: "disponibilities.start:desc",
      },
      ctx.state.user
    );
  },
  async myRequests(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };
    return getMybookings(
      {
        ...query,
        status_in: ["pending", "canceled"],
        _sort: "disponibilities.start:desc",
      },
      ctx.state.user
    );
  },
  async create(ctx) {
    const { id, type, confirmed } = ctx.state.user;
    const { disponibilities } = ctx.request.body;

    if (disponibilities.length === 0) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.noDispo",
          message: "You must provide at least one disponibility",
        })
      );
    }

    if (!confirmed) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.notConfirmed",
          message: "Only confirmed user can create bookings",
        })
      );
    }

    if (type === "place") {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.placeNotAllowed",
          message: "A place is not allowed to make booking",
        })
      );
    }

    if (!ctx.request.body.espace) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.noPlaceId",
          message: "No place id given",
        })
      );
    }

    const espace = await strapi
      .query("espace")
      .findOne({ id: ctx.request.body.espace });

    if (!espace) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.placeNotFound",
          message: "Place not found",
        })
      );
    }

    const entity = await strapi.services.booking
      .create({
        ...ctx.request.body,
        company: id,
        place: espace.users_permissions_user.id,
      })
      .then(async (res) => {
        await Promise.all(
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

            if (entity.espace.users_permissions_user === id) {
              throw new Error(`You can not create a booking for yourself`);
            }
            return dispoId;
          })
        ).then((res) => {
          return res.map((dispoId) => {
            strapi
              .query("disponibility")
              .update({ id: dispoId }, { status: "pending" });
          });
        });
        return res;
      });

    return sanitizeEntity(entity, { model: strapi.models.booking });
  },
};
