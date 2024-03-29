import React, { useMemo, useContext } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { ScheduleEventWhen } from '~@types/schedule-event.d'
import isSameDay from 'date-fns/isSameDay'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import PeriodEvent from '~components/Place/PeriodEvent'
import useCampaignContext from '~components/Campaign/useCampaignContext'

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

const Event = ({
  status = null,
  range = null,
  id = null,
  isCampaignEvent = false,
  isCampaignMode = false,
}) => {
  const { setToDelete, eventsIdToDelete, place } = useContext(ScheduleContext)
  const { currentCampaign } = useCampaignContext()
  const isPeriod = useMemo(() => {
    if (!range) return null
    return !isSameDay(range.start, range.end)
  }, [range])

  const isSelected = useMemo(() => eventsIdToDelete.includes(id), [
    eventsIdToDelete,
    id,
  ])

  const isFromOtherTab =
    (isCampaignMode && !isCampaignEvent) || (!isCampaignMode && isCampaignEvent)
  const isClosedDispoMode =
    isCampaignMode &&
    isCampaignEvent &&
    currentCampaign.mode !== 'disponibilities'

  const isDisabled = isFromOtherTab || isClosedDispoMode

  return (
    <Box
      className="scheduleEvent"
      flex={1}
      border="solid"
      borderWidth={{ base: '1px', sm: '2px' }}
      w="100%"
      borderRadius="md"
      cursor={isDisabled ? 'not-allowed' : id ? 'pointer' : undefined}
      onClick={() => {
        if (isDisabled) return
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
      opacity={isFromOtherTab ? 0.6 : 1}
    >
      {isPeriod && (
        <PeriodEvent
          isMonth
          start={range.start}
          end={range.end}
          isCampaignEvent={isCampaignEvent}
        />
      )}
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
  isCampaignEvent?: boolean
  isCampaignMode?: boolean
  day: Date
}

const ScheduleSlot = (props: Props) => {
  return (
    <VStack spacing="4px" h="100%" bgColor="blue.100" w="100%">
      {getSlot(props)}
    </VStack>
  )
}

export default ScheduleSlot
