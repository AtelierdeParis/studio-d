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
import Link from '~components/Link'
import useCampaignContext from '~components/Campaign/useCampaignContext'

interface Props {
  application: Application
}

const ApplicationPlaceListItem = ({ application }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { errorToast, successToast } = useToast()
  const { t } = useTranslation('application')
  const queryClient = useQueryClient()

  const onDelete = async () => {
    try {
      await client.applications.applicationsDelete(application.id)
      successToast(t('company.delete_success'))
      queryClient.refetchQueries(['myApplications'])
    } catch (e) {
      errorToast(t('company.delete_error'))
    }
  }

  return (
    <Fragment key={application?.id}>
      <Cell>
        <Text>{application?.id}</Text>
      </Cell>
      <Cell>
        <Text>{`${application?.company?.structureName} (${application.company.firstname} ${application.company.lastname})`}</Text>
      </Cell>
      <Cell>
        <Link href={`mailto:${application?.company?.email}`} target="_blank">
          <Text>{application?.company?.email}</Text>
        </Link>
      </Cell>
      <Cell>
        <Text>{application?.creation_title}</Text>
      </Cell>
      {currentCampaign?.mode === 'preselections' && (
        <Cell>
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
        </Cell>
      )}
    </Fragment>
  )
}

export default ApplicationPlaceListItem
