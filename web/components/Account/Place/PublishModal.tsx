import React from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

interface IPublishModal {
  placeId: string
}

const PublishModal = ({ placeId }: IPublishModal) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('place')
  const { errorToast, successToast } = useToast()
  const onConfirm = (): Promise<any> => {
    return client.espaces
      .espacesUpdate(placeId, { published: true })
      .then(() => {
        queryClient.refetchQueries(['myPlaces'])
        successToast(t('list.successPublish'))
      })
      .catch(() => errorToast(t('list.errorPublish')))
  }

  return (
    <Modal
      button={
        <Button variant="line" borderBottomColor="blue.500">
          {t('list.publish')}
        </Button>
      }
      title={t('list.publish')}
      onConfirm={onConfirm}
    >
      {t('list.publishModal')}
    </Modal>
  )
}

export default PublishModal
