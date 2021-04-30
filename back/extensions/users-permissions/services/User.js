"use strict";

const crypto = require("crypto");

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async sendConfirmationEmail(user) {
    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    const settings = await pluginStore
      .get({ key: "email" })
      .then((storeEmail) => storeEmail["email_confirmation"].options);

    const userInfo = sanitizeEntity(user, {
      model: strapi.query("user", "users-permissions").model,
    });

    const confirmationToken = crypto.randomBytes(20).toString("hex");

    await this.edit({ id: user.id }, { confirmationToken });

    await strapi.plugins["email"].services.email.sendEmail(
      {
        to: user.email,
      },
      {
        templateId: 1,
      },
      {
        user_type: userInfo.type,
        user_name: userInfo.firstname,
        url_confirm: `${process.env.FRONT_URL}/email-confirmation`,
        token: confirmationToken,
      }
    );
  },
};
