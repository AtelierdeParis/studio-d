// @ts-ignore
import { renderToStream } from '@react-pdf/renderer'
import ApplicationDocument from '~components/pdfs/ApplicationDocument'

export default async (req, res) => {
  const stream = await renderToStream(<ApplicationDocument />)

  res.setHeader('Content-Type', 'application/pdf')

  // Uncomment to force download
  // res.setHeader('Content-Disposition', 'attachment; filename=application.pdf')

  stream.pipe(res)
  stream.on('end', () => res.end())
}
