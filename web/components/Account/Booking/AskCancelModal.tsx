import React, { useState } from 'react'
import Modal from '~components/Modal'
import FormField from '~components/FormField'
import { client } from '~api/client-api'
import { Button, Text, Box, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import Delete from 'public/assets/img/delete.svg'
import { Booking } from '~typings/api'

interface Props {
  booking: Booking
  setSelected: (booking: Booking) => void
}

const AskCancelModal = ({ booking, setSelected }: Props) => {
  const queryClient = useQueryClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { t } = useTranslation('booking')

  const onConfirm = () => {
    setLoading(true)
    return client.bookings
      .bookingsUpdate(booking?.id, { status: 'askcancel' })
      .then(() => {
        return client.messages.messagesCreate({
          booking: booking.id,
          company: booking.company.id,
          place: booking.place.id,
          message,
        })
      })
      .then(() => {
        setSelected(null)
        queryClient.refetchQueries('myBookings')
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      size="lg"
      w="100%"
      button={
        <Button
          w="100%"
          variant="delete"
          leftIcon={<Delete />}
          mt={2.5}
          isLoading={isLoading}
        >
          <Text ml={2}>{t(`askcancel`)}</Text>
        </Button>
      }
      title={t('modal.askcancel.title')}
      onConfirm={onConfirm}
      confirmText={t('modal.askcancel.confirm')}
      closeText={t('modal.askcancel.back')}
    >
      <Box>
        <Text pb={5}>{t('modal.askcancel.text')}</Text>
        <FormField label={t('modal.askcancel.message.label')} isRequired>
          <Textarea
            mt={1}
            placeholder={t('modal.askcancel.message.placeholder')}
            resize="none"
            h="180px"
            onChange={(event) => setMessage(event.target.value)}
          />
        </FormField>
      </Box>
    </Modal>
  )
}

export default AskCancelModal
