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
  "company",
  "espace",
  "place",
  "messages",
  "messages.disponibilities",
];

const filterBookings = (type) => {
  switch (type) {
    case "request":
      return {
        status_in: ["pending", "requestcanceled", "requestcanceledbyplace"],
      };
    case "booking":
      return {
        status_in: ["past", "accepted", "bookingcanceledbyplace", "askcancel"],
      };
    case "all":
      return {};
  }
};

module.exports = {
  async removeDispo(ctx) {
    const { id } = ctx.params;
    const { dispos } = ctx.request.body;
    const { type } = ctx.state.user;

    if (!dispos || (Array.isArray(dispos) && dispos.length === 0))
      return ctx.badRequest(
        null,
        formatError({
          id: "error.noDispo",
          message: "You must provide at least one disponibility",
        })
      );

    const booking = await strapi.query("booking").findOne(
      {
        id,
      },
      []
    );

    if (!booking) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.bookingNotFound",
          message: "Booking not found",
        })
      );
    }

    const disponibilities = await strapi.query("disponibility").find(
      {
        id: dispos,
      },
      []
    );

    if (!disponibilities) {
      return ctx.badRequest(
        null,
        formatError({
          id: "error.disposNotFound",
          message: "Disponibilities not found",
        })
      );
    }

    return Promise.all(
      disponibilities.map(({ id, ...rest }) =>
        strapi.query("disponibility").create({ ...rest, status: "removed" })
      )
    ).then(async (res) => {
      await Promise.all(
        dispos.map((id) =>
          strapi
            .query("disponibility")
            .update({ id }, { status: "available", booking: null })
        )
      );

      await strapi.services.message.create({
        author: type,
        status:
          type === "place" ? "disporemovedbyplace" : "disporemovedbycompany",
        booking: id,
        place: booking.place,
        company: booking.company,
        disponibilities: res.map(({ id }) => id),
      });

      return strapi.query("booking").findOne(
        {
          id,
        },
        populate
      );
    });
  },
  async myBookings(ctx) {
    const { bookingType } = ctx.params;
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };

    return strapi
      .query("booking")
      .find(
        {
          ...query,
          ...filterBookings(bookingType),
          _sort: "disponibilities.start:desc",
        },
        populate
      )
      .then((res) => {
        return Promise.all(
          res.map(async (booking) => {
            return {
              ...booking,
              notifications: await strapi.services.message.getNbNotifications({
                id,
                type,
                bookingId: booking.id,
              }),
            };
          })
        );
      });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.booking.findOne({ id }, populate);
    return sanitizeEntity(entity, { model: strapi.models.booking });
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
