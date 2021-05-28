const strapiLib = import("strapi");

const start = async () => {
  const instance = await strapiLib;
  await instance
    .default()
    .load()
    .then(async (strapi) => {
      await strapi
        .query("user", "users-permissions")
        .find({ external_id_null: false, type: "company" })
        .then((users) => {
          if (users.length === 0) {
            console.log("No user found");
            return null;
          }

          users.map((user) => {
            if (!user.resetPasswordToken) {
              console.log("No token for user", user);
              return;
            }
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: user.email,
              },
              {
                templateId: "migration-company",
              },
              {
                url_site: `https://studio-d-lafs6.ondigitalocean.app/reinitialisation-mot-de-passe?code=${user.resetPasswordToken}&ismigration=true`,
              }
            );
          });
        })
        .catch((err) => console.log(err));
    });
};

start();
