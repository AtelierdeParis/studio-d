import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import { Booking } from '~typings/api'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import Delete from 'public/assets/img/delete.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface ICancelModal {
  booking: Booking
  setSelected: (booking: Booking) => void
}

const CancelModal = ({ booking, setSelected }: ICancelModal) => {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('booking')

  const onConfirm = () => {
    const isPlace = user.type === 'place'
    setLoading(true)
    return client.bookings
      .bookingsUpdate(booking?.id, {
        status: isPlace ? 'canceledbyplace' : 'canceled',
      })
      .then(() => {
        queryClient.refetchQueries(isPlace ? 'myBookings' : 'myRequests')
        setSelected(null)
      })
      .finally(() => setLoading(false))
  }

  if (!user || (user.type === 'company' && booking?.status !== 'pending'))
    return null

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
