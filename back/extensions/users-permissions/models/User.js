"use strict";

module.exports = {
  lifecycles: {
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
                  templateId: isPlace ? 6 : 3,
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
    async afterUpdate(updated) {
      if (!updated.accepted) {
        // Send email to administration
        strapi.plugins["email"].services.email.sendEmail(
          {
            to: process.env.EMAIL_RECIPIENT,
          },
          {
            templateId: 16,
          },
          {
            user_type: updated.type === "place" ? "Le lieu" : "La compagnie",
            user_name: updated.firstname,
          },
          true
        );
      }
    },
  },
};
