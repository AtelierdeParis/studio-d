import { Box, VStack, Text, ButtonGroup, Button } from '@chakra-ui/react'
import ApplicationCreation from '~components/Campaign/Places/Application/ApplicationCreation'
import ApplicationGeneral from '~components/Campaign/Places/Application/ApplicationGeneral'
import ApplicationEligibility from '~components/Campaign/Places/Application/ApplicationEligibility'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useTranslation } from 'next-i18next'
import useToast from '~hooks/useToast'
import { useState } from 'react'
import { client } from '~api/client-api'
import { ScheduleEvent } from '~@types/schedule-event'
import { useCurrentUser } from '~hooks/useCurrentUser'
import ApplicationReferences from '~components/Campaign/Places/Application/References/ApplicationReferences'
import { Espace } from '~typings/api'

const getDefaultValues = (applications) => {
  if (applications?.length > 0) {
    const lastApplication = applications[applications?.length - 1]

    const data = {
      ...lastApplication,
      references:
        lastApplication?.references?.map((el) => ({
          ...el,
          coproducers: Array.isArray(el.coproducers)
            ? el.coproducers
            : el.coproducers.split(',').map((el) => +el),
        })) || [],
      already_supported: lastApplication?.already_supported.toString(),
    }
    return data
  }
  return {}
}
const ApplicationForm = ({
  back,
  setConfirmed,
  events,
  place,
}: {
  back: () => void
  setConfirmed: (value: boolean) => void
  events: ScheduleEvent[]
  place: Espace
}) => {
  console.log(place)
  const { applications } = useCurrentUser()
  const { t } = useTranslation('place')
  const schema = yup.object().shape({
    already_supported: yup.boolean().required(t('global.required')),
    cv: yup.string().required(t('global.required')),
    creation_title: yup.string().required(t('global.required')),
    creation_dancers: yup.number().required(t('global.required')),
    // creation_file: yup
    //   .array()
    //   .min(1, t('global.required'))
    //   .required(t('global.required')),
    creation_summary: yup.string().required(t('global.required')),
    creation_techical_requirements: yup.string().required(t('global.required')),
    eligibility: yup.boolean().required(t('global.required')),
  })
  const { data: user } = useCurrentUser()

  const { currentCampaign } = useCampaignContext()

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(applications),
  })
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit } = form

  const onSubmit = async (formValues) => {
    setLoading(true)
    try {
      await Promise.all(
        events.map(async (event) => {
          const { form, data } = Object.keys(formValues).reduce(
            (total, key) => {
              if (key === 'creation_file') {
                Array.from(formValues[key]).map((file: any, index) =>
                  total.form.append(
                    `files.creation_file`,
                    file?.caption
                      ? new File([file], file.caption, { type: file.type })
                      : file,
                  ),
                )
              } else if (key === 'references') {
                total.data[key] = JSON.stringify(formValues[key])
              } else {
                total.data[key] = formValues[key]
              }
              return total
            },
            {
              form: new FormData(),
              data: {
                company: user.id,
                place: place.users_permissions_user.id,
                disponibility: event?.extendedProps?.id,
                campaign: currentCampaign?.id,
              },
            },
          )

          form.append('data', JSON.stringify(data))
          //@ts-expect-error
          await client.applications.applicationsCreate(form)
        }),
      )
      setConfirmed(true)
    } catch (e) {
      errorToast(t('confirm.error'))
    }
    setLoading(false)
  }

  return (
    <Box flex={2}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack flex={2} spacing={14}>
            <ApplicationReferences />
            <ApplicationGeneral place={place} />
            <ApplicationCreation />
            <ApplicationEligibility />

            <VStack
              backgroundColor="blue.200"
              p={8}
              borderRadius="8px"
              color="grayText.1"
            >
              <Text>
                {t('campaignApplication.confirm', {
                  place: currentCampaign?.title,
                })}
              </Text>

              <ButtonGroup>
                <ButtonGroup
                  spacing={5}
                  alignSelf="center"
                  alignItems="center"
                  pt={6}
                >
                  <Button
                    layerStyle="link"
                    variant="unstyled"
                    color="grayText.1"
                    onClick={() => back()}
                  >
                    {t('confirm.back')}
                  </Button>
                  <Button
                    size="lg"
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    {t('confirm.submit')}
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </VStack>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default ApplicationForm
