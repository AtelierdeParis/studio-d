import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import { Booking } from '~typings/api'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import Delete from 'public/assets/img/delete.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface ICancelModal {
  booking: Booking
  setSelected: (bookingId: string) => void
  type: 'request' | 'booking'
}

const CancelModal = ({ booking, setSelected, type }: ICancelModal) => {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('booking')
  const { successToast } = useToast()

  const onConfirm = () => {
    const isBooking = type === 'booking'
    setLoading(true)
    return client.bookings
      .bookingsUpdate(booking?.id, {
        // @ts-ignore
        status:
          user.type === 'place' ? `${type}canceledbyplace` : `requestcanceled`,
      })
      .then(() => {
        queryClient.refetchQueries([
          'myBookings',
          isBooking ? 'booking' : 'request',
        ])
        setSelected(null)
        successToast(t('modal.cancel.success'))
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
          <Text ml={2}>{t(`modal.cancel.title.${type}`)}</Text>
        </Button>
      }
      title={t(`modal.cancel.title.${type}`)}
      onConfirm={onConfirm}
      confirmText={t('modal.cancel.confirm')}
      closeText={t('modal.cancel.back')}
    >
      {t(`modal.cancel.text.${type}`)}
    </Modal>
  )
}

export default CancelModal
