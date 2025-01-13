'use strict';
const removeMd = require('remove-markdown')
const showdown = require('showdown');
const CryptoJS = require('crypto-js');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = {
    async sendActualityEmails(actuality, emails) {
        const date = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
        const image = await strapi.query('file', 'upload').findOne({ id: actuality.image });
        const converter = new showdown.Converter();

        for (const email of emails) {
            if (validateEmail(email)) {
                const token = CryptoJS.AES.encrypt(
                    email,
                    process.env.HASH_EMAIL_NOTIFICATION,
                ).toString()

                await strapi.plugins['email'].services.email.sendEmail(
                    {
                        to: email,
                    },
                    {
                        templateId: 'actuality-notification',
                        subject: actuality.notification_email_subject,
                    },
                    {
                        actuality_title: actuality.title,
                        actuality_date: date,
                        actuality_image: image.formats.medium.url,
                        actuality_description: removeMd(actuality.content).split(' ').slice(0, 35).join(' ') + '...',
                        actuality_link: `${process.env.FRONT_URL}/actualites/${actuality.slug}`,
                        notification_link: `${process.env.FRONT_URL}/notifications?token=${encodeURIComponent(token)}`,
                        email_message: actuality.notification_email_message ? converter.makeHtml(actuality.notification_email_message).replace(/\n/g, '<br/>') : null,
                        user_type: "actuality",
                    }
                )
            }
        }
    },
};
