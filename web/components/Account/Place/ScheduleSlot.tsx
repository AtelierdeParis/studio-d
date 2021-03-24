import React from 'react'
import { Box, VStack } from '@chakra-ui/react'

enum SlotType {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  DAY = 'day',
}

const Event = ({ isBooked = false }) => {
  return (
    <Box
      h="100%"
      bgColor={isBooked ? 'white' : '#e5e7ed'}
      w="100%"
      borderRadius="md"
    />
  )
}

const getSlot = (type) => {
  switch (type) {
    case SlotType.MORNING:
      return (
        <>
          <Event isBooked />
          <Event />
        </>
      )
    case SlotType.AFTERNOON:
      return (
        <>
          <Event />
          <Event isBooked />
        </>
      )

    default:
      return <Event isBooked />
  }
}

interface IScheduleSlot {
  type: SlotType
}

const ScheduleSlot = ({ type }: IScheduleSlot) => {
  return (
    <VStack spacing={1} h="100%" bgColor="blue.100">
      {getSlot(type)}
    </VStack>
  )
}

export default ScheduleSlot
