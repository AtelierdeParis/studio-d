// @ts-nocheck
import { renderToStream } from '@react-pdf/renderer'
import AdmZip from 'adm-zip'
import ExcelJS from 'exceljs'
import { getSession } from 'next-auth/client'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { Application, Espace, UsersPermissionsUser } from '~typings/api'
import { format } from '~utils/date'
import { formatCampaignZipName, getBufferFromStream } from '~utils/pdf'

const generateColor = () => {
  const randomComponent = () =>
    Math.floor(Math.random() * 128 + 128)
      .toString(16)
      .padStart(2, '0')

  const alpha = '80'
  const red = randomComponent()
  const green = randomComponent()
  const blue = randomComponent()

  return `${alpha}${red}${green}${blue}`.toUpperCase()
}

const buildApplicationsSpreadsheet = async (applications: Application[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Détail cie')

  const headers = [
    'Création en cours',
    'Chorégraphe',
    'Mail',
    'Genre',
    `Nbre d'interprètes`,
    'Partenaires/coprod',
    'Besoin technique',
    'Compagnie',
    'Localisation administrative de la cie',
    'Nbre de créations',
    'Site web',
    'Espace - Candidature',
    'Créneau - Candidature',
  ]

  const headerRow = worksheet.addRow(headers)

  headerRow.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = {
      vertical: 'top',
      horizontal: 'left',
      wrapText: true,
    }
  })

  headers.forEach((_, index) => {
    worksheet.getColumn(index + 1).width = 30
  })

  applications.forEach((application) => {
    const row = worksheet.addRow([
      application.creation_title,
      application.company.choreographer,
      application.company.email,
      '',
      `${application.creation_dancers}`,
      application.creation_partnerships,
      application.creation_techical_requirements,
      application.company.structureName,
      application.company.city,
      '',
      application.company.website,
      `${
        application.disponibility.espace.users_permissions_user.structureName // @ts-ignore
      } - ${application.espace.name}`,
      `${new Date(application.disponibility.start).getDate()} - ${new Date(
        application.disponibility.end,
      ).getDate()} ${new Date(
        application.disponibility.end,
      ).toLocaleString('fr-FR', { month: 'long' })}`,
    ])

    row.eachCell((cell) => {
      cell.alignment = {
        vertical: 'top',
        horizontal: 'left',
        wrapText: true,
      }
    })

    const websiteCell = row.getCell(11)

    if (application.company.website) {
      websiteCell.value = {
        text: application.company.website,
        hyperlink: application.company.website,
      }
      websiteCell.font = { color: { argb: 'FF0000FF' }, underline: true }
    }

    websiteCell.alignment = { vertical: 'top', horizontal: 'left' }
  })

  return await workbook.xlsx.writeBuffer()
}

const buildSummarySpreadsheet = async (applications: Application[]) => {
  const placesMap = {}
  const colorsMap = {}
  const applicationsCounter = {}

  for (const application of applications) {
    if (applicationsCounter[application.creation_title]) {
      applicationsCounter[application.creation_title]++
    } else {
      applicationsCounter[application.creation_title] = 1
    }
  }

  for (const application of applications) {
    const place = application.disponibility.espace // @ts-ignore
      .users_permissions_user as UsersPermissionsUser

    // @ts-ignore
    const espace = application.disponibility.espace as Espace

    if (!colorsMap[application.creation_title]) {
      colorsMap[application.creation_title] = generateColor()
    }

    if (!placesMap[place.id]) {
      placesMap[place.id] = {
        id: place.id,
        structureName: place.structureName,
        espaces: {},
      }
    }

    if (!placesMap[place.id].espaces[espace.id]) {
      placesMap[place.id].espaces[espace.id] = {
        name: espace.name,
        disponibilities: {},
      }
    }

    if (
      !placesMap[place.id].espaces[espace.id].disponibilities[
        application.disponibility.id
      ]
    ) {
      placesMap[place.id].espaces[espace.id].disponibilities[
        application.disponibility.id
      ] = {
        range: `${new Date(
          application.disponibility.start,
        ).getDate()} - ${new Date(
          application.disponibility.end,
        ).getDate()} ${new Date(
          application.disponibility.end,
        ).toLocaleString('fr-FR', { month: 'long' })}`,
        applications: [
          {
            id: application.id,
            title: application.creation_title,
            name: `${application.creation_title} - ${application.company.choreographer} (${application.company.structureName})`,
            email: application.company.email,
            color: colorsMap[application.creation_title],
          },
        ],
      }
    } else {
      placesMap[place.id].espaces[espace.id].disponibilities[
        application.disponibility.id
      ].applications.push({
        id: application.id,
        title: application.creation_title,
        name: `${application.creation_title} - ${application.company.choreographer} (${application.company.structureName})`,
        email: application.company.email,
        color: colorsMap[application.creation_title],
      })
    }
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Suivi sélection')

  const headers = [
    'Lieux',
    `Nom de l'espace`,
    `Créneaux proposés`,
    `Sélection finale`,
    `Communication`,
    `Contact`,
  ]

  const headerRow = worksheet.addRow(headers)
  headerRow.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true }
  })

  headers.forEach((_, index) => {
    worksheet.getColumn(index + 1).width = 30
  })

  Object.values(placesMap).forEach((place) => {
    let startRowPlace = worksheet.rowCount + 1
    let startRowEspace = worksheet.rowCount + 1
    let startRowDisponibility = worksheet.rowCount + 1

    let previousPlace = null
    let previousEspace = null
    let previousDisponibility = null

    Object.values(place.espaces).forEach((espace) => {
      Object.values(espace.disponibilities).forEach((disponibility) => {
        Object.values(disponibility.applications).forEach((application) => {
          const row = worksheet.addRow([
            place.structureName,
            espace.name,
            disponibility.range,
            application.name,
            '',
            application.email,
          ])

          const applicationCell = row.getCell(4)

          applicationCell.value = {
            text: application.name,
            hyperlink: `${process.env.NEXT_PUBLIC_BACK_URL}/admin/plugins/content-manager/collectionType/application::application.application/${application.id}`,
          }

          applicationCell.font = {
            underline: true,
            italic: true,
          }

          if (applicationsCounter[application.title] > 1) {
            applicationCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: application.color },
            }
          }

          applicationCell.alignment = {
            vertical: 'top',
            horizontal: 'left',
            wrapText: true,
          }

          if (previousPlace === place.structureName) {
            worksheet.mergeCells(`A${startRowPlace}:A${worksheet.rowCount}`)
          } else {
            startRowPlace = worksheet.rowCount
          }

          if (previousEspace === espace.name) {
            worksheet.mergeCells(`B${startRowEspace}:B${worksheet.rowCount}`)
          } else {
            startRowEspace = worksheet.rowCount
          }

          if (previousDisponibility === disponibility.range) {
            worksheet.mergeCells(
              `C${startRowDisponibility}:C${worksheet.rowCount}`,
            )
          } else {
            startRowDisponibility = worksheet.rowCount
          }

          previousPlace = place.structureName
          previousEspace = espace.name
          previousDisponibility = disponibility.range
        })
      })
    })
  })

  return await workbook.xlsx.writeBuffer()
}

