import { IconButton } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import DownloadApplication from 'public/assets/img/downloadApplication.svg'
import { useState } from 'react'
import useToast from '~hooks/useToast'
import { Application } from '~typings/api'
import { formatApplicationPdfName, handleApplicationDownload } from '~utils/pdf'

const ApplicationDownloadButton = ({
  application,
}: {
  application: Application
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { errorToast } = useToast()
  const { t } = useTranslation('application')

  return (
    <>
      <IconButton
        px={2}
        py={1}
        variant="outline"
        color="grayText.1"
        colorScheme="gray"
        size="sm"
        borderRadius="sm"
        fontSize="md"
        aria-label="dowload"
        borderColor="rgba(98,103,130, 0.6)"
        icon={<DownloadApplication />}
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true)
          try {
            await handleApplicationDownload({
              application,
              onError: () => errorToast(t('error')),
            })
          } catch (err) {
            console.log(err)
            errorToast(t('error'))
          } finally {
            setIsLoading(false)
          }
        }}
      />
    </>
  )
}

export default ApplicationDownloadButton
