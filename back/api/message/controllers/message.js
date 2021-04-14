"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async myConversations(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };
    const knex = strapi.connections.default;
    const entity = await knex
      .select()
      .from("messages")
      .where("messages.place", "=", id)
      .leftOuterJoin(
        "users-permissions_user",
        "messages.company",
        "users-permissions_user.id"
      )
      .distinctOn("messages.company");

    return sanitizeEntity(entity, {
      model: strapi.query("user", "users-permissions").model,
    });
  },
  async getConversation(ctx) {
    const { id, type } = ctx.state.user;
    const query =
      type === "place"
        ? { place: id, company: ctx.params.id }
        : { company: id, place: ctx.params.id };

    return sanitizeEntity(
      await strapi.query("message").find({ ...query, _sort: "created_at:asc" }),
      {
        model: strapi.models.message,
      }
    );
  },
};
