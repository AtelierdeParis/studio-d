import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  VStack,
  Button,
  Flex,
  FormLabel,
  Select,
  Checkbox,
} from '@chakra-ui/react'
import InputNumber from '~components/InputNumber'
import InputDate from '~components/InputDate'
import { useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import * as yup from 'yup'
import { ScheduleEvent, ScheduleEventType } from '~@types/schedule-event.d'
import { Place } from '~@types/place.d'
import { createDisponibility } from '~api/api'
import useToast from '~hooks/useToast'

export const schema = yup.object().shape({
  slot: yup.string().required(),
  slotType: yup.string().when('slot', {
    is: 'day',
    then: yup.string().required(),
  }),
  start: yup.date().required(),
  end: yup.date().when('slot', {
    is: 'period',
    then: yup.date().required(),
  }),
  repeat: yup.boolean(),
  repeatNb: yup.number().when('repeat', {
    is: true,
    then: yup.number().required(),
  }),
  repeatType: yup.string().when('repeat', {
    is: true,
    then: yup.string().required(),
  }),
})

interface IScheduleForm {
  scheduleEvents?: ScheduleEvent[]
  place: Place
  hideForm: () => void
}

const ScheduleForm = ({
  scheduleEvents = [],
  place,
  hideForm,
}: IScheduleForm) => {
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const { errorToast, successToast } = useToast()
  const { register, errors, handleSubmit, watch, control } = useFormContext()
  const { slot, repeat } = watch(['slot', 'repeat'])

  const submitForm = async (data) => {
    if (scheduleEvents.length === 0) return

    const events = []
    const defaultEvent = {
      type: data.slotType || ScheduleEventType.FULL,
      start: data.start,
      end: data.end || data.start,
    }
    const lastEvent = scheduleEvents[scheduleEvents.length - 1]

    if (data.slot === 'day' && data.repeat) {
      if (data.repeatType === 'day') {
        defaultEvent.end = lastEvent.date
        events.push(defaultEvent)
      } else if (data.repeatType === 'week' || data.repeatType === 'month') {
        scheduleEvents.map((event) => {
          events.push({
            type: data.slotType,
            start: event.date,
            end: event.date,
          })
        })
      }
    } else {
      events.push(defaultEvent)
    }

    setLoading(true)
    Promise.all(
      events.map((event) =>
        createDisponibility({ ...event, espace: place.id }),
      ),
    )
      .then(() => {
        successToast(t('schedule.success'))
        hideForm()
      })
      .catch(() => errorToast(t('schedule.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(submitForm)}>
        <VStack spacing={5} alignItems="flex-start">
          <HStack spacing={5} w="100%" alignItems="flex-start">
            <FormField label={t('schedule.addSlot.label')} errors={errors.slot}>
              <Select
                name="slot"
                ref={register}
                placeholder={t('schedule.addSlot.placeholder')}
              >
                <option value="day">{t('schedule.addSlot.day')}</option>
                <option value="period">{t('schedule.addSlot.period')}</option>
              </Select>
            </FormField>
            {slot === 'day' && (
              <FormField
                label={t('schedule.slotType.label')}
                errors={errors.slotType}
              >
                <Select
                  name="slotType"
                  ref={register}
                  placeholder={t('schedule.slotType.placeholder')}
                >
                  <option value={ScheduleEventType.MORNING}>
                    {t('schedule.morning')}
                  </option>
                  <option value={ScheduleEventType.AFTERNOON}>
                    {t('schedule.afternoon')}
                  </option>
                  <option value={ScheduleEventType.FULL}>
                    {t('schedule.both')}
                  </option>
                </Select>
              </FormField>
            )}
          </HStack>
          {Boolean(slot) && (
            <>
              <HStack spacing={5} w="100%" alignItems="flex-start">
                <FormField
                  label={
                    slot === 'period'
                      ? t('schedule.startDate')
                      : t('schedule.date')
                  }
                  errors={errors.start}
                >
                  <InputDate name="start" control={control} />
                </FormField>
                {slot === 'period' && (
                  <FormField label={t('schedule.endDate')} errors={errors.end}>
                    <InputDate name="end" control={control} />
                  </FormField>
                )}
              </HStack>
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
                <HStack spacing={5} w="100%" alignItems="flex-start">
                  <FormField
                    label={t('schedule.repeatNb')}
                    errors={errors.repeatNb}
                  >
                    <InputNumber name="repeatNb" control={control} />
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
                      <option value="day">
                        {t('schedule.repeatType.day')}
                      </option>
                      <option value="week">
                        {t('schedule.repeatType.week')}
                      </option>
                      <option value="month">
                        {t('schedule.repeatType.month')}
                      </option>
                    </Select>
                  </FormField>
                </HStack>
              )}
            </>
          )}
          <Flex justifyContent="flex-end" mt={18} alignItems="center" w="100%">
            <Button
              variant="unstyled"
              mr={5}
              color="gray.500"
              onClick={hideForm}
            >
              {t(`schedule.cancel`)}
            </Button>
            <Button size="lg" type="submit" isLoading={isLoading}>
              {t(`list.add`)}
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  )
}

export default ScheduleForm
