"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.actuality.findOne({ slug: id });
    return sanitizeEntity(entity, { model: strapi.models.actuality });
  },
  async infoNotifications(ctx) {
    const { email } = ctx.query;
    const user = await strapi.query('user', 'users-permissions').findOne({ email: decodeURIComponent(email) });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      hasSubscribeActualityEmail: user.hasSubscribeActualityEmail,
    };
  },
  async updateNotifications(ctx) {
    const { email, hasSubscribeActualityEmail } = ctx.request.body;

    const user = await strapi.query('user', 'users-permissions').update(
      { email },
      { hasSubscribeActualityEmail: hasSubscribeActualityEmail }
    );

    return {
      success: true,
      hasSubscribeActualityEmail: user.hasSubscribeActualityEmail,
    };
  },
};
