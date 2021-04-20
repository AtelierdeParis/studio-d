import React, { useMemo } from 'react'
import { Flex, Box, Stack } from '@chakra-ui/react'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import isSunday from 'date-fns/isSunday'
import { useTranslation } from 'next-i18next'

interface Props {
  isMonth: boolean
  start: Date
  end: Date
}

const stylePeriodMonth = {
  top: 1,
  left: 1.5,
  right: 'auto',
}

const styleLastDay = {
  spacing: 0,
  alignItems: 'flex-start',
}

const PeriodEvent = ({ isMonth, start, end }: Props) => {
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
      fontSize="sm"
      {...(isMonth && stylePeriodMonth)}
      {...(isLastDay && styleLastDay)}
    >
      <Box color={status === 'selected' ? 'blue.500' : 'black'}>
        {`${formattedStart} - ${formattedEnd}`}
      </Box>
      <Box color="grayText.1">
        {t(`schedule.${isLastDay ? 'nbDays' : 'nbDays()'}`, { nb: nbDays })}
      </Box>
    </Stack>
  )
}

export default PeriodEvent
