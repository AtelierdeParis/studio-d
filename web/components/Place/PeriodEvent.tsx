import React, { useMemo } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import isSunday from 'date-fns/isSunday'
import { useTranslation } from 'next-i18next'

interface Props {
  isMonth: boolean
  start: Date
  end: Date
  isCampaignEvent?: boolean
}

const stylePeriodMonth = {
  top: 1,
  right: 1.5,
}

const styleLastDay = {
  spacing: 0,
  alignItems: 'flex-start',
  left: 1.5,
  right: 'auto',
}

const PeriodEvent = ({ isMonth, start, end, isCampaignEvent }: Props) => {
  const { t } = useTranslation('place')
  const nbDays = useMemo(() => differenceInDays(end, start) + 1, [start, end])
  const isLastDay = useMemo(() => isSunday(start), [start])
  const { formattedStart, formattedEnd } = useMemo(() => {
    const type = isMonth ? 'd' : 'd MMM'
    return {
      formattedStart: format(start, type),
      formattedEnd: format(end, type),
    }
  }, [start, end])

  return (
    <Stack
      className="periodEvent"
      pos="absolute"
      top={6}
      right={3}
      alignItems="flex-end"
      direction={isLastDay ? 'column' : 'row'}
      fontSize={{ base: '11px', sm: 'sm' }}
      {...(isMonth && stylePeriodMonth)}
      {...(isLastDay && styleLastDay)}
      id="licorne"
    >
      <Box color={status === 'selected' ? 'blue.500' : 'black'}>
        {`${formattedStart} - ${formattedEnd}`}
      </Box>
      {!isCampaignEvent && (
        <Box color="grayText.1">
          {t(`schedule.${isLastDay ? 'nbDays' : 'nbDays()'}`, {
            nb: nbDays,
          })}
        </Box>
      )}
    </Stack>
  )
}

export default PeriodEvent
