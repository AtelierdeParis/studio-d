// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { getSession } from 'next-auth/client'
import PDFMerger from 'pdf-merger-js'
import { formatCampaignPdfName, getBufferFromStream } from '~utils/pdf'
import DividerPage from '~components/pdfs/DividerPage'

const SelectedCampaignApplications = async (req, res) => {
  const { id: campaignId } = req.query
  const session = await getSession({ req })

  // If the session is not defined, refuse access
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  let finalPDF
  const { data: campaign } = await client.campaigns.campaignsDetail(campaignId)

  try {
    const {
      data: selectedApplications,
    } = await client.applications.getConfirmedApplicationsByCampaign(
      campaignId,

      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    )

    // Group by place
    const groupedApplications = selectedApplications.reduce(
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

    const merger = new PDFMerger()

    const userIds = Object.keys(groupedApplications)

    for (const userId of userIds) {
      const applications = groupedApplications[userId]
      const place =
        applications[0]?.disponibility?.espace?.users_permissions_user

      const dividerStream = await renderToStream(
        <DividerPage place={place} campaign={campaign} />,
      )
      const dividerStreamBufffer = await getBufferFromStream(dividerStream)
      await merger.add(dividerStreamBufffer)

      for (const application of applications) {
        const stream = await renderToStream(
          <ApplicationDocument application={application} />,
        )
        const streamBuffer = await getBufferFromStream(stream)
        await merger.add(streamBuffer)

        if (application?.creation_file?.[0]?.url) {
          const creationFile = await fetch(application?.creation_file?.[0]?.url)
          const creationFileArrayBuffer = await creationFile.arrayBuffer()

          await merger.add(creationFileArrayBuffer)
        }
      }
    }

    finalPDF = await merger.saveAsBuffer()
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching applications.' })
    return
  }

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + formatCampaignPdfName(campaign),
  )
  res.send(finalPDF)
}

export default SelectedCampaignApplications
