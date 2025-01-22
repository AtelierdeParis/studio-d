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
          subject: `Il vous reste ${campaign?.reminder_days} ${campaign?.reminder_days > 1 ? 'jours' : 'jour'
            } pour compléter votre pré-sélection`,
        },
        {
          missing_selections: place_missing_selections,
          reminder_days: `${campaign?.reminder_days} ${campaign?.reminder_days > 1 ? 'jours' : 'jour'
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
          !d?.applications?.some((a) => a.status === 'validated'),
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
        url_btn: `${process.env.FRONT_URL}/api/pdfs/campaign/${campaign.id}`,
      },
      true,
    )
  },
  async sendEspacePreselectionEmail(campaignId) {
    const campaign = await strapi.services.campaign.findOne({ id: campaignId }, ['applications.espace.users_permissions_user', 'applications.company'])
    const today = new Date()

    if (Boolean(campaign?.confirmation_notification_date)) {
      const selectionNotificationDate = new Date(campaign.confirmation_notification_date)

      if (selectionNotificationDate.toDateString() === today.toDateString()) {
        const placesMap = {}

        for (const application of campaign.applications) {
          const espace = application.espace
          const company = application.company
          const disponibility = await strapi.services.disponibility.findOne({ id: application.disponibility })

          const userId = espace.users_permissions_user.id

          if (!placesMap[userId]) {
            placesMap[userId] = {
              id: espace.users_permissions_user.id,
              name: `${espace.users_permissions_user.firstname} ${espace.users_permissions_user.lastname}`,
              structureName: espace.users_permissions_user.structureName,
              address: `${espace.users_permissions_user.address}, ${espace.users_permissions_user.zipCode} ${espace.users_permissions_user.city}`,
              email: espace.users_permissions_user.email,
              phone: espace.users_permissions_user.phone,
              espaces: {}
            }
          }

          if (!placesMap[userId].espaces[espace.id]) {
            placesMap[userId].espaces[espace.id] = {
              name: espace.name,
              disponibilities: []
            }
          }

          placesMap[userId].espaces[espace.id].disponibilities.push({
            company: company.structureName,
            company_id: company.id,
            name: `${company.firstname} ${company.lastname}`,
            phone: company.phone,
            email: company.email,
            address: `${company.address}, ${company.zipCode} ${company.city}`,
            creationTitle: application.creation_title,
            is_validated: application.status === 'validated',
            start: new Date(disponibility.start).toLocaleDateString('fr-FR'),
            end: new Date(disponibility.end).toLocaleDateString('fr-FR'),
          })
        }

        const companiesMap = {}

        Object.values(placesMap).forEach(place => {
          Object.values(place.espaces).forEach(espace => {
            espace.disponibilities.forEach(disponibility => {
              if (!companiesMap[disponibility.company_id]) {
                companiesMap[disponibility.company_id] = {
                  name: disponibility.name,
                  id: disponibility.company_id,
                  company: disponibility.company,
                  phone: disponibility.phone,
                  email: disponibility.email,
                  address: disponibility.address,
                  disponibilities: []
                }
              }

              companiesMap[disponibility.company_id].disponibilities.push({
                place_id: place.id,
                place_name: place.name,
                place_structure_name: place.structureName,
                place_address: place.address,
                place_phone: place.phone,
                contact_email: place.email,
                espace_name: espace.name,
                contact_name: place.name,
                company_id: disponibility.company_id,
                creation_title: disponibility.creationTitle,
                is_validated: disponibility.is_validated,
                start: disponibility.start,
                end: disponibility.end
              })
            })
          })
        })

        const placeIds = Object.keys(placesMap)

        for (const id of placeIds) {
          const place = await placesMap[id]
          const hasDisponibilitiesValidated = Object.values(place.espaces).some(espace => espace.disponibilities.some(d => d.is_validated))

          const companiesIds = []
          let disponibilitiesCount = 0
          Object.values(place.espaces).forEach(espace => {
            espace.disponibilities.forEach(disponibility => {
              if (disponibility.is_validated) {
                companiesIds.push(disponibility.company_id)
              }

              disponibilitiesCount++
            })
          })

          if (hasDisponibilitiesValidated) {
            const companies = Object.values(companiesMap).filter(company => companiesIds.includes(company.id))
            await strapi.plugins['email'].services.email.sendEmail(
              {
                to: [place.email, process.env.EMAIL_RECIPIENT],
              },
              {
                templateId: 'confirmation-preselection-place',
              },
              {
                user_name: place.name,
                campaign_name: campaign.title,
                espaces: Object.values(place.espaces)
                  .filter(espace => espace.disponibilities.some(d => d.is_validated))
                  .map(espace => ({
                    ...espace,
                    disponibilities: espace.disponibilities.filter(d => d.is_validated)
                  })),
                companies: companies,
                multiple_companies: companies.length > 1,
                multiple_disponibilities: disponibilitiesCount > 1,
                user_type: 'place',
              },
            )
          }
        }

        const companiesWithOnlyOneValidated = Object.values(companiesMap).filter(company => company.disponibilities.length === 1 && company.disponibilities[0].is_validated)

        for (const company of companiesWithOnlyOneValidated) {
          const disponibility = company.disponibilities[0]

          await strapi.plugins['email'].services.email.sendEmail(
            {
              to: [company.email],
            }, {
            templateId: 'confirmation-one-preselection-company',
          },
            {
              user_name: company.name,
              campaign_name: campaign.title,
              structure_name: disponibility.place_structure_name,
              structure_contact_name: disponibility.contact_name,
              structure_address: disponibility.place_address,
              structure_phone: disponibility.place_phone,
              structure_contact_email: disponibility.contact_email,
              place_name: disponibility.espace_name,
              start: disponibility.start,
              end: disponibility.end,
              creation_title: disponibility.creation_title,
              user_type: 'company',
            },
          )
        }

        const companiesWithMultipleApplication = Object.values(companiesMap).filter(company => company.disponibilities.length > 1 && company.disponibilities.some(d => d.is_validated))

        for (const company of companiesWithMultipleApplication) {
          const placesIds = [...new Set(company.disponibilities.filter(d => d.is_validated).map(d => d.place_id))]
          const disponibilities = company.disponibilities.filter(d => d.is_validated)
          const places = Object.values(placesMap).filter(place => placesIds.includes(place.id))

          await strapi.plugins['email'].services.email.sendEmail(
            {
              to: [company.email],
            },
            {
              templateId: 'confirmation-preselection-compaign',
            },
            {
              user_name: company.name,
              campaign_name: campaign.title,
              disponibilities,
              places,
              multiple_places: places.length > 1,
              has_multiple_disponibilities: disponibilities.length > 1,
              has_refused_disponibilities: company.disponibilities.some(d => !d.is_validated),
              user_type: 'company',
            },
          )
        }

        const companiesWithAllRefused = Object.values(companiesMap).filter(company => company.disponibilities.every(d => !d.is_validated))

        for (const company of companiesWithAllRefused) {
          await strapi.plugins['email'].services.email.sendEmail(
            {
              to: [company.email],
            }, {
            templateId: 'refusal-preselection-company',
          },
            {
              user_name: company.name,
              campaign_name: campaign.title,
              user_type: 'company',
              multiple_disponibilities: company.disponibilities.length > 1,
            },
          )
        }

        console.log('sendEspacePreselectionEmail - Emails sent', {
          refused: companiesWithAllRefused.length,
          one_validated: companiesWithOnlyOneValidated.length,
          multiple_validated: companiesWithMultipleApplication.length,
        })
      }
    }
  }
}
