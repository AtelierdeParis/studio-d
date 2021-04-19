import React, { useState, useMemo } from 'react'
import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import BookingScheduleWeek from '~components/Place/BookingScheduleWeek'
import BookingScheduleMonth from '~components/Place/BookingScheduleMonth'
import BookingRecap from '~components/Place/BookingRecap'
import { createOldEvents } from '~utils/schedule'

const styleSelected = {
  color: 'blue.500',
  borderBottomColor: 'blue.500',
}

interface Props {
  place: Espace
}

const BookingScheduleContainer = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const [isMonthView, setMonthView] = useState<boolean>(false)
  const events = useMemo(() => createOldEvents(place?.disponibilities), [
    place?.disponibilities,
  ])

  return (
    <Box bgColor="blue.100" p={6} borderRadius="sm">
      <Flex justifyContent="space-between" pb={14} alignItems="flex-start">
        <Flex>
          {place?.scheduleDetails && (
            <Box maxW="600px">
              <Text
                fontWeight="500"
                fontFamily="mabry medium"
                color="blue.500"
                pb={1}
              >
                {t('detail.infoPlace')}
              </Text>
              <Text color="grayText.1">{place.scheduleDetails}</Text>
            </Box>
          )}
        </Flex>
        <Flex>
          <Button
            variant="line"
            color="gray.500"
            borderBottomColor="transparent"
            {...(!isMonthView ? styleSelected : {})}
            onClick={() => setMonthView(false)}
          >
            {t('detail.week')}
          </Button>
          <Button
            ml={5}
            variant="line"
            color="gray.500"
            borderBottomColor="transparent"
            {...(isMonthView ? styleSelected : {})}
            onClick={() => setMonthView(true)}
          >
            {t('detail.month')}
          </Button>
        </Flex>
      </Flex>
      {isMonthView ? (
        <BookingScheduleMonth place={place} events={events} />
      ) : (
        <BookingScheduleWeek place={place} events={events} />
      )}
      <BookingRecap />
    </Box>
  )
}

export default BookingScheduleContainer
