import React, { Fragment } from 'react'
import { Application } from '~typings/api'
import { Text, Button, IconButton, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import Link from '~components/Link'
import DownloadApplication from 'public/assets/img/downloadApplication.svg'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

interface Props {
  application: Application
}

const ApplicationPlaceListItem = ({ application }: Props) => {
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
        >{`${application?.company?.structureName} (${application.company.firstname} ${application.company.lastname})`}</Text>
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
              isDisabled={selectedCampaign?.mode === 'closed'}
            />
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
              isDisabled={selectedCampaign?.mode === 'closed'}
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
