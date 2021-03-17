"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { company, place, ...user } = ctx.request.body;

    if (!company && !place) throw new Error("Undefined user type");
    const type = Boolean(company) ? "company" : "place";

    try {
      const userWithSameEmail = await strapi
        .query("user", "users-permissions")
        .findOne({ email: user.email.toLowerCase() });

      if (userWithSameEmail)
        return ctx.badRequest({
          field: "email",
          text: "signup:form.error.emailTaken",
        });

      const createdUser = await strapi.plugins[
        "users-permissions"
      ].services.user.add({ ...user, confirmed: false, blocked: false });

      return strapi.services[type].create({
        ...ctx.request.body[type],
        user: createdUser.id,
      });
    } catch (error) {
      ctx.badRequest(error);
    }
  },
};
