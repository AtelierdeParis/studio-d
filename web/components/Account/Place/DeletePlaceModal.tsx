import React from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

interface IDeletePlaceModal {
  placeId: string
}

const DeletePlaceModal = ({ placeId }: IDeletePlaceModal) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('place')
  const { errorToast, successToast } = useToast()
  const onConfirm = (): Promise<any> => {
    return client.espaces
      .espacesDelete(placeId)
      .then(() => {
        queryClient.refetchQueries(['myPlaces'])
        successToast(t('list.successDelete'))
      })
      .catch(() => errorToast(t('list.errorDelete')))
  }

  return (
    <Modal
      w="100%"
      button={
        <Button
          w="100%"
          variant="line"
          alignSelf="flex-start"
          px={{ base: 3, lg: 0 }}
          py={{ base: 1.5, lg: 0 }}
          justifyContent={{ base: 'flex-start', lg: 'center' }}
          _hover={{ borderBottomColor: { base: 'transparent', lg: 'black' } }}
          borderBottomColor={{ base: 'transparent', lg: 'blue.500' }}
        >
          {t('list.delete')}
        </Button>
      }
      title={t('list.delete')}
      onConfirm={onConfirm}
      confirmText={t('list.delete')}
    >
      {t('list.deleteModal')}
    </Modal>
  )
}

export default DeletePlaceModal
