import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { ScheduleEvent } from '~@types/schedule-event'

const NotConfirmedBookingInsert = ({
  isCampaignMode,
  selected,
}: {
  isCampaignMode?: boolean
  selected: ScheduleEvent[]
}) => {
  const { t } = useTranslation('place')
  const isPlural = useMemo(() => (selected.length > 1 ? 's' : ''), [selected])

  return (
    <Box>
      <Text>
        {t(`detail.notConfirm${isPlural}${isCampaignMode ? 'Campaign' : ''}`, {
          nb: selected.length,
        })}
      </Text>
    </Box>
  )
}

export default NotConfirmedBookingInsert
