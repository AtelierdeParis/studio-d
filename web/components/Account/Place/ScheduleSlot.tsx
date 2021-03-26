import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { ScheduleEventWhen } from '~@types/schedule-event.d'

const styleSelected = {
  borderColor: 'blue.500',
  bgColor: 'blue.100',
}

const styleAvailable = {
  borderColor: 'white',
  bgColor: 'white',
}

const styleDefault = {
  borderColor: 'transparent',
  bgColor: '#e5e7ed',
}

const getStyle = (status) => {
  switch (status) {
    case 'selected':
      return styleSelected
    case 'available':
      return styleAvailable
    default:
      return styleDefault
  }
}

const Event = ({ status = null, when = null }) => {
  return (
    <Box
      flex={1}
      border="2px solid"
      w="100%"
      borderRadius="md"
      mb={when === ScheduleEventWhen.MORNING ? 0.5 : 0}
      mt={when === ScheduleEventWhen.AFTERNOON ? 0.5 : 0}
      {...getStyle(status)}
    />
  )
}

const getSlot = ({ when, status, hasEventSameDay }: IScheduleSlot) => {
  switch (when) {
    case ScheduleEventWhen.MORNING:
      return (
        <>
          <Event status={status} when={when} />
          {!hasEventSameDay && <Event />}
        </>
      )
    case ScheduleEventWhen.AFTERNOON:
      return (
        <>
          {!hasEventSameDay && <Event />}
          <Event status={status} when={when} />
        </>
      )

    default:
      return <Event status={status} when={when} />
  }
}

interface IScheduleSlot {
  when: ScheduleEventWhen
  status?: 'selected' | 'available'
  hasEventSameDay?: boolean
}

const ScheduleSlot = (props: IScheduleSlot) => {
  return (
    <VStack spacing={1} h="100%" bgColor="blue.100" w="100%">
      {getSlot(props)}
    </VStack>
  )
}

export default ScheduleSlot
