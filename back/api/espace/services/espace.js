"use strict";
const isFuture = require("date-fns/isFuture");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  filterDisponibilitiesOnDispositif(disponibilities, userId = null) {
    return disponibilities
      ?.filter((disponibility) => {
        if (disponibility.dispositif?.companies.length) {
          return disponibility.dispositif.companies.find(
            (company) => userId === company.id
          );
        }

        return true;
      })
      .map((disponibility) => {
        const { dispositif, ...rest } = disponibility;
        return rest;
      });
  },
  async getPlacesInPerimeter(perimeter, cityName) {
    const city = await strapi.query("city").findOne(
      {
        name: cityName,
      },
      []
    );

    if (!city) return [];

    const knex = strapi.connections.default;
    try {
      const places = await knex.raw(
        `WITH places AS (
              SELECT
              id,
              city,
              published,
              (
                3959 * acos(
                  cos(radians(${city.latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${city.longitude})) + sin(radians(${city.latitude})) * sin(radians(latitude))
                )
              ) as distance
            FROM place
          )
          SELECT id
          FROM places
          WHERE (distance <= ${perimeter}
          OR city = ${city.id}) AND published = true
          `
      );
      return places.rows.map(({ id }) => id);
    } catch {
      return [];
    }
  },
};
