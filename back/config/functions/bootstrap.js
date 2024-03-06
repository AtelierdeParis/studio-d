'use strict'
const Bugsnag = require('@bugsnag/js')
const BugsnagPluginKoa = require('@bugsnag/plugin-koa')
const cron = require('node-cron')

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const everyNightAt2AM = '0 2 * * *'
const testCron = '*/15 * * * * *'
const cronSchedule = process.env.CRON_SCHEDULE || everyNightAt2AM

const isBugsnagEnabled =
  process.env.NODE_ENV !== 'development' && !process.env.CI

module.exports = () => {
  if (false) {
    Bugsnag.start({
      apiKey: process.env.BUGSNAG_API_KEY,
      plugins: [BugsnagPluginKoa],
    })
  }

  // Every night check for campaigns emails to send
  cron.schedule(cronSchedule, async () => {
    const activeCampaigns = await strapi.services.campaign.find({
      is_active: true,
    })

    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    activeCampaigns.map(async (campaign) => {
      // APPLICATIONS END
      if (campaign?.application_end) {
        if (
          new Date(campaign.application_end).toDateString() ===
          yesterday.toDateString()
        ) {
          Promise.all(
            campaign.users_permissions_users.map(async (user) => {
              await strapi.services.campaign.sendApplicationEndEmail(
                campaign,
                user,
              )
            }),
          )
        }
      }

      // PRESLECTIONS REMINDER
      if (Boolean(campaign?.preselection_end && campaign?.reminder_days)) {
        const preselectionsReminderDate = new Date(campaign.preselection_end)
        preselectionsReminderDate.setDate(
          preselectionsReminderDate.getDate() - campaign?.reminder_days,
        )

        if (preselectionsReminderDate.toDateString() === today.toDateString()) {
          Promise.all(
            campaign.users_permissions_users.map(async (user) => {
              await strapi.services.campaign.sendPreselectionReminder(
                campaign,
                user,
              )
            }),
          )
        }
      }

      // PRESELECTIONS END
      if (Boolean(campaign?.preselection_end)) {
        const preselectionsEndDate = new Date(campaign.preselection_end)

        if (preselectionsEndDate.toDateString() === yesterday.toDateString()) {
          await strapi.services.campaign.sednAdminPreselectionsEmail(campaign)

          Promise.all(
            campaign.users_permissions_users.map(async (user) => {
              await strapi.services.campaign.sendPreselectionsEnd(
                campaign,
                user,
              )
            }),
          )
        }
      }
    })
  })
}
