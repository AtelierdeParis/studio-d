// @ts-nocheck
import { renderToStream } from '@react-pdf/renderer'
import AdmZip from 'adm-zip'
import crypto from 'crypto'
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

const getApplicationLink = (applicationId: string) => {
  return `${process.env.NEXT_PUBLIC_BACK_URL}/admin/plugins/content-manager/collectionType/application::application.application/${applicationId}`
}

const getCheckSum = (application: Application) => {
  const shasum = crypto.createHash('sha1')
  shasum.update(
    [
      application.creation_title,
      application.company.choreographer,
      application.company.email,
      application.creation_dancers,
      application.creation_partnerships,
      application.creation_techical_requirements,
      application.company.structureName,
      application.company.city,
      application.company.website,
    ].join('|'),
  )

  const checksum = shasum.digest('hex')

  return checksum
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

  let currentChecksum = null
  let checksumStartRow = 2 // First data row (after header)

  applications.forEach((application, index) => {
    const checkSum = getCheckSum(application)

    const range = application.disponibility
      ? `${new Date(application.disponibility.start).getDate()} - ${new Date(
          application.disponibility.end,
        ).getDate()} ${new Date(
          application.disponibility.end,
        ).toLocaleString('fr-FR', { month: 'long' })}`
      : '-'

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
      application.disponibility?.espace?.users_permissions_user
        ? `${application.disponibility.espace.users_permissions_user.structureName} - ${application.espace.name}`
        : '-',
      range,
    ])

    row.eachCell((cell) => {
      cell.alignment = {
        vertical: 'top',
        horizontal: 'left',
        wrapText: true,
      }
    })

    const applicationCell = row.getCell(13)

    applicationCell.value = {
      text: range,
      hyperlink: getApplicationLink(application.id),
    }

    const websiteCell = row.getCell(11)

    if (application.company.website) {
      websiteCell.value = {
        text: application.company.website,
        hyperlink: application.company.website,
      }
      websiteCell.font = { color: { argb: 'FF0000FF' }, underline: true }
    }

    websiteCell.alignment = { vertical: 'top', horizontal: 'left' }

    if (currentChecksum && currentChecksum !== checkSum) {
      if (checksumStartRow < index + 1) {
        for (let col = 1; col <= 11; col++) {
          worksheet.mergeCells(checksumStartRow, col, index + 1, col)
        }
      }
      checksumStartRow = index + 2
    }

    currentChecksum = checkSum
  })

  if (checksumStartRow < applications.length + 1) {
    for (let col = 1; col <= 11; col++) {
      worksheet.mergeCells(checksumStartRow, col, applications.length + 1, col)
    }
  }

  return await workbook.xlsx.writeBuffer()
}

const buildSummarySpreadsheet = async (
  applications: Application[],
  withAllApplications: boolean,
) => {
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
    // Skip applications without disponibility or espace
    if (!application.disponibility?.espace?.users_permissions_user) {
      continue
    }

    const place = application.disponibility.espace
      .users_permissions_user as UsersPermissionsUser
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
            status: application.status,
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
        status: application.status,
      })
    }
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Suivi sélection')

  const headers = [
    'Lieux',
    `Nom de l'espace`,
    `Créneaux proposés`,
    withAllApplications ? `Candidatures` : `Sélection finale`,
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

  let placeRowPosition = 2
  let espaceRowPosition = 2
  let disponibilityRowPosition = 2

  let placesCount = 0
  let espaceCount = 0
  let disponibilityCount = 0

  Object.values(placesMap).forEach((place) => {
    Object.values(place.espaces).forEach((espace) => {
      Object.values(espace.disponibilities).forEach((disponibility) => {
        Object.values(disponibility.applications).forEach((application) => {
          placesCount++
          espaceCount++
          disponibilityCount++

          const row = worksheet.addRow([
            place.structureName,
            espace.name,
            disponibility.range,
            application.name,
            '',
            application.email,
          ])

          const applicationCell = row.getCell(4)

          if (application.status === 'validated') {
            row.eachCell((cell) => {
              cell.font = { bold: true }
            })
          }

          applicationCell.value = {
            text: application.name,
            hyperlink: getApplicationLink(application.id),
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
        })

        if (disponibilityCount > 1) {
          worksheet.mergeCells(
            `C${disponibilityRowPosition}:C${
              disponibilityRowPosition + (disponibilityCount - 1)
            }`,
          )
        }

        disponibilityRowPosition = disponibilityRowPosition + disponibilityCount
        disponibilityCount = 0
      })

      if (espaceCount > 1) {
        worksheet.mergeCells(
          `B${espaceRowPosition}:B${espaceRowPosition + (espaceCount - 1)}`,
        )
      }

      espaceRowPosition = espaceRowPosition + espaceCount
      espaceCount = 0
    })

    if (placesCount > 1) {
      worksheet.mergeCells(
        `A${placeRowPosition}:A${placeRowPosition + (placesCount - 1)}`,
      )
    }

    placeRowPosition = placeRowPosition + placesCount
    placesCount = 0
  })

  return await workbook.xlsx.writeBuffer()
}

const SelectedCampaignApplications = async (req, res) => {
  const { id: campaignId, all } = req.query
  const session = await getSession({ req })
  const withAllApplications = all === 'true'

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

    const filteredApplications = withAllApplications
      ? applications
      : applications.filter(
          (application) =>
            application.status === 'confirmed' ||
            application.status === 'validated',
        )

    // Group by place
    const groupedApplications = filteredApplications.reduce(
      (grouped, application) => {
        if (!application.disponibility?.espace?.users_permissions_user?.id) {
          return grouped
        }

        const userId =
          application.disponibility.espace.users_permissions_user.id

        if (!grouped[userId]) {
          grouped[userId] = []
        }

        grouped[userId].push(application)
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
      withAllApplications,
    )

    await zip.addFile(
      `${campaign?.title} candidatures.xlsx`,
      applicationsSpreadsheetBuffer,
    )
    await zip.addFile(
      `${campaign?.title} récap ${all ? 'complet' : 'présélection'}.xlsx`,
      summarySpreadsheetBuffer,
    )
  } catch (error) {
    console.error(error)
    res
      .status(401)
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
