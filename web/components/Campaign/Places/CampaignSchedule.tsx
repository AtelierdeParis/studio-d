import React, { useState } from 'react'
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

interface Props {
  place: Espace
}

interface CampaignScheduleFormValues {
  type: string
  isCampaignEvent: boolean
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
    staff: yup.array().required(t('mixed.required')),
    scene_grid: yup
      .boolean()
      .typeError(t('mixed.required'))
      .required(t('mixed.required')),
    exclude_days: yup.array(),
  })
  const form = useForm<CampaignScheduleFormValues>({
    resolver: yupResolver(campaignScheduleSchema),
    defaultValues: {
      type: 'period',
      isCampaignEvent: true,
    },
  })
  const [showForm, setShowForm] = useState(false)

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={4}>
          <Box flex={1}>
            <Schedule isCampaignMode />
          </Box>

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
