// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { getSession } from 'next-auth/client'
import { formatCampaignZipName, getBufferFromStream } from '~utils/pdf'
import AdmZip  from "adm-zip"

const SelectedCampaignApplications = async (req, res) => {
  const { id: campaignId } = req.query
  const session = await getSession({ req })

  // If the session is not defined, refuse access
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const zip = new AdmZip();
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

    const userIds = Object.keys(groupedApplications)

    for (const userId of userIds) {
      const applications = groupedApplications[userId]
      const place =
        applications[0]?.disponibility?.espace?.users_permissions_user
      const name =  place?.structureName
      
      
      for (const application of applications) {
        const stream = await renderToStream(
          <ApplicationDocument application={application} />,
          )
          
        const streamBuffer = await getBufferFromStream(stream)
        await zip.addFile(`${name}/candidature.pdf`, streamBuffer);

        if (application?.creation_file?.[0]?.url) {
          const creationFile = await fetch(application?.creation_file?.[0]?.url)
          // @ts-ignore
          const creationFileArrayBuffer = await creationFile.buffer()
          
          await zip.addFile(`${name}/dossier-artistique.pdf`, creationFileArrayBuffer);
        }
      }
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching applications.' })
    return
  }

  const zipBuffer = zip.toBuffer();

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + formatCampaignZipName(campaign),
  )
  res.send(zipBuffer)
}

export default SelectedCampaignApplications
