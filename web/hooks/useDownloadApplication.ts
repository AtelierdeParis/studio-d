import { client } from '~api/client-api'
import FileSaver from 'file-saver'
import { useCallback } from 'react'

export const useDownloadApplication = (applicationId) => {
  const downloadApplication = useCallback(async () => {
    const response = await client.applications.generatePdf(applicationId)
    const blob = new Blob([response.data], { type: 'application/pdf' })

    FileSaver.saveAs(blob, 'application.pdf')
  }, [applicationId])

  return { downloadApplication }
}
