import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Calendar from 'public/assets/img/calendar.svg'
import BookingScheduleContainer from '~components/Place/Booking/BookingScheduleContainer'
import { Espace } from '~typings/api'

const PlaceDetailCalendar = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')

  return (
    <>
      <Flex alignItems="center" mb={{ base: 4, lg: 8 }}>
        <Box w="18px" mt="-4px">
          <Calendar stroke="black" />
        </Box>
        <Text textStyle="h2" pl={5}>
          {t('detail.calendar')}
        </Text>
      </Flex>
      <BookingScheduleContainer place={place} />
    </>
  )
}

export default PlaceDetailCalendar
