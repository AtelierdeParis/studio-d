import React, { Fragment } from 'react'
import { Application } from '~typings/api'
import { Text, Button, IconButton, HStack, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import Link from '~components/Link'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import ApplicationStatusIcon from '~components/Account/Application/Place/ApplicationStatusIcon'
import ApplicationDownloadButton from '~components/Account/Application/Place/ApplicationsPdf/ApplicationDownloadButton'

interface Props {
  application: Application
  onSelect: () => void
}

const ApplicationPlaceListItem = ({ application, onSelect }: Props) => {
  const { selectedCampaign } = useSelectedCampaign()
  const { t } = useTranslation('application')

  return (
    <Fragment key={application?.id}>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">
          {application?.id}
        </Text>
      </Cell>
      <Cell>
        <Text
          fontFamily="mabry medium"
          fontWeight="500"
          pr={2}
          as="span"
        >{`${application?.company?.structureName} (${application.company.firstname} ${application.company.lastname})`}</Text>
        <ApplicationStatusIcon status={application?.status} />
      </Cell>
      <Cell>
        <Link href={`mailto:${application?.company?.email}`} target="_blank">
          <Text color="grayText.1" textDecoration="underline">
            {application?.company?.email}
          </Text>
        </Link>
      </Cell>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">
          {application?.creation_title}
        </Text>
      </Cell>
      {['preselections', 'closed']?.includes(selectedCampaign?.mode) && (
        <Cell>
          <HStack spacing={2}>
            <ApplicationDownloadButton application={application} />
            <Button
              px={2}
              py={1}
              variant="outline"
              color="grayText.1"
              colorScheme="gray"
              size="sm"
              borderRadius="sm"
              fontSize="md"
              borderColor="rgba(98,103,130, 0.6)"
              onClick={onSelect}
            >
              {t('place.table.buttons.details')}
            </Button>
          </HStack>
        </Cell>
      )}
    </Fragment>
  )
}

export default ApplicationPlaceListItem
