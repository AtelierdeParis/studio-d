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
    
    <p>Vous avez reçu un nouveau message de la part de <%= name %></p>
    <p>Contenu du message:</p>
    <p><%= message %></p>
    `,
};

module.exports = {
  create: async (ctx) => {
    const created = await strapi.services.message.create(ctx.request.body);
    const entity = sanitizeEntity(created, { model: strapi.models.message });

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: "gesnault@premieroctet.com",
        from: entity.from,
      },
      template,
      {
        message: entity.message,
        name: entity.name,
      }
    );

    return entity;
  },
};