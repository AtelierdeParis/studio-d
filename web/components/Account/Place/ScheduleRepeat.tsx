import React, { useMemo, useEffect, useContext } from 'react'
import {
  Flex,
  Checkbox,
  Stack,
  Select,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FormField from '~components/FormField'
import InputNumber from '~components/InputNumber'
import { ScheduleEventType } from '~@types/schedule-event.d'
import { useFormContext, Control } from 'react-hook-form'
import differenceInDays from 'date-fns/differenceInDays'
import isSameDay from 'date-fns/isSameDay'
import ScheduleContext from '~components/Account/Place/ScheduleContext'

interface IScheduleRepeat {
  control: Control
}

const ScheduleRepeat = ({ control }: IScheduleRepeat) => {
  const { t } = useTranslation('place')
  const { errors, watch, register, setError, clearErrors } = useFormContext()
  const { newEvents, oldEvents } = useContext(ScheduleContext)
  const { type, repeat, start, end, when } = watch([
    'type',
    'repeat',
    'start',
    'end',
    'when',
  ])

  useEffect(() => {
    const eventRepeatedOnAnother = newEvents.some((event) => {
      const currentEventType = event.extendedProps.type

      const hasEventSameDay =
        (currentEventType !== 'punctual' ||
          (currentEventType === 'punctual' && when === 'full')) &&
        event.extendedProps.hasEventSameDay

      const hasEventSamePartOftheDay =
        event.extendedProps.type === 'punctual' &&
        oldEvents.some(
          (oldEvent) =>
            isSameDay(oldEvent.start, event.start) &&
            oldEvent.extendedProps.when === event.extendedProps.when,
        )

      return hasEventSameDay || hasEventSamePartOftheDay
    })
    if (
      repeat &&
      eventRepeatedOnAnother &&
      !errors.repeatNb &&
      !errors.repeatType
    ) {
      setError('repeatNb', {
        type: 'manual',
      })
      setError('repeatType', {
        type: 'manual',
      })
    } else if (
      !eventRepeatedOnAnother &&
      (errors.repeatNb || errors.repeatType)
    ) {
      clearErrors(['repeatNb', 'repeatType'])
    }
  }, [newEvents, oldEvents, repeat, start, when])

  const daysInPeriod = useMemo(
    () => differenceInDays(new Date(end), new Date(start)),
    [start, end],
  )

  if (daysInPeriod >= 30) return null

  return (
    <>
      <Flex alignItems="center">
        <Checkbox
          name="repeat"
          ref={register}
          size="lg"
          id="repeat"
          borderColor="grayText.1"
        />
        <FormLabel m={0} pl={3} htmlFor="repeat">
          {t(`schedule.repeat`)}
        </FormLabel>
      </Flex>
      {repeat && (
        <>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={5}
            w="100%"
            alignItems="flex-start"
          >
            <FormField label={t('schedule.repeatNb')} errors={errors.repeatNb}>
              <InputNumber name="repeatNb" control={control} min={0} />
            </FormField>
            <FormField
              label={t('schedule.repeatType.label')}
              errors={errors.repeatType}
            >
              <Select
                name="repeatType"
                ref={register}
                placeholder={t('schedule.repeatType.placeholder')}
              >
                {type !== ScheduleEventType.PERIOD && (
                  <option value="day">{t('schedule.repeatType.day')}</option>
                )}
                {(type !== ScheduleEventType.PERIOD ||
                  (type === ScheduleEventType.PERIOD && daysInPeriod < 7)) && (
                  <option value="week">{t('schedule.repeatType.week')}</option>
                )}
                <option value="month">{t('schedule.repeatType.month')}</option>
              </Select>
            </FormField>
          </Stack>
          {(errors.repeatNb || errors.repeatType) && (
            <Text color="red.500" fontSize="sm">
              {t('schedule.repeatError')}
            </Text>
          )}
        </>
      )}
    </>
  )
}

export default ScheduleRepeat