const SelectedCampaignApplications = async (req, res) => {
  const { id: campaignId, all } = req.query
  const session = await getSession({ req })
  const allApplications = all === 'true'

  // If the session is not defined, refuse access
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const zip = new AdmZip()
  const { data: campaign } = await client.campaigns.campaignsDetail(campaignId)

  try {
    const {
      data: applications,
    } = await client.applications.getApplicationsByCampaign(campaignId, {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    })

    const filteredApplications = allApplications
      ? applications
      : applications.filter((application) => application.status === 'validated')

    // Group by place
    const groupedApplications = filteredApplications.reduce(
      (grouped, application) => {
        //@ts-expect-error
        const user = application.disponibility.espace.users_permissions_user

        if (!grouped[user?.id]) {
          grouped[user?.id] = []
        }

        grouped[user?.id].push(application)

        return grouped
      },
      {},
    )

    // Group by espace AND disponibility
    for (const userId in groupedApplications) {
      groupedApplications[userId].sort((a, b) => {
        const aId = a.disponibility?.id || 0
        const bId = b.disponibility?.id || 0

        return aId - bId
      })
    }

    const userIds = Object.keys(groupedApplications)

    for (const userId of userIds) {
      const applications = groupedApplications[userId]

      const place =
        applications[0]?.disponibility?.espace?.users_permissions_user
      const name = place?.structureName

      for (const application of applications) {
        const structureName = application.company?.structureName

        const stream = await renderToStream(
          <ApplicationDocument application={application} />,
        )

        const refLabel = `Ref. ${application.id}`

        const disponibilityLabel = `${format(
          application.disponibility?.start,
          'dd-MM',
        )} au ${format(application.disponibility?.end, 'dd-MM')}`

        const subFolder = `${application?.espace?.name} - ${disponibilityLabel} - ${refLabel} - ${structureName}`

        const streamBuffer = await getBufferFromStream(stream)
        await zip.addFile(
          `${name}/${subFolder}/${refLabel} - Candidature.pdf`,
          streamBuffer,
        )

        if (application?.creation_file?.[0]?.url) {
          const creationFile = await fetch(application?.creation_file?.[0]?.url)
          // @ts-ignore
          const creationFileArrayBuffer = await creationFile.buffer()

          await zip.addFile(
            `${name}/${subFolder}/${refLabel} - Dossier artistique.pdf`,
            creationFileArrayBuffer,
          )
        }
      }
    }

    const applicationsSpreadsheetBuffer = await buildApplicationsSpreadsheet(
      applications,
    )

    const summarySpreadsheetBuffer = await buildSummarySpreadsheet(
      filteredApplications,
    )

    await zip.addFile(`candidatures.xlsx`, applicationsSpreadsheetBuffer)
    await zip.addFile(
      `recap-${all ? 'complet' : 'preselection'}.xlsx`,
      summarySpreadsheetBuffer,
    )
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching applications.' })
    return
  }

  const zipBuffer = zip.toBuffer()

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + formatCampaignZipName(campaign),
  )
  res.send(zipBuffer)
}

export default SelectedCampaignApplications
