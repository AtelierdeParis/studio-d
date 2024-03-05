import React, { Fragment } from 'react'
import { format } from '~utils/date'
import { Application } from '~typings/api'
import { Text, Button, ButtonGroup } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import ConfirmButton from '~components/Account/Application/ConfirmButton'
import useCampaignContext from '~components/Campaign/useCampaignContext'

interface Props {
  application: Application
  onSelect: () => void
  handleDelete: () => void
}

const ApplicationCompanyListItem = ({
  application,
  onSelect,
  handleDelete,
}: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('application')

  return (
    <Fragment key={application?.id}>
      <Cell cursor="default">
        <Text fontFamily="mabry medium" fontWeight="500">
          {application?.id}
        </Text>
      </Cell>
      <Cell cursor="default">
        <Text fontFamily="mabry medium" fontWeight="500">
          {
            //@ts-expect-error
            application.disponibility.espace.users_permissions_user
              .structureName
          }
        </Text>
      </Cell>
      <Cell cursor="default">
        <Text fontFamily="mabry medium" fontWeight="500">
          {/* @ts-expect-error */}
          {application?.disponibility?.espace?.name}
        </Text>
      </Cell>
      <Cell cursor="default">
        <Text fontFamily="mabry medium" fontWeight="500">{`${format(
          application?.disponibility.start,
          'dd/MM',
        )} → ${format(application?.disponibility.end, 'dd/MM')}`}</Text>
      </Cell>
      <Cell cursor="default">
        <Text>{application?.creation_title}</Text>
      </Cell>
      <Cell cursor="default">
        {currentCampaign?.mode === 'applications' && (
          <ButtonGroup>
            <Button
              px={2}
              py={1}
              variant="outline"
              color="grayText.1"
              colorScheme="gray"
              size="sm"
              borderRadius="sm"
              fontSize="md"
              onClick={onSelect}
            >
              {t('company.table.edit')}
            </Button>

            <ConfirmButton
              helper={t('company.table.delete_helper')}
              handleConfirm={handleDelete}
              confirmLabel={t('company.table.delete')}
            >
              <Button
                px={2}
                py={1}
                variant="outline"
                color="grayText.1"
                colorScheme="gray"
                size="sm"
                borderRadius="sm"
                fontSize="md"
              >
                {t('company.table.delete')}
              </Button>
            </ConfirmButton>
          </ButtonGroup>
        )}
      </Cell>
    </Fragment>
  )
}

export default ApplicationCompanyListItem
