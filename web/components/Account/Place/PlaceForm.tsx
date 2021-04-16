import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  Input,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Textarea,
  Select,
  Spacer,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import FormField from '~components/FormField'
import InputNumber from '~components/InputNumber'
import InputLocation from '~components/InputLocation'
import InputFile from '~components/InputFile'
import { yupResolver } from '@hookform/resolvers/yup'
import useToast from '~hooks/useToast'
import * as yup from 'yup'
import { Espace } from '~typings/api'
import Arrow from 'public/assets/img/arrow-right.svg'

const Map = dynamic(() => import('~components/Map'), { ssr: false })

const getSchema = (place) => {
  return yup.object().shape({
    name: !place ? yup.string().required() : null,
    surface: yup.number().required(),
    roomLength: yup.number().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    danceCarpet: yup.string().required(),
    mirror: yup.string().required(),
    danceBar: yup.string().required(),
    accomodation: yup.string().required(),
    technicalStaff: yup.string().required(),
    floor: yup.string().required(),
    address: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
    otherFloor: yup.string().when('floor', {
      is: 'other',
      then: yup.string().required(),
    }),
  })
}

interface IPlaceForm {
  place?: Espace
  onSubmit: (data: any) => Promise<any>
}

const getDefaultValues = (place) => {
  if (!place) return {}
  const { files, name, ...placeAttributes } = place
  return placeAttributes
}

const PlaceForm = ({ place = null, onSubmit }: IPlaceForm) => {
  const { errorToast } = useToast()
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const {
    register,
    errors,
    handleSubmit,
    watch,
    control,
    formState,
    reset,
  } = useForm({
    resolver: yupResolver(getSchema(place)),
    defaultValues: getDefaultValues(place),
  })

  const { floor, latitude, longitude, address } = watch([
    'floor',
    'address',
    'latitude',
    'longitude',
  ])

  const submitForm = (values) => {
    setLoading(true)
    onSubmit(values)
      .then((res) => {
        reset({
          ...res,
          removedFiles: [],
        })
      })
      .catch(() => errorToast(t('form.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(submitForm)}>
        <Text textStyle="infoLabel">{t('form.detailsLabel')}</Text>
        {!place && (
          <FormField label={t('form.name.label')} errors={errors.name} mb={6}>
            <Input name="name" ref={register} />
          </FormField>
        )}
        <SimpleGrid columns={4} columnGap={5} rowGap={6}>
          <FormField label={t('form.surface.label')} errors={errors.surface}>
            <InputNumber name="surface" control={control} />
          </FormField>
          <FormField label={t('form.length.label')} errors={errors.roomLength}>
            <InputNumber name="roomLength" control={control} />
          </FormField>
          <FormField label={t('form.width.label')} errors={errors.width}>
            <InputNumber name="width" control={control} />
          </FormField>
          <FormField label={t('form.height.label')} errors={errors.height}>
            <InputNumber name="height" control={control} />
          </FormField>
          <FormField label={t('form.mirror.label')} errors={errors.mirror}>
            <Select name="mirror" ref={register} placeholder={t('form.choose')}>
              <option value="true">{t('form.yes')}</option>
              <option value="false">{t('form.no')}</option>
            </Select>
          </FormField>
          <FormField
            label={t('form.danceCarpet.label')}
            errors={errors.danceCarpet}
          >
            <Select
              name="danceCarpet"
              ref={register}
              placeholder={t('form.choose')}
            >
              <option value="true">{t('form.yes')}</option>
              <option value="false">{t('form.no')}</option>
            </Select>
          </FormField>
          <FormField label={t('form.danceBar.label')} errors={errors.danceBar}>
            <Select
              name="danceBar"
              ref={register}
              placeholder={t('form.choose')}
            >
              <option value="true">{t('form.yes')}</option>
              <option value="false">{t('form.no')}</option>
            </Select>
          </FormField>
          <FormField
            label={t('form.accomodation.label')}
            errors={errors.accomodation}
          >
            <Select
              name="accomodation"
              ref={register}
              placeholder={t('form.choose')}
            >
              <option value="true">{t('form.yes')}</option>
              <option value="false">{t('form.no')}</option>
            </Select>
          </FormField>
          <FormField
            label={t('form.technicalStaff.label')}
            errors={errors.technicalStaff}
          >
            <Select
              name="technicalStaff"
              ref={register}
              placeholder={t('form.choose')}
            >
              <option value="true">{t('form.yes')}</option>
              <option value="false">{t('form.no')}</option>
            </Select>
          </FormField>
          <FormField label={t('form.floor.label')} errors={errors.floor}>
            <Select name="floor" ref={register} placeholder={t('form.choose')}>
              <option value="parquetTraditionnel">
                {t('form.floor.traditional')}
              </option>
              <option value="plancherDanse">{t('form.floor.dance')}</option>
              <option value="other">{t('form.floor.other')}</option>
            </Select>
          </FormField>
        </SimpleGrid>
        <Flex mb={14} mt={6} alignItems="center">
          {floor === 'other' && (
            <FormField
              label={t('form.otherFloor.label')}
              info={t('form.otherFloor.info')}
              errors={errors.otherFloor}
            >
              <Input
                name="otherFloor"
                ref={register({
                  required: true,
                })}
              />
            </FormField>
          )}
        </Flex>
        <Text textStyle="infoLabel">{t('form.textsLabel')}</Text>
        <HStack spacing={5} mb={10}>
          <FormField label={t('form.about.label')} errors={errors.about}>
            <Textarea
              name="about"
              ref={register}
              resize="none"
              h="215px"
              placeholder={t('form.about.placeholder')}
            />
          </FormField>
          <FormField label={t('form.details.label')} errors={errors.details}>
            <Textarea
              name="details"
              ref={register}
              resize="none"
              h="215px"
              placeholder={t('form.details.placeholder')}
            />
          </FormField>
        </HStack>
        <InputFile control={control} place={place} />
        <Text textStyle="infoLabel" mt={16}>
          {t('form.location')}
        </Text>
        <HStack spacing={5} mb={10} alignItems="flex-start">
          <FormField
            label={t('form.address.label')}
            errors={errors.address}
            flex={1}
          >
            <InputLocation
              name="address"
              control={control}
              placeholder={t('form.address.placeholder')}
            />
          </FormField>
          {Boolean(latitude) && Boolean(longitude) ? (
            <FormField label={t('form.geolocation.label')} flex={1}>
              <Box>
                <Map flex={1} h="250px" markers={[{ latitude, longitude }]} />
                <Text
                  px={3.5}
                  py={2.5}
                  border="1px solid"
                  borderColor="gray.200"
                  borderBottomRadius="sm"
                  borderTopColor="transparent"
                >
                  {address}
                </Text>
              </Box>
            </FormField>
          ) : (
            <Spacer flex={1} />
          )}
        </HStack>
        <Flex justifyContent="center" mt={18}>
          <Button
            colorScheme="blue"
            size="lg"
            mt={6}
            type="submit"
            isLoading={isLoading}
            isDisabled={Object.keys(formState.dirtyFields).length === 0}
            rightIcon={<Arrow />}
          >
            {t(`form.submit`)}
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default PlaceForm
