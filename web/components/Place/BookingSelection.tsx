import React from 'react'
import { Flex, Box, Circle, Text } from '@chakra-ui/react'
import { format } from '~utils/date'
import isSameDay from 'date-fns/isSameDay'
import { useTranslation } from 'next-i18next'
import { ScheduleEvent } from '~@types/schedule-event.d'

interface Props {
  events: ScheduleEvent[]
  circleColor?: string
}

const BookingSelection = ({ events, circleColor = 'gray.200' }: Props) => {
  const { t } = useTranslation('place')

  return (
    <>
      {events.map((dispo) => (
        <Box key={dispo.extendedProps.id}>
          <Flex alignItems="center">
            <Circle size="6px" mb={0.5} bgColor={circleColor} />
            <Flex pl={3} alignItems="center">
              <Text>{format(dispo.start)}</Text>
              {!isSameDay(dispo.end, dispo.start) && (
                <Text pl={1.5}>
                  {' - '}
                  {format(dispo.end)}
                </Text>
              )}
              <Text textTransform="lowercase" pl={1.5}>
                {`(${
                  dispo.extendedProps.when
                    ? t(`schedule.${dispo.extendedProps.when}`)
                    : t(`schedule.type.${dispo.extendedProps.type}`)
                })`}
              </Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  )
}

export default BookingSelection
