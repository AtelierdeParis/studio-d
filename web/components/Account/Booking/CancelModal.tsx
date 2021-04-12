import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import { Booking } from '~typings/api'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import Delete from 'public/assets/img/delete.svg'

interface ICancelModal {
  bookingId: string
  setSelected: (booking: Booking) => void
}

const CancelModal = ({ bookingId, setSelected }: ICancelModal) => {
  const queryClient = useQueryClient()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('booking')

  const onConfirm = () => {
    setLoading(true)
    return client.bookings
      .bookingsUpdate(bookingId, { status: 'canceled' })
      .then(() => {
        queryClient.refetchQueries('myRequests')
        setSelected(null)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      w="100%"
      button={
        <Button
          w="100%"
          variant="delete"
          leftIcon={<Delete />}
          mt={2.5}
          isLoading={isLoading}
        >
          <Text ml={2}>{t(`cancel`)}</Text>
        </Button>
      }
      title={t('cancel')}
      onConfirm={onConfirm}
      confirmText={t('modal.cancel.confirm')}
      closeText={t('modal.cancel.back')}
    >
      {t('modal.cancel.text')}
    </Modal>
  )
}

export default CancelModal
