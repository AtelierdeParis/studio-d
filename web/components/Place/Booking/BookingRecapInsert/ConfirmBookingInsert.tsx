import { Box, Text, ButtonGroup, Button, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { ScheduleEvent } from '~@types/schedule-event'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'
import BookingSelection from '~components/Place/Booking/BookingSelection'

const ConfirmBookingInsert = ({
  isCampaignMode,
  selected,
}: {
  isCampaignMode?: boolean
  selected: ScheduleEvent[]
}) => {
  const { setSelected, setApplicationView } = useContext(BookingScheduleContext)

  const { t } = useTranslation('place')

  return (
    <Stack
      direction={isCampaignMode ? { base: 'column', lg: 'row' } : 'row'}
      width="100%"
    >
      <Box flex={1}>
        <Text>
          {t(`detail.nbSelected${selected?.length > 1 ? 's' : ''}`, {
            nb: selected.length,
          })}
        </Text>
        <Box display={{ base: 'none', md: 'block' }}>
          <BookingSelection events={selected} isCampaignMode={isCampaignMode} />
        </Box>
      </Box>
      <ButtonGroup
        flex={0}
        mt={{ base: 2, md: 0 }}
        alignItems="center"
        justifyContent={{ base: 'flex-end', md: 'flex-end' }}
        w="100%"
        spacing={4}
      >
        <Button onClick={() => setSelected([])} variant="unstyled">
          {t('detail.cancel')}
        </Button>
        <Button
          size="lg"
          onClick={() => {
            window.scrollTo(0, 0)
            setApplicationView(true)
          }}
        >
          {t('detail.submit')}
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default ConfirmBookingInsert
