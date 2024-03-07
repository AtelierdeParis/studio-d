// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { getSession } from 'next-auth/client'
import PDFMerger from 'pdf-merger-js'
import { formatDisponibilityPdfName, getBufferFromStream } from '~utils/pdf'

const MultipleApplication = async (req, res) => {
  const { id: disponibilityId } = req.query
  const session = await getSession({ req })

  // If the session is not defined, refuse access
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const { data: applications } = await client.applications.getMyApplications(
    {
      //@ts-expect-error
      disponibility: disponibilityId,
    },
    {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    },
  )

  const disponibility = applications?.[0]?.disponibility
  const campaign = applications?.[0]?.campaign

  const merger = new PDFMerger()
  let finalPDF

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

  finalPDF = await merger.saveAsBuffer()

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' +
      // @ts-expect-error
      formatDisponibilityPdfName(disponibility, campaign),
  )
  res.send(finalPDF)
}

export default MultipleApplication
