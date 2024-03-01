import React, { Fragment } from 'react'
import { format } from '~utils/date'
import { Application } from '~typings/api'
import { Text, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import ConfirmButton from '~components/Account/Application/ConfirmButton'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useRouter } from 'next/router'

interface Props {
  application: Application
}

const ApplicationCompanyListItem = ({ application }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { errorToast, successToast } = useToast()
  const { t } = useTranslation('application')
  const queryClient = useQueryClient()
  const { query } = useRouter()

  const onDelete = async () => {
    try {
      await client.applications.applicationsDelete(application.id)
      successToast(t('company.delete_success'))
      queryClient.refetchQueries([
        'myApplications',
        query?.disponibility as string,
      ])
    } catch (e) {
      errorToast(t('company.delete_error'))
    }
  }

  return (
    <Fragment key={application?.id}>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">
          {application?.id}
        </Text>
      </Cell>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">
          {
            //@ts-expect-error
            application.disponibility.espace.users_permissions_user
              .structureName
          }
        </Text>
      </Cell>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">
          {/* @ts-expect-error */}
          {application?.disponibility?.espace?.name}
        </Text>
      </Cell>
      <Cell>
        <Text fontFamily="mabry medium" fontWeight="500">{`${format(
          application?.disponibility.start,
          'dd/MM',
        )} → ${format(application?.disponibility.end, 'dd/MM')}`}</Text>
      </Cell>
      <Cell>
        <Text>{application?.creation_title}</Text>
      </Cell>
      <Cell>
        {currentCampaign?.mode === 'applications' && (
          <ConfirmButton
            helper={t('company.table.delete_helper')}
            handleConfirm={onDelete}
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
        )}
      </Cell>
    </Fragment>
  )
}

export default ApplicationCompanyListItem
