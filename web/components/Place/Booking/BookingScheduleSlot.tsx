import React, { useContext, useMemo } from 'react'
import {
  ScheduleEventType,
  ScheduleEventWhen,
  ScheduleEvent,
} from '~@types/schedule-event.d'
import { Flex, useBreakpointValue, Spacer, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'
import PeriodEvent from '~components/Place/PeriodEvent'
import PopoverOtherBooking from '~components/Place/PopoverOtherBooking'
import Confirm from 'public/assets/img/confirm.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useMyBookings } from '~hooks/useMyBookings'
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

const styleSelectable = {
  cursor: 'pointer',
  _hover: {
    borderColor: '#cbcfe1',
  },
}
interface Props extends ScheduleEvent {
  isMonth?: boolean
}

const SpacerEvent = ({ isMonth, ...rest }) => (
  <Spacer
    bgColor={isMonth ? '#e5e7ed' : 'transparent'}
    borderRadius="lg"
    flex={1}
    {...rest}
  />
)

const BookingScheduleSlot = (props: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { t } = useTranslation('place')
  const { data: user } = useCurrentUser()
  const { data: bookings = [] } = useMyBookings('all', {
    enabled: Boolean(user),
  })
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

  const { hasAnotherBooking, concurrentBooking } = useConcurrentBookings(
    bookings,
    props,
    user,
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
      border="2px solid"
      borderColor="transparent"
      flex={1}
      cursor={user?.type === 'place' && 'not-allowed'}
      {...((!Boolean(user) || user?.type === 'company') && styleSelectable)}
      {...(isSelected && styleSelected)}
      {...(hasAnotherBooking && styleAnotherBooking)}
      onClick={() => {
        if (user?.type === 'place') {
          if (isMobile) {
            window.alert(t(`detail.onlyCompany`))
          }

          return null
        }
        if (hasAnotherBooking) return null
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
      <Flex
        direction="column"
        w="100%"
        h="100%"
        className="grid"
        bgColor={isMonth ? 'blue.50' : 'transparent'}
      >
        {when === ScheduleEventWhen.AFTERNOON && (
          <SpacerEvent isMonth={isMonth} borderBottom="2px solid transparent" />
        )}
        {Event}
        {when === ScheduleEventWhen.MORNING && (
          <SpacerEvent isMonth={isMonth} borderTop="2px solid transparent" />
        )}
      </Flex>
    )
  }

  return Event
}

export default BookingScheduleSlot
