'use strict'
const format = require('date-fns/format')
const fr = require('date-fns/locale/fr')

const locale = {
  locale: fr,
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(created) {
      try {
        const applicationsCount = await strapi.services.application.count({
          company: created.company.id,
          campaign: created.disponibility.campaign,
        })
        const campaign = await strapi.services.campaign.findOne({
          id: created.disponibility.campaign,
        })
        const nb_applications = campaign.applications_max - applicationsCount

        const lieu = await strapi.plugins[
          'users-permissions'
        ].services.user.fetch({
          id: created.espace.users_permissions_user,
        })

        // // Send email to the company
        strapi.plugins['email'].services.email.sendEmail(
          {
            to: created.company.email,
          },
          {
            templateId: 'compagny-application-confirm',
            subject: `Votre candidature a bien été prise en compte`,
          },
          {
            lieu_name: lieu.structureName,
            espace_name: created.espace.name,
            date_start: format(
              new Date(created.disponibility.start),
              'dd/MM',
              locale,
            ),
            date_end: format(
              new Date(created.disponibility.end),
              'dd/MM',
              locale,
            ),
            user_name: created.company.firstname,
            applications_end_date: format(
              new Date(campaign.application_end),
              'dd MMMM yyyy',
              locale,
            ),
            nb_applications,
          },
        )

        // // Send email to the place
        strapi.plugins['email'].services.email.sendEmail(
          {
            to: lieu.email,
          },
          {
            templateId: 'place-application-confirm',
            subject: `Une candidature vient d'être déposée`,
          },
          {
            user_name: lieu.firstname,
            company_name: created.company.structureName,
            espace_name: created.espace.name,
            date_start: format(
              new Date(created.disponibility.start),
              'dd/MM',
              locale,
            ),
            date_end: format(
              new Date(created.disponibility.end),
              'dd/MM',
              locale,
            ),
          },
        )
      } catch (e) {
        console.log('error', e)
      }
    },
    async afterDelete(deleted) {
      try {
        const lieu = await strapi.plugins[
          'users-permissions'
        ].services.user.fetch({
          id: deleted.espace.users_permissions_user,
        })

        // // Send email to the company
        strapi.plugins['email'].services.email.sendEmail(
          {
            to: deleted.company.email,
          },
          {
            templateId: 'compagny-application-cancel',
            subject: `L'annulation de votre candidature a bien été prise en compte`,
          },
          {
            lieu_name: lieu.structureName,
            espace_name: deleted.espace.name,
            date_start: format(
              new Date(deleted.disponibility.start),
              'dd/MM',
              locale,
            ),
            date_end: format(
              new Date(deleted.disponibility.end),
              'dd/MM',
              locale,
            ),
            user_name: deleted.company.firstname,
          },
        )

        // // Send email to the place
        strapi.plugins['email'].services.email.sendEmail(
          {
            to: lieu.email,
          },
          {
            templateId: 'place-application-cancel',
            subject: `Une candidature vient d'être annulée`,
          },
          {
            user_name: lieu.firstname,
            company_name: deleted.company.structureName,
            espace_name: deleted.espace.name,
            date_start: format(
              new Date(deleted.disponibility.start),
              'dd/MM',
              locale,
            ),
            date_end: format(
              new Date(deleted.disponibility.end),
              'dd/MM',
              locale,
            ),
          },
        )
      } catch (e) {
        console.log('error', e)
      }
    },
  },
}
