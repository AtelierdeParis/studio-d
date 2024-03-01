'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      // Campaign has a relationship with applications and disponibilities but shouldn't update those to avoid data loss on admin update
      const currentCampaignState = await strapi.services.campaign.findOne(
        params,
      )
      if (currentCampaignState) {
        data.applications = currentCampaignState.applications
        data.disponibilities = currentCampaignState.disponibilities
      }
    },
  },
}
