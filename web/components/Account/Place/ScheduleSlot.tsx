import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { ScheduleEventType } from '~@types/schedule-event.d'

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

const Event = ({ status = null }) => {
  return (
    <Box
      h="100%"
      border="2px solid"
      w="100%"
      borderRadius="md"
      {...getStyle(status)}
    />
  )
}

const getSlot = ({ type, status }: IScheduleSlot) => {
  switch (type) {
    case ScheduleEventType.MORNING:
      return (
        <>
          <Event status={status} />
          <Event />
        </>
      )
    case ScheduleEventType.AFTERNOON:
      return (
        <>
          <Event />
          <Event status={status} />
        </>
      )

    default:
      return <Event status={status} />
  }
}

interface IScheduleSlot {
  type: ScheduleEventType
  status?: 'selected' | 'available'
}

const ScheduleSlot = (props: IScheduleSlot) => {
  return (
    <VStack spacing={1} h="100%" bgColor="blue.100" w="100%">
      {getSlot(props)}
    </VStack>
  )
}

export default ScheduleSlot
