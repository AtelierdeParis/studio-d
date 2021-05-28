"use strict";
const isPast = require("date-fns/isPast");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async checkStatus(dispo) {
    const data = {};
    if (isPast(new Date(dispo.start))) {
      data["status"] = "past";
    } else {
      data["status"] = "available";
      data["booking"] = null;

      await strapi.query("disponibility").create({ ...dispo, status: "past" });
    }
    return strapi.query("disponibility").update({ id: dispo.id }, data);
  },
};
