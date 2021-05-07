"use strict";
const createSlug = require("url-slug");
const isPast = require("date-fns/isPast");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const generateSlug = async (data, params = {}) => {
  if (data.name && typeof data.name === "string") {
    const slug = createSlug(data.name);
    const query = { slug_contains: slug };
    if (params.external_id) query["external_id_nin"] = [params.external_id];
    if (params.id) query["id_nin"] = [params.id];
    const place = await strapi.query("espace").find(query);
    data.slug = createSlug(
      `${data.name}${place.length > 0 ? `-${place.length}` : ""}`
    );
  }
};

const checkCity = async (data) => {
  if (data.city && typeof data.city === "string") {
    const city = await strapi
      .query("city")
      .findOne({ name: data.city.toLowerCase() });

    if (city) {
      data.city = city.id;
    } else {
      const createdCity = await strapi.query("city").create({
        name: data.city.toLowerCase(),
        country: data.country,
      });
      data.city = createdCity.id;
    }
  }
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data.published = false;
      if (data.name) {
        await generateSlug(data);
      }
      await checkCity(data);
    },
    beforeUpdate: async (params, data) => {
      console.log(data);
      if (data.name) {
        await generateSlug(data, params);
      }
      await checkCity(data);
    },
    async afterFind(result) {
      if (result && result.length > 0) {
        result.map((place, index) => {
          result[index].disponibilities = place.disponibilities.map((dispo) => {
            if (isPast(new Date(dispo.start))) {
              strapi
                .query("disponibility")
                .update({ id: dispo.id }, { status: "past" });
              dispo.status = "past";
            }
            return dispo;
          });
        });
      }
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
