import { Stream } from 'stream'
import { Application, Campaign, Disponibility } from '~typings/api'
import { format } from '~utils/date'

export const getBufferFromStream = (stream: Stream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

export const formatApplicationPdfName = (application: Application) => {
  //@ts-expect-error
  return `${application?.disponibility?.espace?.name
    ?.split(' ')
    .join('_')}_${format(
    application?.disponibility?.start,
    'dd-MM-yyyy',
  )}_${format(application?.disponibility?.end, 'dd-MM-yyyy')}_Ref-${
    application?.id
    //@ts-expect-error
  }_${application?.disponibility?.espace?.users_permissions_user?.structureName
    ?.split(' ')
    .join('_')}_${application?.campaign?.title?.split(' ').join('_')}.pdf`
}

export const handleApplicationDownload = async ({
  application,
  onError,
}: {
  application: Application
  onError: () => void
}) => {
  const res = await fetch(`/api/pdfs/single/${application.id}`)
  if (!res.ok) {
    onError()
  }
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', formatApplicationPdfName(application))
  document.body.appendChild(link)
  link.click()
  link.parentNode?.removeChild(link)
}

export const formatDisponibilityZipName = (
  disponibility: Disponibility,
  campaign: Campaign,
) => {
  return `${disponibility?.espace?.name?.split(' ').join('_')}_${format(
    disponibility?.start,
    'dd-MM-yyyy',
  )}_${format(
    disponibility?.end,
    'dd-MM-yyyy',
    //@ts-expect-error
  )}_${disponibility?.espace?.users_permissions_user?.structureName
    ?.split(' ')
    .join('_')}_${campaign?.title?.split(' ').join('_')}.zip`
}

export const formatCampaignZipName = (campaign: Campaign) => {
  return `${campaign?.title?.split(' ').join('_')}.zip`
}
