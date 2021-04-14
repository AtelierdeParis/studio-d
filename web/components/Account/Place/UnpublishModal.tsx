import React from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { Flex, Button } from '@chakra-ui/react'
import Arrow from 'public/assets/img/circle-arrow.svg'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

interface IUnpublishModal {
  placeId: string
}

const UnpublishModal = ({ placeId }: IUnpublishModal) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('place')
  const { errorToast, successToast } = useToast()

  const onConfirm = (): Promise<any> => {
    return client.espaces
      .espacesUpdate(placeId, { published: false })
      .then(() => {
        queryClient.refetchQueries(['myPlaces'])
        successToast(t('list.successUnpublish'))
      })
      .catch(() => errorToast(t('list.errorUnpublish')))
  }

  return (
    <Modal
      button={
        <Flex alignItems="center" alignSelf="center">
          <Button variant="line" display="flex" mr={5}>
            {t('list.unpublish')}
          </Button>
          <Arrow />
        </Flex>
      }
      title={t('list.unpublish')}
      onConfirm={onConfirm}
    >
      {t('list.unpublishModal')}
    </Modal>
  )
}

export default UnpublishModal
