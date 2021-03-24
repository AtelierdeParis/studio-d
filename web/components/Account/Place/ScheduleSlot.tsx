import React from 'react'
import { Box, VStack } from '@chakra-ui/react'

enum SlotType {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  DAY = 'day',
}

const styleSelected = {
  borderColor: 'blue.500',
  bgColor: 'blue.100',
}

const styleDefault = {
  borderColor: 'transparent',
  bgColor: '#e5e7ed',
}

const Event = ({ isSelected = false }) => {
  return (
    <Box
      h="100%"
      border="2px solid"
      w="100%"
      borderRadius="md"
      {...(isSelected ? styleSelected : styleDefault)}
    />
  )
}

const getSlot = ({ type, isSelected = false }: IScheduleSlot) => {
  switch (type) {
    case SlotType.MORNING:
      return (
        <>
          <Event isSelected={isSelected} />
          <Event />
        </>
      )
    case SlotType.AFTERNOON:
      return (
        <>
          <Event />
          <Event isSelected />
        </>
      )

    default:
      return <Event isSelected />
  }
}

interface IScheduleSlot {
  type: SlotType
  isSelected?: boolean
}

const ScheduleSlot = (props: IScheduleSlot) => {
  return (
    <VStack spacing={1} h="100%" bgColor="blue.100" w="100%">
      {getSlot(props)}
    </VStack>
  )
}

export default ScheduleSlot
