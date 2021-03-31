import React from 'react'
import Modal from '~components/Modal'
import { deletePlace } from '~api/api'
import useToast from '~hooks/useToast'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

interface IDeletePlaceModal {
  placeId: number
}

const DeletePlaceModal = ({ placeId }: IDeletePlaceModal) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('place')
  const { errorToast, successToast } = useToast()
  const onConfirm = (): Promise<any> => {
    return deletePlace(placeId)
      .then(() => {
        queryClient.refetchQueries(['myPlaces'])
        successToast(t('list.successDelete'))
      })
      .catch(() => errorToast(t('list.errorDelete')))
  }

  return (
    <Modal
      button={<Button variant="line">{t('list.delete')}</Button>}
      title={t('list.delete')}
      onConfirm={onConfirm}
      confirmText={t('list.delete')}
    >
      {t('list.deleteModal')}
    </Modal>
  )
}

export default DeletePlaceModal
