"use strict";
const createSlug = require("url-slug");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = createSlug(data.title);
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.title) {
        data.slug = createSlug(data.title);
      }

      if (data.notification_email_test) {

        try {
          await strapi.services.actuality.sendActualityEmails(data, [data.notification_email_test]);
          data.notification_email_test = null;
        } catch (error) {
          console.error('Failed to send test email:', error);
        }
      }
    },
  },
};
