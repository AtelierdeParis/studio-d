"use strict";
const createSlug = require("url-slug");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data.published = false;
      if (data.name) {
        data.slug = createSlug(data.name);
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.name) {
        data.slug = createSlug(data.name);
      }
    },
  },
};
