"use strict";
const { sanitizeEntity } = require("strapi-utils");
const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  async updateMe(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: "",
        type: "plugin",
        name: "users-permissions",
        key: "advanced",
      })
      .get();

    const { id } = ctx.state.user;
    const { email, password } = ctx.request.body;

    const user = await strapi.plugins["users-permissions"].services.user.fetch({
      id,
    });

    if (ctx.request.body.hasOwnProperty("email") && !email) {
      return ctx.badRequest("email.notNull");
    }

    if (
      ctx.request.body.hasOwnProperty("password") &&
      !password &&
      user.provider === "local"
    ) {
      return ctx.badRequest("password.notNull");
    }

    if (
      ctx.request.body.hasOwnProperty("email") &&
      advancedConfigs.unique_email
    ) {
      const userWithSameEmail = await strapi
        .query("user", "users-permissions")
        .findOne({ email: email.toLowerCase() });

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.email.taken",
            message: "Email already taken",
            field: ["email"],
          })
        );
      }
      ctx.request.body.email = ctx.request.body.email.toLowerCase();
    }

    let updateData = {
      ...ctx.request.body,
    };

    if (
      ctx.request.body.hasOwnProperty("password") &&
      password === user.password
    ) {
      delete updateData.password;
    }

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id },
      updateData
    );

    ctx.send(sanitizeUser(data));
  },
  checkPassword(ctx) {
    const params = ctx.request.body;
    const user = ctx.state.user;

    return strapi.plugins["users-permissions"].services.user.validatePassword(
      params.password,
      user.password
    );
  },
};
