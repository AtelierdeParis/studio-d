// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import { getSession } from 'next-auth/client'
import yazl from 'yazl'
import { client } from '~api/client-api'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'
import { formatDisponibilityZipName, getBufferFromStream } from '~utils/pdf'

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
  const zip = new yazl.ZipFile()

  for (const application of applications) {
    const refLabel = `Ref. ${application.id}`
    const name = `${refLabel} - ${application.company?.structureName}`
    const stream = await renderToStream(
      <ApplicationDocument application={application} />,
    )

    const streamBuffer = await getBufferFromStream(stream)
    await zip.addBuffer(
      Buffer.from(streamBuffer),
      `${name}/${refLabel} - Candidature.pdf`,
    )

    if (application?.creation_file?.[0]?.url) {
      const creationFile = await fetch(application?.creation_file?.[0]?.url)

      // @ts-ignore
      const creationFileArrayBuffer = await creationFile.buffer()
      await zip.addBuffer(
        Buffer.from(creationFileArrayBuffer),
        `${name}/${refLabel} - Dossier artistique.pdf`,
      )
    }
  }

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader(
    'Content-Disposition',
    // @ts-expect-error
    'attachment; filename=' + formatDisponibilityZipName(disponibility),
  )

  zip.end()

  const zipStream = zip.outputStream
  zipStream.pipe(res)

  return new Promise((resolve) => {
    zipStream.on('end', resolve)
  })
}

export default MultipleApplication
