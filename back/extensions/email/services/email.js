"use strict";

const signature = `L'équipe de StudioD<br/><a href="${process.env.FRONT_URL}">studiod-danse.fr</a>`;

const signatureAdmin = `Bonne journée`;

const getFooter = (type) => {
  return `Vous recevez cet email car vous êtes inscrit•e en tant que ${
    type === "place" ? "lieu" : "compagnie"
  } sur la plateforme <a href="${
    process.env.FRONT_URL
  }">studiod-danse.fr</a>. Explication de qui contacter en cas d’erreur, etc...`;
};

const sendEmail = async (
  options = {},
  template = {},
  data = {},
  isAdmin = false
) => {
  if (!template.templateId) {
    console.log("No template id given");
    return;
  }

  const entity = await strapi.plugins["email-designer"].services.template.fetch(
    {
      slug: template.templateId,
    }
  );

  if (!entity)
    return console.log("Template not found", "id", template.templateId);

  await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
    options,
    {
      ...template,
      templateId: entity.id,
    },
    {
      signature: isAdmin ? signatureAdmin : signature,
      footer: data.user_type ? getFooter(data.user_type) : "",
      url_site: process.env.FRONT_URL,
      ...data,
    }
  );
};

module.exports = {
  sendEmail,
};
