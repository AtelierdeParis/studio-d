import { VStack, Divider } from '@chakra-ui/react'
import { forwardRef, useEffect } from 'react'
import ApplicationPdfCreation from '~components/Account/Application/Place/ApplicationsPdf/ApplicationPdfCreation'
import ApplicationPdfGeneral from '~components/Account/Application/Place/ApplicationsPdf/ApplicationPdfGeneral'
import ApplicationPdfHeader from '~components/Account/Application/Place/ApplicationsPdf/ApplicationPdfHeader'
import ApplicationPdfReferences from '~components/Account/Application/Place/ApplicationsPdf/ApplicationPdfReferences'
import { Application } from '~typings/api'

const SingleApplication = forwardRef(
  (
    {
      application,
      handleDownload,
    }: {
      application: Application
      handleDownload: (ref: any) => void
    },
    ref: any,
  ) => {
    useEffect(() => {
      if (handleDownload) {
        handleDownload(ref.current)
      }
    }, [])

    return (
      <VStack ref={ref} p={4} alignItems="stretch" spacing={6} width="1000px">
        <ApplicationPdfHeader application={application} />
        <Divider opacity="0.3" />
        <VStack
          w="75%"
          alignItems="stretch"
          spacing={10}
          paddingBottom={'100px'}
        >
          <ApplicationPdfReferences application={application} />
          <ApplicationPdfGeneral application={application} />
          <ApplicationPdfCreation application={application} />
        </VStack>
      </VStack>
    )
  },
)

export default SingleApplication
