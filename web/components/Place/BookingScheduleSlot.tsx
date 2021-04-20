import React, { useContext, useMemo } from 'react'
import {
  ScheduleEventType,
  ScheduleEventWhen,
  ScheduleEvent,
} from '~@types/schedule-event.d'
import { Flex, SimpleGrid, Spacer, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import PeriodEvent from '~components/Place/PeriodEvent'
import PopoverOtherBooking from '~components/Place/PopoverOtherBooking'
import Confirm from 'public/assets/img/confirm.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useMyBookings } from '~hooks/useMyBookings'
import { useMyRequests } from '~hooks/useMyRequests'
import useConcurrentBookings from '~hooks/useConcurrentBookings'

const styleSelected = {
  borderColor: 'confirm',
  _hover: {
    borderColor: 'confirm',
  },
}

const styleAnotherBooking = {
  bgColor: '#e5e7ed',
  cursor: 'auto',
  _hover: {
    borderColor: 'transparent',
  },
}
interface Props extends ScheduleEvent {
  isMonth?: boolean
}

const SpacerEvent = ({ isMonth }) => (
  <Spacer bgColor={isMonth ? '#e5e7ed' : 'transparent'} borderRadius="lg" />
)

const BookingScheduleSlot = (props: Props) => {
  const { t } = useTranslation('place')
  const { data: user } = useCurrentUser()
  const { data: bookings = [] } = useMyBookings()
  const { data: requests = [] } = useMyRequests()
  const {
    extendedProps: { when, hasEventSameDay, id, type },
    start,
    end,
    isMonth,
  } = props
  const { selected, setSelected } = useContext(BookingScheduleContext)
  const isSelected = useMemo(
    () => selected.some((dispo) => dispo.extendedProps.id === id),
    [selected, id],
  )
  console.log(user)
  const { hasAnotherBooking, concurrentBooking } = useConcurrentBookings(
    requests.concat(bookings),
    props,
  )

  let Event = (
    <Flex
      className="scheduleEvent"
      pos="relative"
      bgColor="white"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      w="100%"
      h="100%"
      cursor="pointer"
      border="2px solid"
      borderColor="transparent"
      _hover={{
        borderColor: user.type === 'company' ? '#cbcfe1' : 'transparent',
      }}
      {...(isSelected && styleSelected)}
      {...(hasAnotherBooking && styleAnotherBooking)}
      onClick={() => {
        if (hasAnotherBooking || user.type === 'place') return null
        if (!isSelected) {
          setSelected([...selected, props])
        } else {
          setSelected(selected.filter((el) => el.extendedProps.id !== id))
        }
      }}
    >
      {isSelected && !isMonth && (
        <Box pos="absolute" right={2} top={2}>
          <Confirm />
        </Box>
      )}
      {type === ScheduleEventType.PERIOD ? (
        <PeriodEvent start={start} end={end} isMonth={isMonth} />
      ) : (
        <>
          {!isMonth && (
            <Text fontSize="sm">{t(`detail.dispo.${when || 'day'}`)}</Text>
          )}
        </>
      )}
    </Flex>
  )

  if (hasAnotherBooking) {
    Event = (
      <PopoverOtherBooking isMonth booking={concurrentBooking}>
        {Event}
      </PopoverOtherBooking>
    )
  }

  if (!hasEventSameDay) {
    return (
      <SimpleGrid
        w="100%"
        h="100%"
        gridAutoRows="1fr"
        rowGap="4px"
        bgColor={isMonth ? 'blue.50' : 'transparent'}
      >
        {when === ScheduleEventWhen.AFTERNOON && (
          <SpacerEvent isMonth={isMonth} />
        )}
        {Event}
        {when === ScheduleEventWhen.MORNING && (
          <SpacerEvent isMonth={isMonth} />
        )}
      </SimpleGrid>
    )
  }

  return Event
}

export default BookingScheduleSlot
