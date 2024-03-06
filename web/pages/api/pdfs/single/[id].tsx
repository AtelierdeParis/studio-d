// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { getSession } from 'next-auth/client'
import PDFMerger from 'pdf-merger-js'
import { formatApplicationPdfName, getBufferFromStream } from '~utils/pdf'

const SingleApplication = async (req, res) => {
  const { id } = req.query
  const session = await getSession({ req })
  const { data: application } = await client.applications.getMyApplications(
    null,
    {
      //@ts-expect-error
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    },
  )

  const stream = await renderToStream(
    <ApplicationDocument application={application?.[0]} />,
  )
  const streamBuffer = await getBufferFromStream(stream)

  let finalPDF = streamBuffer
  if (application?.[0]?.creation_file?.[0]?.url) {
    const creationFile = await fetch(application?.[0]?.creation_file?.[0]?.url)
    const creationFileArrayBuffer = await creationFile.arrayBuffer()
    const merger = new PDFMerger()

    await merger.add(streamBuffer)
    await merger.add(creationFileArrayBuffer)
    finalPDF = await merger.saveAsBuffer()
  }
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + formatApplicationPdfName(application?.[0]),
  )
  res.send(finalPDF)
}

export default SingleApplication
