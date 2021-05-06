import React, { useMemo, useContext } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { ScheduleEventWhen } from '~@types/schedule-event.d'
import isSameDay from 'date-fns/isSameDay'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import PeriodEvent from '~components/Place/PeriodEvent'

const styleSelected = {
  border: '1px dashed',
  borderWidth: '1px',
  borderColor: 'blue.500',
  bgColor: 'white',
}

const styleAvailable = {
  bgColor: 'white',
}

const styleBooked = {
  bgColor: 'tag.green',
}

const stylePending = {
  bgColor: 'tag.yellow',
}

const styleError = {
  borderColor: 'red.500',
  bgColor: 'white',
}

const styleDefault = {
  bgColor: '#e5e7ed',
}

const getStyle = (status) => {
  switch (status) {
    case 'selected':
      return styleSelected
    case 'available':
      return styleAvailable
    case 'pending':
      return stylePending
    case 'booked':
      return styleBooked
    case 'error':
      return styleError
    default:
      return styleDefault
  }
}

const Event = ({ status = null, when = null, range = null, id = null }) => {
  const { setToDelete, eventsIdToDelete, place } = useContext(ScheduleContext)
  const isPeriod = useMemo(() => {
    if (!range) return null
    return !isSameDay(range.start, range.end)
  }, [range])

  const isSelected = useMemo(() => eventsIdToDelete.includes(id), [
    eventsIdToDelete,
    id,
  ])

  return (
    <Box
      className="scheduleEvent"
      flex={1}
      border="solid"
      borderWidth={{ base: '1px', sm: '2px' }}
      w="100%"
      borderRadius="md"
      cursor={id && 'pointer'}
      onClick={() => {
        if (!id) return setToDelete([])
        const dispo = place.disponibilities.find((dispo) => dispo.id === id)
        if (!dispo) return

        const disposSameBooking = place.disponibilities
          .filter(
            (el) =>
              el.booking && dispo.booking && el.booking.id === dispo.booking.id,
          )
          .map((dispo) => dispo.id)

        if (isSelected) {
          if (disposSameBooking.length > 0) {
            setToDelete(
              eventsIdToDelete.filter(
                (eventId) => !disposSameBooking.includes(eventId),
              ),
            )
          } else {
            setToDelete(eventsIdToDelete.filter((eventId) => eventId !== id))
          }
        } else {
          if (disposSameBooking.length > 0) {
            setToDelete([...eventsIdToDelete, ...disposSameBooking])
          } else {
            setToDelete([...eventsIdToDelete, id])
          }
        }
      }}
      borderColor={isSelected ? 'blue.500' : 'transparent'}
      {...getStyle(status)}
    >
      {isPeriod && <PeriodEvent isMonth start={range.start} end={range.end} />}
    </Box>
  )
}

const getSlot = ({ hasEventSameDay, ...props }: Props) => {
  switch (props.when) {
    case ScheduleEventWhen.MORNING:
      return (
        <>
          <Event {...props} />
          {!hasEventSameDay && <Event />}
        </>
      )
    case ScheduleEventWhen.AFTERNOON:
      return (
        <>
          {!hasEventSameDay && <Event />}
          <Event {...props} range={props.range} />
        </>
      )
    case ScheduleEventWhen.FULL:
      return (
        <>
          <Event {...props} range={props.range} />
          <Event {...props} range={props.range} />
        </>
      )
    default:
      return <Event {...props} />
  }
}

interface Props {
  id?: number
  when: ScheduleEventWhen
  status?: 'selected' | 'available'
  hasEventSameDay?: boolean
  range: { start: Date; end: Date }
}

const ScheduleSlot = (props: Props) => {
  return (
    <VStack spacing="4px" h="100%" bgColor="blue.100" w="100%">
      {getSlot(props)}
    </VStack>
  )
}

export default ScheduleSlot
