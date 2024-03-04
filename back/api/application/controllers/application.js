'use strict'
const ApplicationPdf = require('./ApplicationPdf')
const ReactPDF = require('@react-pdf/renderer')
const React = require('react')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myApplications(ctx) {
    const populateCommon = [
      'disponibility.espace',
      'disponibility.espace.users_permissions_user',
      'creation_file',
    ]
    const { id, type } = ctx.state.user
    const { query: initialQuery } = ctx.request
    const query =
      type === 'place'
        ? {
            ...initialQuery,
            'disponibility.espace.users_permissions_user.id': id,
          }
        : { ...initialQuery, company: id }
    const populate =
      type === 'place'
        ? [...populateCommon, 'company']
        : [...populateCommon, 'place']

    return strapi
      .query('application')
      .find(query, populate)
      .then((res) => {
        return Promise.all(
          res.map(async (application) => {
            return {
              ...application,
              notifications: await strapi.services.message.getNbNotifications({
                id,
                type,
                applicationId: application.id,
              }),
            }
          }),
        )
      })
  },
  async generatePdf(ctx) {
    const { id } = ctx.params

    // Fetch the application data from a Strapi service
    const applicationData = await strapi.services.application.findOne({ id })

    const pdfStream = await ReactPDF.renderToStream(
      React.createElement(ApplicationPdf, { applicationData: applicationData }),
    )
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = []
      pdfStream.on('data', (chunk) => {
        return chunks.push(chunk)
      })
      pdfStream.on('end', () => resolve(Buffer.concat(chunks)))
      pdfStream.on('error', reject)
    })

    ctx.set('Content-Type', 'application/pdf')
    ctx.body = pdfBuffer
  },
}
