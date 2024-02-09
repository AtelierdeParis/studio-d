import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HStack, Box, VStack, Button, Flex, Select } from '@chakra-ui/react'
import ScheduleDates from '~components/Account/Place/ScheduleDates'
import ScheduleRepeat from '~components/Account/Place/ScheduleRepeat'
import ScheduleDispositif from '~components/Account/Place/ScheduleDispositif'
import { useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import * as yup from 'yup'
import { ScheduleEventWhen, ScheduleEventType } from '~@types/schedule-event.d'
import { client } from '~api/client-api'
import { Espace } from '~typings/api'
import { createDbEvent } from '~utils/schedule'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { isSameDay } from 'date-fns'

export const schema = yup.object().shape({
  type: yup.string().required(),
  dispositif: yup.string().optional(),
  when: yup.string().when('type', {
    is: ScheduleEventType.PUNCTUAL,
    then: yup.string().required(),
  }),
  start: yup.date().required(),
  end: yup.date().when('type', {
    is: ScheduleEventType.PERIOD,
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

interface Props {
  place: Espace
  hideForm: () => void
}

const ScheduleForm = ({ place, hideForm }: Props) => {
  const { newEvents, oldEventsDate, oldEvents } = useContext(ScheduleContext)
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const [hideChoices, setHideChoices] = useState(false)
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  const {
    register,
    errors,
    handleSubmit,
    watch,
    control,
    getValues,
  } = useFormContext()
  const { type, repeat, start, when } = watch([
    'type',
    'repeat',
    'start',
    'when',
  ])

  useEffect(() => {
    if (
      start &&
      type &&
      type === 'punctual' &&
      oldEventsDate.some((date) => isSameDay(date, start))
    ) {
      setHideChoices(true)
    } else if (hideChoices) {
      setHideChoices(false)
    }
  }, [start, type, oldEventsDate])

  const submitForm = async ({ type, start, end, when, dispositif }) => {
    if (newEvents.length === 0) return
    const events = []

    if (
      [
        ScheduleEventType.PUNCTUAL,
        ScheduleEventType.DAY,
        ScheduleEventType.PERIOD,
      ].includes(type)
    ) {
      if (repeat) {
        newEvents.map((event) => {
          events.push(createDbEvent(type, event.start, when, event.end))
        })
      } else {
        events.push(createDbEvent(type, start, when, end))
      }
    }

    if (events.flat().length === 0) return

    setLoading(true)
    client.bulk
      .disponibilitiesCreate(
        events.flat().map((event) => ({
          ...event,
          espace: place.id,
          dispositif: dispositif !== '' ? dispositif : null,
        })),
      )
      .then((res) => {
        queryClient.setQueryData(['place', place.slug], {
          ...place,
          disponibilities: [...place.disponibilities, ...res.data],
        })
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
            <FormField label={t('schedule.type.label')} errors={errors.type}>
              <Select
                name="type"
                ref={register}
                placeholder={t('schedule.type.placeholder')}
              >
                <option value={ScheduleEventType.PUNCTUAL}>
                  {t('schedule.type.punctual')}
                </option>
                {!hideChoices && (
                  <>
                    <option value={ScheduleEventType.DAY}>
                      {t('schedule.type.day')}
                    </option>
                    <option value={ScheduleEventType.PERIOD}>
                      {t('schedule.type.period')}
                    </option>
                  </>
                )}
              </Select>
            </FormField>
            {type === ScheduleEventType.PUNCTUAL && (
              <FormField label={t('schedule.when.label')} errors={errors.when}>
                <Select
                  name="when"
                  ref={register}
                  placeholder={t('schedule.when.placeholder')}
                >
                  {(!hideChoices ||
                    (hideChoices &&
                      (when === 'morning' ||
                        oldEvents.some(
                          (event) =>
                            isSameDay(event.start, start) &&
                            event.extendedProps.when === 'afternoon',
                        )))) && (
                    <option value={ScheduleEventWhen.MORNING}>
                      {t('schedule.morning')}
                    </option>
                  )}
                  {(!hideChoices ||
                    (hideChoices &&
                      (when === 'afternoon' ||
                        oldEvents.some(
                          (event) =>
                            isSameDay(event.start, start) &&
                            event.extendedProps.when === 'morning',
                        )))) && (
                    <option value={ScheduleEventWhen.AFTERNOON}>
                      {t('schedule.afternoon')}
                    </option>
                  )}
                  {!hideChoices && (
                    <option value={ScheduleEventWhen.FULL}>
                      {t('schedule.both')}
                    </option>
                  )}
                </Select>
              </FormField>
            )}
          </HStack>
          {Boolean(type) && (
            <>
              <ScheduleDates control={control} />
              <ScheduleRepeat control={control} />
              <ScheduleDispositif control={control} />
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
            <Button
              size="lg"
              type="submit"
              isLoading={isLoading}
              isDisabled={Object.keys(errors).length > 0}
            >
              {t(`list.add`)}
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  )
}

export default ScheduleForm
