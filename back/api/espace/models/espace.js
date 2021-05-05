"use strict";
const createSlug = require("url-slug");
const isPast = require("date-fns/isPast");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const checkCity = async (data) => {
  if (data.city) {
    const city = await strapi
      .query("city")
      .findOne({ name: data.city.toLowerCase() });

    if (city) {
      data.city = city.id;
    } else {
      const createdCity = await strapi
        .query("city")
        .create({ name: data.city.toLowerCase() });
      data.city = createdCity.id;
    }
  }
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data.published = false;
      if (data.name) {
        data.slug = createSlug(data.name);
      }
      await checkCity(data);
    },
    beforeUpdate: async (params, data) => {
      if (data.name) {
        data.slug = createSlug(data.name);
      }
      await checkCity(data);
    },
    async afterFindOne(result) {
      if (result) {
        result.disponibilities.map((dispo) => {
          if (isPast(new Date(dispo.start))) {
            strapi
              .query("disponibility")
              .update({ id: dispo.id }, { status: "past" });
            dispo.status = "past";
          }
        });
      }
    },
  },
};
