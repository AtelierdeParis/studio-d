import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  VStack,
  Button,
  Input,
  Select,
  Text,
  InputGroup,
  InputRightElement,
  CloseButton,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import { Espace } from '~typings/api'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import CampaignDatePicker from '~components/Campaign/Places/Admin/CampaignDatePicker'
import InputMultiSelect from '~components/InputMultiSelect'
import { client } from '~api/client-api'
import { setHours } from 'date-fns'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

export const STAFF_VALUES = ['no', 'light', 'sound', 'video', 'scene']

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
    register,
    control,
    reset,
    clearErrors,
    watch,
    setValue,
  } = useFormContext()

  const staff = watch('staff')

  useEffect(() => {
    if (staff?.includes('no') && staff?.length > 1) {
      setValue('staff', ['no'])
    }
  }, [staff])

  const submitForm = async ({
    start,
    end,
    staff,
    accomodation,
    scene_grid,
    exclude_days,
  }) => {
    setLoading(true)

    client.bulk
      .disponibilitiesCreate([
        {
          start: setHours(start, 6).toISOString(),
          end: setHours(end, 23).toISOString(),
          type: 'period',
          when: null,
          //@ts-expect-error
          espace: place.id,
          staff,
          //@ts-expect-error
          campaign: currentCampaign.id,
          accomodation,
          scene_grid,
          status: 'available',
          exclude_days,
        },
      ])
      .then((res) => {
        queryClient.setQueryData(['place', place.slug], {
          ...place,
          disponibilities: [
            ...place.disponibilities,
            ...res.data.map((el) => ({
              ...el,
              campaign: currentCampaign.id,
            })),
          ],
        })
        successToast(t('schedule.success'))
        hideForm()
      })
      .catch(() => errorToast(t('schedule.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box paddingX={6}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Input ref={register} name="type" hidden />
        <Input ref={register} name="isCampaignEvent" hidden />
        <VStack spacing={5} alignItems="flex-start">
          <VStack
            justifyContent="flex-end"
            alignItems="flex-start"
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

            <Box display={staff?.includes('no') && 'none'} width="100%">
              <InputMultiSelect
                name="staff"
                label={t('campaign.schedule.staff.label')}
                placeholder={t('campaign.schedule.staff.placeholder')}
                options={STAFF_VALUES.map((el) => ({
                  value: el,
                  label: t(`campaign.schedule.staff.${el}`),
                }))}
              />
            </Box>
            {staff?.includes('no') && (
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  value={t(`campaign.schedule.staff.no`) as string}
                  disabled
                />
                <InputRightElement width="4.5rem">
                  <CloseButton
                    backgroundColor="transparent!important"
                    onClick={() => {
                      setValue('staff', [])
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            )}

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
