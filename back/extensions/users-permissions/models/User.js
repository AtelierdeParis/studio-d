"use strict";

module.exports = {
  lifecycles: {
    async afterFindOne(user) {
      if (user && user.external_id) {
        Object.entries(user).map(([k, v]) => {
          if (v === "todefine") {
            user[k] = null;
          }
        });
      }
    },
    async beforeUpdate(param, data) {
      if (param.id) {
        strapi
          .query("user", "users-permissions")
          .findOne({
            id: param.id,
          })
          .then((user) => {
            if (user && !user.accepted && data.accepted) {
              const isPlace = user.type === "place";
              // Send confirmed email
              strapi.plugins["email"].services.email.sendEmail(
                {
                  to: user.email,
                },
                {
                  templateId: isPlace ? "welcome-place" : "welcome-company",
                },
                {
                  user_type: user.type,
                  user_name: user.firstname,
                }
              );
            }
          });
      }
    },
    async afterUpdate(updated, query, data) {
      if (!updated.accepted && updated.confirmed && !data.confirmed) {
        // Send email to administration
        strapi.plugins["email"].services.email.sendEmail(
          {
            to: process.env.EMAIL_RECIPIENT,
          },
          {
            templateId: "admin-user-updated",
          },
          {
            url_btn: `${process.env.BASE_URL}/admin/plugins/content-manager/collectionType/plugins::users-permissions.user/${updated.id}`,
            user_type: updated.type === "place" ? "Le lieu" : "La compagnie",
            user_name: updated.firstname,
          },
          true
        );
      }
    },
  },
};
