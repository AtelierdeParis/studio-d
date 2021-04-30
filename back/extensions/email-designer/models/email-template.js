"use strict";
const createSlug = require("url-slug");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.subject) {
        data.slug = createSlug(data.subject);
      }
    },
  },
};
