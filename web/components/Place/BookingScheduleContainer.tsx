import React, { useState } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import BookingSchedule from '~components/Place/BookingSchedule'

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

  return (
    <Box bgColor="blue.100" p={6} borderRadius="sm">
      <Flex justifyContent="space-between" pb={14}>
        <Flex></Flex>
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
      <BookingSchedule disponibilities={place?.disponibilities} />
    </Box>
  )
}

export default BookingScheduleContainer
