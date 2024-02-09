import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  VStack,
  Button,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import { Espace } from '~typings/api'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import CampaignDatePicker from '~components/Campaign/Places/CampaignDatePicker'
import InputMultiSelect from '~components/InputMultiSelect'
import { client } from '~api/client-api'
import { setHours } from 'date-fns'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const STAFF_VALUES = ['no', 'light', 'sound', 'video', 'scene']

interface Props {
  place: Espace
  hideForm: () => void
}

const CampaignScheduleForm = ({ place, hideForm }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  const {
    errors,
    handleSubmit,
    getValues,
    register,
    control,
    reset,
    clearErrors,
  } = useFormContext()

  const submitForm = async ({
    start,
    end,
    staff,
    accomodation,
    scene_grid,
  }) => {
    setLoading(true)
    client.disponibilities
      .disponibilitiesCreate({
        start: setHours(start, 6).toISOString(),
        end: setHours(end, 23).toISOString(),
        type: 'period',
        when: null,
        espace: place.id,
        staff,
        campaign: currentCampaign.id,
        accomodation,
        scene_grid,
        status: 'available',
      })
      .then((res) => {
        queryClient.setQueryData(['place', place.slug], {
          ...place,
          disponibilities: [
            ...place.disponibilities,
            { ...res.data, campaign: res.data?.campaign?.id },
          ],
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
        <Input ref={register} name="type" hidden />
        <Input ref={register} name="isCampaignEvent" hidden />
        <VStack spacing={5} alignItems="flex-start">
          <VStack
            justifyContent="flex-end"
            alignItems="center"
            w="100%"
            spacing={6}
          >
            <Text opacity={0.5}>
              {t('campaign.schedule.duration', {
                duration: currentCampaign?.duration,

                ...currentCampaign,
                campaign_start: format(
                  currentCampaign?.campaign_start,
                  'dd MMMM',
                ),
                campaign_end: format(
                  currentCampaign?.campaign_end,
                  'dd MMMM yyyy',
                ),
              })}
            </Text>
            <CampaignDatePicker control={control} />

            <InputMultiSelect
              name="staff"
              label={t('campaign.schedule.staff.label')}
              placeholder={t('campaign.schedule.staff.placeholder')}
              options={STAFF_VALUES.map((el) => ({
                value: el,
                label: t(`campaign.schedule.staff.${el}`),
              }))}
            />
            <HStack width="100%" alignItems="flex-start">
              <FormField
                label={t('campaign.schedule.accomodation.label')}
                errors={errors.accomodation}
                flex={1}
              >
                <Select
                  name="accomodation"
                  ref={register}
                  placeholder={t('campaign.schedule.accomodation.placeholder')}
                >
                  {Array.from({ length: 5 }, (v, i) => (
                    <option value={i} key={i}>
                      {t(`campaign.schedule.accomodation.${i}`)}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField
                label={t('campaign.schedule.scene_grid.label')}
                errors={errors.scene_grid}
                flex={1}
              >
                <Select
                  name="scene_grid"
                  ref={register}
                  placeholder={t('campaign.schedule.scene_grid.placeholder')}
                >
                  <option value={'false'}>
                    {t('campaign.schedule.scene_grid.false')}
                  </option>
                  <option value={'true'}>
                    {t('campaign.schedule.scene_grid.true')}
                  </option>
                </Select>
              </FormField>
            </HStack>

            <HStack justifyContent="flex-end" width="100%">
              <Button
                variant="unstyled"
                mr={5}
                color="gray.500"
                onClick={() => {
                  clearErrors()
                  reset()
                  hideForm()
                }}
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
            </HStack>
          </VStack>
        </VStack>
      </form>
    </Box>
  )
}

export default CampaignScheduleForm
