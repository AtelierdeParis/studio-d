'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myApplications(ctx) {
    const { id, type } = ctx.state.user;
     const {query: initialQuery}=ctx.request;
    const query = type === "place" ? {...initialQuery, 'disponibility.espace.users_permissions_user.id':id} : {...initialQuery, company: id };
    const populate = type==="place"? ['disponibility.espace','company']:['disponibility.espace', 'place','disponibility.espace.users_permissions_user']

    return strapi
      .query("application")
      .find(
        {
          ...query,
          _sort: "disponibility.start:desc",
        },
        populate
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
