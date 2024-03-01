'use strict'
const isAfter = require('date-fns/isAfter')
const max = require('date-fns/max')
const format = require('date-fns/format')
const fr = require('date-fns/locale/fr')

const locale = {
  locale: fr,
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const params = [
  'dispositif',
  'dispositif.companies',
  'dispositif.users_permissions_users',
]

module.exports = {
  async find(ctx) {
    const entities = ctx.query._q
      ? await strapi.services.disponibility.search(ctx.query, params)
      : await strapi.services.disponibility.find(ctx.query, params)

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.disponibility }),
    )
  },

  createMany: async (ctx) => {
    const user = ctx.state.user
    if (!Array.isArray(ctx.request.body))
      return ctx.badRequest(
        null,
        formatError({
          id: 'error.arrayProvide',
          message: 'You must provide an array',
        }),
      )

    const newDispo = await Promise.all(
      ctx.request.body.map((dispo) =>
        strapi.query('disponibility').create(dispo),
      ),
    )

    const maxDate = max(newDispo.map((dispo) => new Date(dispo.end)))
    const place = newDispo[0].espace

    if (!place.filledUntil || isAfter(maxDate, new Date(place.filledUntil))) {
      const data = newDispo?.campaign ? {} : { filledUntil: maxDate }
      if (!place.filledUntil) {
        data['published'] = true
      }
      strapi
        .query('espace')
        .update({ id: place.id }, data)
        .then(() => {
          if (!place.filledUntil) {
            // Send email to administration
            strapi.plugins['email'].services.email.sendEmail(
              {
                to: process.env.EMAIL_RECIPIENT,
              },
              {
                templateId: 'admin-new-place',
              },
              {
                user_type: user.type,
                user_name: user.firstname,
                slug: place.slug,
                url_strapi: `${process.env.BASE_URL}/admin/plugins/content-manager/collectionType/application::espace.espace/${place.id}`,
              },
              true,
            )
          }
        })
    }

    return newDispo
  },
  async campaignConfirm(ctx) {
    const { id, campaignId } = ctx.params

    const disponibility = await strapi.services.disponibility.findOne({ id }, [
      'applications',
      'espace.users_permissions_user',
    ])

    if (!disponibility) {
      return ctx.throw(404, 'Disponibility not found')
    }

    const updatedApplications = disponibility.applications
      .filter((application) => {
        return (
          application.campaign.toString() === campaignId.toString() &&
          application.status === 'preselected'
        )
      })
      .map((application) => {
        return { ...application, status: 'confirmed' }
      })

    await Promise.all(
      updatedApplications.map(async (updatedApplication) => {
        await strapi.services.application.update(
          { id: updatedApplication?.id },
          updatedApplication,
        )
      }),
    )

    try {
      const lieu = disponibility.espace.users_permissions_user

      const campaign = await strapi.services.campaign.findOne({
        id: disponibility.campaign,
      })
      // // Send email to the place
      strapi.plugins['email'].services.email.sendEmail(
        {
          to: lieu.email,
        },
        {
          templateId: 'place-preselection-confirm',
          subject: `Votre pré-selection a été prise en compte`,
        },
        {
          user_name: lieu.firstname,
          campaign_name: campaign?.name,
          espace_name: disponibility.espace.name,
          date_start: format(new Date(disponibility.start), 'dd/MM', locale),
          date_end: format(new Date(disponibility.end), 'dd/MM', locale),
        },
      )
    } catch (e) {
      console.log('error', e)
    }
    return { ...disponibility, applications: updatedApplications }
  },
}
