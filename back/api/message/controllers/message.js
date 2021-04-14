"use strict";
const { sanitizeEntity } = require("strapi-utils");

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
    });
    return sanitizeEntity(entity, { model: strapi.models.message });
  },
};
