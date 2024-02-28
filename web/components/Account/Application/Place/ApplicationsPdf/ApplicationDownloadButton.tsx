import { Box, IconButton, useDisclosure } from '@chakra-ui/react'
import DownloadApplication from 'public/assets/img/downloadApplication.svg'
import { useRef, useState } from 'react'
import { downloadPdf } from '~components/Account/Application/Place/ApplicationsPdf/pdfUtils'
import SingleApplication from '~components/Account/Application/Place/SingleApplication'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import { Application } from '~typings/api'

const ApplicationDownloadButton = ({
  application,
  controlledIsOpen,
  controlledOnClose,
  onDownloadFinish,
}: {
  application: Application
  controlledIsOpen?: boolean
  controlledOnClose?: () => void
  onDownloadFinish?: (id: string) => void
}) => {
  const pdfRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedCampaign } = useSelectedCampaign()

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
          onOpen()
          setIsLoading(true)
        }}
        display={controlledOnClose ? 'none' : 'inherit'}
      />

      {(controlledIsOpen !== undefined ? controlledIsOpen : isOpen) && (
        <Box w="1px" h="1px" overflow={'hidden'}>
          <SingleApplication
            application={application}
            ref={pdfRef}
            handleDownload={async (ref) => {
              await downloadPdf(
                ref,
                `application_${
                  application.id
                }_${application?.company?.structureName
                  ?.split(' ')
                  ?.join('_')}_${selectedCampaign?.title
                  ?.split(' ')
                  ?.join('_')}`,
                application?.creation_file[0]?.url,
              )
              setIsLoading(false)
              onDownloadFinish(application.id)
              controlledOnClose ? controlledOnClose() : onClose()
            }}
          />
        </Box>
      )}
    </>
  )
}

export default ApplicationDownloadButton
