"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const template = {
  subject: `Nouveau message - Studio D`,
  text: "Nouveau message",
  html: `
    <h1>Bonjour,</h1>
    
    <p>Vous avez reçu un nouveau message de la part de <%= name %> (<%= from %>)</p>
    <p>Contenu du message:</p>
    <p><%= message %></p>
    `,
};

module.exports = {
  create: async (ctx) => {
    const created = await strapi.services.contact.create(ctx.request.body);
    const entity = sanitizeEntity(created, { model: strapi.models.contact });

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_SENDER,
      },
      template,
      {
        message: entity.message,
        name: entity.name,
        from: entity.from
      }
    );

    return entity;
  },
};
