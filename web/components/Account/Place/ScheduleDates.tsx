import React, { useEffect } from 'react'
import { HStack } from '@chakra-ui/react'
import InputDate from '~components/InputDate'
import addDays from 'date-fns/addDays'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'
import { ScheduleEventType } from '~@types/schedule-event.d'
import { useFormContext } from 'react-hook-form'
import isAfter from 'date-fns/isAfter'

const ScheduleDates = ({ control }) => {
  const { t } = useTranslation('place')
  const { errors, watch, setValue } = useFormContext()
  const { type, start, end } = watch(['type', 'start', 'end'])

  useEffect(() => {
    if (isAfter(new Date(start), new Date(end))) {
      setValue('end', '')
    }
  }, [start])

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
        <InputDate name="start" control={control} minDate={new Date()} />
      </FormField>
      {type === ScheduleEventType.PERIOD && (
        <FormField label={t('schedule.endDate')} errors={errors.end}>
          <InputDate
            name="end"
            control={control}
            isDisabled={!Boolean(start)}
            minDate={start ? addDays(new Date(start), 1) : null}
          />
        </FormField>
      )}
    </HStack>
  )
}

export default ScheduleDates
