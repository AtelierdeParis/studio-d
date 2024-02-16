import { Box, Flex, Text } from '@chakra-ui/react'
import BookingScheduleContainer from '~components/Place/Booking/BookingScheduleContainer'
import Calendar from 'public/assets/img/calendar.svg'
import { Espace } from '~typings/api'
import { useTranslation } from 'next-i18next'

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
