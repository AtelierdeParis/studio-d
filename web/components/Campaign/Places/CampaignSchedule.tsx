import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Schedule from '~components/Account/Place/Schedule'
import ScheduleProvider from '~components/Account/Place/ScheduleProvider'
import PlaceFormBar from '~components/Account/Place/PlaceFormBar'
import { Espace } from '~typings/api'
import CampaignScheduleForm from '~components/Campaign/Places/CampaignScheduleForm'
import CampaignScheduleInfo from '~components/Campaign/Places/CampaignScheduleInfo'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { ScheduleEventWhen, ScheduleEventType } from '~@types/schedule-event.d'

interface Props {
  place: Espace
}

interface CampaignScheduleFormValues {
  type: string
  isCampaignEvent: boolean
  exclude_days: string[]
  offWeekDays: number[]
}

const CampaignPlaceSchedule = ({ place }: Props) => {
  const { t } = useTranslation('yup')
  const campaignScheduleSchema = yup.object().shape({
    start: yup.date().required(t('mixed.required')),
    type: yup.string().required(t('mixed.required')),
    accomodation: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(),
    isCampaignEvent: yup.boolean().required(t('mixed.required')),
    staff: yup
      .array()
      .of(yup.string())
      .min(1, t('mixed.required'))
      .required(t('mixed.required')),
    scene_grid: yup
      .boolean()
      .typeError(t('mixed.required'))
      .required(t('mixed.required')),
    exclude_days: yup.array(),
    offWeekDays: yup.array(),
  })
  const form = useForm<CampaignScheduleFormValues>({
    resolver: yupResolver(campaignScheduleSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      type: ScheduleEventType.PERIOD,
      isCampaignEvent: true,
      offWeekDays: [],
    },
  })
  const { eventsIdToDelete } = useContext(ScheduleContext)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (eventsIdToDelete.length > 0) {
      setShowForm(false)
    }
  }, [eventsIdToDelete.length])

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={4}>
          <Schedule isCampaignMode />

          <Box flex={1}>
            {showForm ? (
              <CampaignScheduleForm
                place={place}
                hideForm={() => setShowForm(false)}
              />
            ) : (
              <CampaignScheduleInfo
                place={place}
                showForm={() => setShowForm(true)}
              />
            )}
          </Box>
        </Stack>
      </ScheduleProvider>
      {place?.disponibilities.length === 0 && <PlaceFormBar isNotAvailable />}
    </FormProvider>
  )
}

export default CampaignPlaceSchedule
