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
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

const ScheduleDates = ({ control }) => {
  const { t } = useTranslation('place')
  const { errors, watch, setValue } = useFormContext()
  const { type, start, end, when } = watch(['type', 'start', 'end', 'when'])
  const { oldEventsDate, oldEvents } = useContext(ScheduleContext)

  const maxDate = useMemo(() => {
    if (type !== ScheduleEventType.PERIOD || !start) return null
    const futurDates = oldEventsDate.filter((date) => isAfter(date, start))
    return min(futurDates)
  }, [oldEventsDate, start])

  const excludeDates = useMemo(() => {
    if (!oldEvents || oldEvents.length === 0) return []
    return oldEvents
      .reduce((total, event) => {
        if (
          !isSameDay(event.start, event.end) &&
          event.extendedProps.type === 'period'
        ) {
          total.push(
            eachDayOfInterval({
              start: event.start,
              end: event.end,
            }),
          )
        } else if (event.extendedProps.type === 'day') {
          total.push(event.start)
        } else if (
          event.extendedProps.type === 'punctual' &&
          (event.extendedProps.hasEventSameDay ||
            type !== 'punctual' ||
            when === 'full' ||
            (when && when === event.extendedProps.when))
        ) {
          total.push(event.start)
        }
        return total
      }, [])
      .flat()
  }, [oldEvents, type, when])

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
          minDate={addDays(new Date(), 1)}
          excludeDates={excludeDates}
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
