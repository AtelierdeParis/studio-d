import React, { useEffect, useContext, useMemo } from 'react'
import { HStack } from '@chakra-ui/react'
import InputDate from '~components/InputDate'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'
import { ScheduleEventType } from '~@types/schedule-event.d'
import { useFormContext } from 'react-hook-form'
import isAfter from 'date-fns/isAfter'
import min from 'date-fns/min'
import isSameDay from 'date-fns/isSameDay'
import addDays from 'date-fns/addDays'
import ScheduleContext from '~components/Account/Place/ScheduleContext'

const ScheduleDates = ({ control }) => {
  const { t } = useTranslation('place')
  const { errors, watch, setValue } = useFormContext()
  const { type, start, end } = watch(['type', 'start', 'end'])
  const { oldEventsDate } = useContext(ScheduleContext)

  const maxDate = useMemo(() => {
    if (type !== ScheduleEventType.PERIOD || !start) return null
    const futurDates = oldEventsDate.filter((date) => isAfter(date, start))
    return min(futurDates)
  }, [oldEventsDate, start])

  useEffect(() => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    if (isAfter(startDate, endDate) || isSameDay(startDate, endDate)) {
      setValue('end', '')
    }
  }, [start, end])

  return (
    <HStack spacing={5} w="100%" alignItems="flex-start">
      <FormField
        label={
          type === ScheduleEventType.PERIOD
            ? t('schedule.startDate')
            : t('schedule.date')
        }
        errors={errors.start}
      >
        <InputDate
          name="start"
          control={control}
          minDate={new Date()}
          excludeDates={oldEventsDate}
        />
      </FormField>
      {type === ScheduleEventType.PERIOD && (
        <FormField label={t('schedule.endDate')} errors={errors.end}>
          <InputDate
            name="end"
            control={control}
            isDisabled={!Boolean(start)}
            minDate={start ? addDays(new Date(start), 1) : null}
            maxDate={maxDate}
            excludeDates={oldEventsDate}
          />
        </FormField>
      )}
    </HStack>
  )
}

export default ScheduleDates
