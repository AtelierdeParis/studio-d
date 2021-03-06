import React, { useMemo, useState } from 'react'
import FormField from '~components/FormField'
import format from 'date-fns/format'
import { Text, Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import max from 'date-fns/max'
import InputDate from '~components/InputDate'
import { client } from '~api/client-api'
import { Espace } from '~typings/api'
import { useQueryClient } from 'react-query'
import isSameDay from 'date-fns/isSameDay'
import isAfter from 'date-fns/isAfter'

interface IScheduleFilledUntil {
  place: Espace
}

const ScheduleFilledUntil = ({ place }: IScheduleFilledUntil) => {
  const { t } = useTranslation('place')
  const [isVisible, setVisible] = useState(false)
  const queryClient = useQueryClient()

  const minDate = useMemo(() => {
    if (!place?.disponibilities || place.disponibilities.length === 0)
      return null
    return max(place?.disponibilities.map(({ end }) => new Date(end), null))
  }, [place?.disponibilities])

  const filledUntil = useMemo(() => {
    if (!place?.filledUntil) return null
    return new Date(place.filledUntil)
  }, [place?.filledUntil])

  const isFilled = useMemo(() => {
    return (
      filledUntil &&
      minDate &&
      (isAfter(filledUntil, minDate) || isSameDay(filledUntil, minDate))
    )
  }, [filledUntil, minDate])

  const onChange = (date: Date) => {
    if (place?.filledUntil && isSameDay(date, filledUntil)) return null
    client.espaces
      .espacesUpdate(place.id, { filledUntil: date })
      .then((res) => {
        setVisible(false)
        queryClient.setQueryData(['place', place.slug], res.data)
      })
  }

  if (!minDate) return null

  if (isVisible) {
    return (
      <FormField label={t('schedule.filledUntil')}>
        <InputDate
          name="until"
          placeholder="--/--/----"
          minDate={minDate}
          defaultValue={isFilled ? filledUntil : minDate}
          onChange={onChange}
        />
      </FormField>
    )
  }
  return (
    <Box>
      <Text fontSize={{ base: 'sm', sm: 'md' }}>
        {t(`schedule.${isFilled ? 'filledText' : 'notFilledText'}`, {
          date: format(isFilled ? filledUntil : minDate, 'dd/MM/yyyy'),
        })}
      </Text>
      <Button
        variant="unstyled"
        onClick={() => setVisible(true)}
        fontFamily="mabry medium"
        textDecoration="underline"
        px={0}
      >
        {t('schedule.modifyDate')}
      </Button>
    </Box>
  )
}

export default ScheduleFilledUntil
