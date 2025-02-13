"use strict";

const signature = `L'équipe de StudioD<br/><a href="${process.env.FRONT_URL}">studiod-danse.fr</a>`;
const signatureAdmin = `Bonne journée`;

const getFooter = (type) => {
  if (type === "actuality") {
    return `Vous recevez cet email car vous êtes inscrit·e aux actualités de <a href="${process.env.FRONT_URL
      }">studiod-danse.fr</a>.`;
  }

  return `Vous recevez cet email car vous êtes inscrit·e en tant que ${type === "place" ? "lieu" : "compagnie"
    } sur la plateforme <a href="${process.env.FRONT_URL
    }">studiod-danse.fr</a>. En cas de souci, n'hésitez pas à <a href="${process.env.FRONT_URL
    }/contact">nous contacter</a>`;
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

  if (!entity) {
    return console.log("Template not found", "id", template.templateId);
  }

  const emailsDebug = process.env.EMAIL_TEST ? ' - Original emails : ' + options.to : '';

  await strapi.plugins["email-designer"].services.email
    .sendTemplatedEmail(
      { ...options, to: process.env.EMAIL_TEST ? process.env.EMAIL_TEST.split(',') : options.to },
      {
        ...template,
        templateId: entity.id,
      },
      {
        signature: isAdmin ? signatureAdmin : signature,
        footer: data.user_type ? getFooter(data.user_type) + emailsDebug : emailsDebug,
        url_site: process.env.FRONT_URL,
        ...data,
      }
    )
    .then((res) => {
      console.log(
        `Email with id ${template.templateId} has been sent successfully`,
        options.to,
        res
      );
    })
    .catch((err) => {
      console.log(
        `Error trying to send email with id ${template.templateId}`,
        err
      );
    });
};

module.exports = {
  sendEmail,
};
