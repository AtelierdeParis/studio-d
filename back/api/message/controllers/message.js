"use strict";
const { sanitizeEntity } = require("strapi-utils");

const getTarget = (type) => (type === "place" ? "company" : "place");

const mapStatus = (status) => {
  switch (status) {
    case "booking":
      return ["past", "accepted", "canceledbyplace", "askcancel"];
    case "request":
      return ["canceled", "created"];
    case "message":
      return ["message"];
  }
};

module.exports = {
  async myConversations(ctx) {
    const { id, type } = ctx.state.user;
    const knex = strapi.connections.default;
    const entity = await knex
      .select()
      .from("messages")
      .where(`messages.${type}`, "=", id)
      .leftOuterJoin(
        "users-permissions_user",
        `messages.${type === "place" ? "company" : "place"}`,
        "users-permissions_user.id"
      )
      .distinctOn("messages.company");

    return sanitizeEntity(entity, {
      model: strapi.query("user", "users-permissions").model,
    });
  },
  async getConversation(ctx) {
    const { id, type } = ctx.state.user;
    const userType =
      type === "place"
        ? { place: id, company: ctx.params.id }
        : { company: id, place: ctx.params.id };

    return sanitizeEntity(
      await strapi
        .query("message")
        .find({ ...userType, ...ctx.query, _sort: "created_at:desc" }, [
          "place",
          "company",
          "booking",
          "booking.disponibilities",
        ]),
      {
        model: strapi.models.message,
      }
    );
  },
  async create(ctx) {
    const { id, type } = ctx.state.user;
    const relation = type === "place" ? { place: id } : { company: id };
    const entity = await strapi.services.message.create({
      ...ctx.request.body,
      ...relation,
      author: type,
    });
    return sanitizeEntity(entity, { model: strapi.models.message });
  },
  async myNotifications(ctx) {
    const { id, type } = ctx.state.user;
    const { id: targetId } = ctx.query;
    return strapi.services.message.getNbNotifications({ id, type, targetId });
  },
  async readNotifications(ctx) {
    const { id, type } = ctx.state.user;
    const { status, targetId, bookingId } = ctx.request.body;
    const target = getTarget(type);
    const query = {
      [type]: id,
      status_in: mapStatus(status),
      hasbeenread: false,
      author: target,
    };

    if (targetId) {
      query[target] = targetId;
    }

    if (bookingId) {
      query["booking"] = bookingId;
    }

    const messages = await strapi.services.message.find(query);

    if (!messages || messages.length === 0) return false;

    messages.map(({ id }) => {
      strapi.query("message").update({ id }, { hasbeenread: true });
    });

    return true;
  },
};
