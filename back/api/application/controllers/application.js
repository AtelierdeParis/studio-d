'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myApplications(ctx) {
    const { id, type } = ctx.state.user;
    const query = type === "place" ? { place: id } : { company: id };

    return strapi
      .query("application")
      .find(
        {
          ...query,
          _sort: "disponibility.start:desc",
        },
        ['disponibility.espace', 'place']
      )
      .then((res) => {
        return Promise.all(
          res.map(async (application) => {
            return {
              ...application,
              notifications: await strapi.services.message.getNbNotifications({
                id,
                type,
                applicationId: application.id,
              }),
            };
          })
        );
      });
  },

};
