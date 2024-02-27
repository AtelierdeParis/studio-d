"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const min = require("date-fns/min");
const isFuture = require("date-fns/isFuture");
const isToday = require("date-fns/isToday");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  "disponibilities",
  "disponibilities.booking",
  "disponibilities.booking.company",
  "disponibilities.dispositif.companies",
  "images",
  "files",
  "users_permissions_user",
  "city",
  "campaign_files"
];

module.exports = {
  async myPlaces(ctx) {
    const {query}=ctx.request;
    const { id } = ctx.state.user;
    return strapi.query("espace").find(
      {
        ...query,
        users_permissions_user: id,
        deleted: false,
        _sort: "name:asc",
      },
      populate
    );
  },
  async find(ctx) {
    const { _sort, perimeter, ...query } = ctx.query;
    const isSortOnDisponibility = ["dispoAsc", "nbDispoDesc"].includes(_sort);

    if (perimeter && query["city.name_eq"]) {
      const placesInPerimeter =
        await strapi.services.espace.getPlacesInPerimeter(
          perimeter,
          query["city.name_eq"]
        );
      if (placesInPerimeter.length > 0) {
        query["id_in"] = placesInPerimeter;
        delete query["city.name_eq"];
      }
    }


    let places = await strapi.services.espace
      .find(
        {
          ...query,
          ...(_sort && !isSortOnDisponibility ? { _sort } : {}),
        },
        populate
      )
      .then((res) => {
        return res.map((place) => ({
          ...place,
          disponibilities: place.disponibilities.filter(
            (dispo) =>
              dispo.status === "available" &&
              (isToday(new Date(dispo.start)) ||
                isFuture(new Date(dispo.start)))
          ),
        }));
      });

    const userId = ctx.state.user ? ctx.state.user.id : undefined;
    places = places.map((place) => {
      place.disponibilities =
        strapi.services.espace.filterDisponibilitiesOnDispositif(
          place.disponibilities,
          userId
        );

      return place;
    });


    if (isSortOnDisponibility) {
      if (_sort === "nbDispoDesc") {
        return places.sort(
          (a, b) => b.disponibilities.length - a.disponibilities.length
        );
      } else if (_sort === "dispoAsc") {
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
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.espace.update({ id }, data, {
        files,
      });
    } else {
      const { files, ...body } = ctx.request.body;
      if (files && files.length > 0) {
        await Promise.all(
          files.map((file) => {
            strapi.plugins["upload"].services.upload.updateFileInfo(file.id, {
              caption: file.caption,
            });
          })
        );
      }
      entity = await strapi.services.espace.update({ id }, body);
    }

    return sanitizeEntity(entity, { model: strapi.models.espace });
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const { availableOnly } = ctx.query;

    const espace = await strapi.services.espace
      .findOne({ slug: id }, populate)
      .then((res) => {
        if (availableOnly) {
          return {
            ...res,
            disponibilities: res.disponibilities.filter(
              (dispo) => dispo.status === "available"
            ),
          };
        }
        return res;
      });

    // Filter on dispositifs
    const userId = ctx.state.user ? ctx.state.user.id : undefined;
    if (userId !== espace.users_permissions_user.id) {
      espace.disponibilities =
        strapi.services.espace.filterDisponibilitiesOnDispositif(
          espace.disponibilities,
          userId
        );
    }

    return sanitizeEntity(espace, { model: strapi.models.espace });
  },
};
