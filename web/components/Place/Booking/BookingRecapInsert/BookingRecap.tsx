import React, { useMemo, useContext } from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'
import { useTranslation } from 'next-i18next'
import { useCurrentUser } from '~hooks/useCurrentUser'
import AuthBookingInsert from '~components/Place/Booking/BookingRecapInsert/AuthBookingInsert'
import ConfirmBookingInsert from '~components/Place/Booking/BookingRecapInsert/ConfirmBookingInsert'
import { is } from 'date-fns/locale'
import NotConfirmedBookingInsert from '~components/Place/Booking/BookingRecapInsert/NotConfirmedBookingInsert'

const BookingRecap = () => {
  const { t } = useTranslation('place')
  const { selected: fullSelected } = useContext(BookingScheduleContext)
  const { data: user, isLoading } = useCurrentUser()

  const isCampaignMode = useMemo(
    () => fullSelected.some((e) => e.extendedProps.isCampaignEvent),
    [fullSelected],
  )

  const selected = useMemo(
    () =>
      fullSelected.filter((s) =>
        isCampaignMode
          ? s.extendedProps.isCampaignEvent
          : !s.extendedProps.isCampaignEvent,
      ),
    [fullSelected],
  )

  if (selected.length === 0 || isLoading) return null

  return (
    <Flex
      boxShadow="1px 1px 4px #ccc"
      pos={{ base: 'fixed', md: 'static' }}
      left={0}
      right={0}
      bottom={0}
      px={{ base: 5, md: 8 }}
      py={{ base: 4, md: 5 }}
      zIndex={{ base: 20, md: 1 }}
      bgColor="white"
      borderRadius="xl"
      justifyContent="space-between"
      alignItems={{ base: 'flex-start', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      width="100%"
    >
      {!user ? (
        <AuthBookingInsert
          nbSelected={selected?.length || 0}
          isCampaignMode={isCampaignMode}
        />
      ) : (
        <>
          {!user.confirmed || !user.accepted ? (
            <NotConfirmedBookingInsert
              isCampaignMode={isCampaignMode}
              selected={selected}
            />
          ) : (
            <ConfirmBookingInsert
              isCampaignMode={isCampaignMode}
              selected={selected}
            />
          )}
        </>
      )}
    </Flex>
  )
}

export default BookingRecap
