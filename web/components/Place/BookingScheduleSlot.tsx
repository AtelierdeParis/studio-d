import React from 'react'
import { ScheduleEventWhen } from '~@types/schedule-event.d'
import { Flex, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface Props {
  id?: number
  when: ScheduleEventWhen
  status: string
  hasEventSameDay?: boolean
  range: { start: Date; end: Date }
}

const BookingScheduleSlot = ({ when, hasEventSameDay }: Props) => {
  const { t } = useTranslation('place')
  const Event = (
    <Flex
      bgColor="white"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      w="100%"
      h="100%"
      cursor="pointer"
    >
      <Text fontSize="sm">{t(`detail.dispo.${when || 'day'}`)}</Text>
    </Flex>
  )

  if (!hasEventSameDay) {
    return (
      <SimpleGrid w="100%" h="100%" gridAutoRows="1fr" rowGap="13px">
        {when === ScheduleEventWhen.AFTERNOON && <Spacer />}
        {Event}
        {when === ScheduleEventWhen.MORNING && <Spacer />}
      </SimpleGrid>
    )
  }

  return Event
}

export default BookingScheduleSlot
