'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async sendEspacePreselectionEmail(ctx) {
        const campaign = await strapi.services.campaign.findOne({ id: ctx.params.id })
        await strapi.services.campaign.sendEspacePreselectionEmail(campaign.id)

        return ctx.send({ success: true })
    }
};
