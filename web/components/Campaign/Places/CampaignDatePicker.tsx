import React, { useEffect, useContext, useMemo } from 'react'
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react'
import InputDate from '~components/InputDate'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'
import { ScheduleEventType } from '~@types/schedule-event.d'
import { useFormContext } from 'react-hook-form'
import isSameDay from 'date-fns/isSameDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import InputMultiSelect from '~components/InputMultiSelect'
import { Control } from 'react-hook-form'

const CampaignDatePicker = ({ control }: { control?: Control }) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const { errors, watch, setValue, register, getValues } = useFormContext()
  const { type, start, when } = watch(['type', 'start', 'end', 'when'])

  const { oldEvents } = useContext(ScheduleContext)

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
    if (start) {
      const startDate = new Date(start)
      setValue('end', addDays(startDate, currentCampaign?.duration - 1))
    }
  }, [start])

  return (
    <HStack spacing={5} w="100%" alignItems="flex-start">
      <FormField label={t('schedule.startDate')} errors={errors.start} flex={1}>
        <InputDate
          name="start"
          control={control}
          minDate={new Date(currentCampaign?.campaign_start)}
          maxDate={subDays(
            new Date(currentCampaign?.campaign_end),
            currentCampaign?.duration - 1,
          )}
          excludeDates={excludeDates}
        />
      </FormField>
      <Box display="none">
        <InputDate name="end" control={control} />
      </Box>

      <InputMultiSelect
        name="exclude_days"
        label={t('campaign.schedule.days_exclude.label')}
        placeholder={t('campaign.schedule.days_exclude.placeholder')}
        options={Array.from({ length: 7 }, (v, i) => ({
          value: i.toString(),
          label: t(`campaign.schedule.days_exclude.${i}`),
        }))}
        isDisabled={true}
      />
    </HStack>
  )
}

export default CampaignDatePicker
