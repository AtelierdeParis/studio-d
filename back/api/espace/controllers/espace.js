"use strict";
const min = require("date-fns/min");
const isPast = require("date-fns/isPast");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myPlaces(ctx) {
    const { id } = ctx.state.user;
    return strapi.query("espace").find({ users_permissions_user: id });
  },
  async getCities() {
    const knex = strapi.connections.default;
    return knex.distinct().from("place").pluck("city");
  },
  async find(ctx) {
    const { _sort, ...query } = ctx.query;

    const isSortOnDisponibility = ["dispo", "nbDispo"].includes(_sort);

    const places = await strapi.services.espace
      .find({
        ...query,
        ...(!isSortOnDisponibility ? { _sort } : {}),
      })
      .then((res) => {
        return res.map((place) => ({
          ...place,
          disponibilities: place.disponibilities.filter(
            (dispo) => !isPast(new Date(dispo.start))
          ),
        }));
      });

    if (isSortOnDisponibility) {
      if (_sort === "nbDispo") {
        return places.sort(
          (a, b) => b.disponibilities.length - a.disponibilities.length
        );
      } else if (_sort === "dispo") {
        return places.sort((a, b) => {
          const dateFirst =
            a.disponibilities.length > 0
              ? min(a.disponibilities.map(({ start }) => new Date(start)))
              : new Date("3000-01-01");
          const dateSecond =
            b.disponibilities.length > 0
              ? min(b.disponibilities.map(({ start }) => new Date(start)))
              : new Date("3000-01-01");

          return dateFirst - dateSecond;
        });
      }
    }
    return places;
  },
};
