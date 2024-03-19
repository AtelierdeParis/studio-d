'use strict'
const format = require('date-fns/format')
const fr = require('date-fns/locale/fr')

const locale = {
  locale: fr,
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async sendApplicationEndEmail(campaign, place) {
    // // Send email to the place when application time is over
    await strapi.plugins['email'].services.email.sendEmail(
      {
        to: place.email,
      },
      {
        templateId: 'place-application-end',
        subject: `La période de candidature est terminée`,
      },
      {
        date_end: format(
          new Date(campaign.preselection_end),
          'dd/MM/yyyy',
          locale,
        ),
        url_btn: `${process.env.FRONT_URL}/compte/candidatures?campaign=${campaign.id}`,
      },
    )
  },
  async sendPreselectionReminder(campaign, place) {
    // // Send reminder to the place when preselection time is nearly over AND place has missing selections
    const place_missing_selections =
      await strapi.services.campaign.getPlaceMissingSelections(place, campaign)

    if (place_missing_selections && place_missing_selections?.length > 0) {
      await strapi.plugins['email'].services.email.sendEmail(
        {
          to: place.email,
        },
        {
          templateId: 'place-preselections-reminder',
          subject: `Il vous reste ${campaign?.reminder_days} ${
            campaign?.reminder_days > 1 ? 'jours' : 'jour'
          } pour compléter votre pré-sélection`,
        },
        {
          missing_selections: place_missing_selections,
          reminder_days: `${campaign?.reminder_days} ${
            campaign?.reminder_days > 1 ? 'jours' : 'jour'
          }`,
          url_btn: `${process.env.FRONT_URL}/compte/candidatures?campaign=${campaign.id}`,
        },
      )
    }
  },
  async sendPreselectionsEnd(campaign, place) {
    //  Send reminder to the place when preselection time is over AND place has missing selections
    const place_missing_selections =
      await strapi.services.campaign.getPlaceMissingSelections(place, campaign)

    if (place_missing_selections) {
      if (place_missing_selections?.length > 0) {
        await strapi.plugins['email'].services.email.sendEmail(
          {
            to: place.email,
          },
          {
            templateId: 'place-preselections-end',
            subject: `La date limite de pré-sélection a été atteinte`,
          },
          {
            missing_selections: place_missing_selections,
          },
        )
      } else {
        await strapi.plugins['email'].services.email.sendEmail(
          {
            to: place.email,
          },
          {
            templateId: 'place-preselections-end-ok',
            subject: `La période de candidature est terminée`,
          },
          {
            missing_selections: place_missing_selections,
          },
        )
      }
    }
  },
  async getPlaceMissingSelections(place, campaign) {
    const place_campaign_disponibilities =
      await strapi.services.disponibility.find(
        {
          'espace.users_permissions_user': place.id,
          'espace.published': true,
          campaign: campaign.id,
        },
        ['applications', 'espace'],
      )
    // If place is campaign participan but has 0 disponibilities don't include it in mailing campaigin
    if (!place_campaign_disponibilities?.length) return null

    const place_missing_selections = place_campaign_disponibilities
      .filter(
        (d) =>
          d?.applications?.length &&
          !d?.applications?.some((a) => a.status === 'confirmed'),
      )
      .map((disponibility) => ({
        espace_name: disponibility?.espace?.name,
        date_start: format(
          new Date(disponibility?.start),
          'dd/MM/yyyy',
          locale,
        ),
        date_end: format(new Date(disponibility?.end), 'dd/MM/yyyy', locale),
      }))
    return place_missing_selections
  },
  async sendAdminPreselectionsEmail(campaign) {
    // Send email to administration
    strapi.plugins['email'].services.email.sendEmail(
      {
        to: process.env.EMAIL_RECIPIENT,
      },
      {
        templateId: 'admin-campaign-end',
      },
      {
        campaing_title: campaign.title,
        url_btn: `${process.env.FRONT_URL}/api/pdfs/selected/${campaign.id}`,
      },
      true,
    )
  },
}
