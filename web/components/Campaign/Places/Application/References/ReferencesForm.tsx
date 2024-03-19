import { Button, ButtonGroup, Flex, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import TextField from '~components/Campaign/Places/Application/Inputs/TextField'
import { FormProvider, useForm } from 'react-hook-form'
import NumberField from '~components/Campaign/Places/Application/Inputs/NumberField'
import InputMultiSelect from '~components/InputMultiSelect'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Reference } from '~@types/reference'

const ReferencesForm = ({
  handleCreate,
  handleUpdate,
  currentReference,
  clearIndex,
}: {
  handleUpdate: (values: Reference) => void
  handleCreate: (values: any) => void
  currentReference?: Reference
  clearIndex: () => void
}) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  const schema = yup.object().shape({
    title: yup.string().required(t('global.required')),
    year: yup.number().required(t('global.required')),
    actors: yup.number().required(t('global.required')),
  })

  const methods = useForm<Reference>({
    resolver: yupResolver(schema),
    defaultValues: currentReference || {
      title: '',
      year: undefined,
      actors: 0,
    },
  })

  const { handleSubmit, reset, getValues } = methods

  const onSubmit = (values) => {
    if (currentReference) {
      handleUpdate(values)
    } else {
      handleCreate(values)
    }
    clearIndex()
    reset({})
  }

  return (
    <FormProvider {...methods}>
      <form style={{ width: '100%' }}>
        <VStack spacing={4} width="100%">
          <TextField
            name="title"
            placeholder={t(
              'campaignApplication.references.references_title_placeholder',
            )}
            label={t('campaignApplication.references.references_title')}
          />

          <HStack spacing={4} width="100%">
            <TextField
              name="year"
              label={t('campaignApplication.references.references_year')}
              placeholder={t(
                'campaignApplication.references.references_year_placeholder',
              )}
              type="number"
            />
            <NumberField
              name="actors"
              label={t('campaignApplication.references.references_actor')}
              placeholder={t(
                'campaignApplication.references.references_actor_placeholder',
              )}
              min={0}
            />
          </HStack>
          <InputMultiSelect
            name="coproducers"
            label={t('campaignApplication.references.references_coproducers')}
            placeholder={t(
              'campaignApplication.references.references_coproducers_placeholder',
            )}
            options={currentCampaign?.users_permissions_users.map((user) => ({
              value: user?.id,
              label: user?.structureName,
            }))}
          />
          <TextField
            name="other"
            label={t('campaignApplication.references.references_others')}
            placeholder={t(
              'campaignApplication.references.references_others_placeholder',
            )}
          />
          <Flex width="100%" justifyContent="flex-end">
            <ButtonGroup>
              <Button
                colorScheme="blue"
                size="xl"
                onClick={() => handleSubmit(onSubmit)()}
              >
                {currentReference
                  ? t('campaignApplication.references.modify')
                  : t('campaignApplication.references.add')}
              </Button>
              <Button
                colorScheme="blue"
                size="xl"
                onClick={() => clearIndex()}
                variant="outline"
              >
                {t('campaignApplication.references.cancel')}
              </Button>
            </ButtonGroup>
          </Flex>
        </VStack>
      </form>
    </FormProvider>
  )
}

export default ReferencesForm
