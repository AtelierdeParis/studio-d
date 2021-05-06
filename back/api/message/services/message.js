"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const getTarget = (type) => (type === "place" ? "company" : "place");

module.exports = {
  async create(data = {}) {
    if (data.status === "message" && !data.message) {
      throw new Error("Missing message fields");
    }
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.message,
      data
    );

    const entry = await strapi.query("message").create(validData);

    return entry;
  },
  async getNbNotifications({ id, type, targetId, bookingId }) {
    const target = getTarget(type);

    const knex = strapi.connections.default;
    const query = knex
      .select("status")
      .count("*")
      .from("messages")
      .where(`messages.${type}`, "=", id)
      .andWhere("messages.hasbeenread", "=", false)
      .andWhere(`messages.author`, "=", target)
      .groupBy("status");

    if (targetId) {
      query.andWhere(`messages.${target}`, "=", targetId);
    }

    if (bookingId) {
      query.andWhere(`messages.booking`, "=", bookingId);
    }

    const entity = await query;

    if (!entity)
      return {
        request: 0,
        booking: 0,
        message: 0,
      };

    return entity.reduce(
      (total, current) => {
        if (current.status === "message") {
          total.message = Number(current.count);
        } else if (
          ["requestcanceled", "pending", "created"].includes(current.status)
        ) {
          total.request = Number(total.request) + Number(current.count);
        } else if (
          [
            "accepted",
            "askcancel",
            "requestcanceledbyplace",
            "bookingcanceledbyplace",
          ].includes(current.status)
        ) {
          total.booking = Number(total.booking) + Number(current.count);
        }
        return total;
      },
      {
        request: 0,
        booking: 0,
        message: 0,
      }
    );
  },
};
