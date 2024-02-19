import React, { useEffect, useContext, useMemo } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import InputDate from '~components/InputDate'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import isSameDay from 'date-fns/isSameDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import InputMultiSelect from '~components/InputMultiSelect'
import { Control } from 'react-hook-form'
import { getDay } from 'date-fns'

const getEndDate = (
  startDate: Date,
  offWeekDays: number[],
  duration: number,
) => {
  let endDate = new Date(startDate)
  let selectedDays = 1
  const exclude_days = []
  if (offWeekDays.length < 7) {
    {
      while (selectedDays < duration + 1) {
        if (offWeekDays.includes(getDay(endDate))) {
          exclude_days.push(endDate.toString())
        } else {
          selectedDays++
        }
        if (selectedDays < duration + 1) {
          endDate = addDays(endDate, 1)
        }
      }
    }
  }

  return { endDate, exclude_days }
}

const CampaignDatePicker = ({ control }: { control?: Control }) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const { errors, watch, setValue } = useFormContext()
  const { type, start, when, offWeekDays } = watch([
    'type',
    'start',
    'when',
    'offWeekDays',
  ])

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
          // Prevent user from selecting a start day to close from other period
          total.push(
            eachDayOfInterval({
              start: subDays(event.start, currentCampaign.duration - 1),
              end: event.start,
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
      const { endDate, exclude_days } = getEndDate(
        new Date(start),
        offWeekDays,
        currentCampaign?.duration,
      )

      setValue('end', endDate)
      setValue('exclude_days', exclude_days)
    }
  }, [offWeekDays, start])

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
        name="offWeekDays"
        label={t('campaign.schedule.days_exclude.label')}
        placeholder={t('campaign.schedule.days_exclude.placeholder')}
        options={[1, 2, 3, 4, 5, 6, 0].map((day) => ({
          value: day,
          label: t(`campaign.schedule.days_exclude.${day}`),
        }))}
      />
      <Box display="none">
        <Controller
          as={<input />}
          name="exclude_days"
          control={control}
          defaultValue={[]}
        />
      </Box>
    </HStack>
  )
}

export default CampaignDatePicker