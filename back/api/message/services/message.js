"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

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
};
