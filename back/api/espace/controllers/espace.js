"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myPlaces(ctx) {
    const { id } = ctx.state.user;
    return strapi.query("espace").find({ users_permissions_user: id });
  },
};
