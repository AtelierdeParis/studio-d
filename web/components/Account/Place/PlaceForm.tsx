import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Input,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Textarea,
  Select,
  Stack,
  Spacer,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import FormField from '~components/FormField'
import InputNumber from '~components/InputNumber'
import InputLocation from '~components/InputLocation'
import PlaceFormBar from '~components/Account/Place/PlaceFormBar'
import InputFile from '~components/InputFile'
import { yupResolver } from '@hookform/resolvers/yup'
import useToast from '~hooks/useToast'
import * as yup from 'yup'
import { Espace } from '~typings/api'
import Arrow from 'public/assets/img/arrow-right.svg'
import Check from 'public/assets/img/check.svg'
import { useIsComplete } from '~hooks/useIsComplete'

const Map = dynamic(() => import('~components/Map'), { ssr: false })

const getSchema = (place, t) => {
  return yup.object().shape({
    name: !place ? yup.string().required(t('account:errors.required')) : null,
    surface: yup
      .number()
      .min(1, t('account:errors.min', { min: 1 }))
      .required(t('account:errors.required')),
    roomLength: yup
      .number()
      .min(1, t('account:errors.min', { min: 1 }))
      .required(t('account:errors.required')),
    width: yup
      .number()
      .min(1, t('account:errors.min', { min: 1 }))
      .required(t('account:errors.required')),
    height: yup
      .number()
      .min(1, t('account:errors.min', { min: 1 }))
      .required(t('account:errors.required')),
    danceCarpet: yup.string().required(t('account:errors.required')),
    mirror: yup.string().required(t('account:errors.required')),
    danceBar: yup.string().required(t('account:errors.required')),
    accomodation: yup.string().required(t('account:errors.required')),
    technicalStaff: yup.string().required(t('account:errors.required')),
    floor: yup.string().required(t('account:errors.required')),
    address: yup.string().required(t('account:errors.required')),
    latitude: yup.string().required(t('account:errors.required')),
    longitude: yup.string().required(t('account:errors.required')),
    otherFloor: yup.string().when('floor', {
      is: 'other',
      then: yup.string().required(t('account:errors.required')),
    }),
  })
}

interface Props {
  place?: Espace
  onSubmit: (data: any) => Promise<any>
  isEditMode?: boolean
}

const getDefaultValues = (place) => {
  if (!place) return {}
  const { files, name, ...placeAttributes } = place
  return placeAttributes
}

const PlaceForm = ({ place = null, onSubmit, isEditMode = false }: Props) => {
  const { errorToast } = useToast()
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const isComplete = useIsComplete(place)
  const {
    register,
    errors,
    watch,
    control,
    formState,
    reset,
    handleSubmit,
    trigger,
  } = useForm({
    mode: isComplete ? 'onSubmit' : 'onChange',
    resolver: yupResolver(getSchema(place, t)),
    defaultValues: getDefaultValues(place),
  })

  const { floor, latitude, longitude, address } = watch([
    'floor',
    'address',
    'latitude',
    'longitude',
  ])

  useEffect(() => {
    if (isEditMode) {
      trigger()
    }
  }, [])

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
    <form onSubmit={handleSubmit(submitForm)}>
      <Box pb={{ base: 10, md: 20 }}>
        <Text textStyle="infoLabel">{t('form.detailsLabel')}</Text>
        <Box pb={8} px={2.5}>
          {!place && (
            <FormField label={t('form.name.label')} errors={errors.name} mb={6}>
              <Input name="name" ref={register} />
            </FormField>
          )}
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            columnGap={5}
            rowGap={6}
          >
            <FormField
              label={t('form.surface.label')}
              errors={errors.surface}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <InputNumber name="surface" control={control} />
            </FormField>
            <FormField
              label={t('form.length.label')}
              errors={errors.roomLength}
            >
              <InputNumber name="roomLength" control={control} />
            </FormField>
            <FormField
              label={t('form.width.label')}
              errors={errors.width}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <InputNumber name="width" control={control} />
            </FormField>
            <FormField
              label={t('form.height.label')}
              errors={errors.height}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <InputNumber name="height" control={control} />
            </FormField>
            <FormField
              label={t('form.mirror.label')}
              errors={errors.mirror}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <Select
                name="mirror"
                ref={register}
                placeholder={t('form.choose')}
              >
                <option value="true">{t('form.yes')}</option>
                <option value="false">{t('form.no')}</option>
              </Select>
            </FormField>
            <FormField
              label={t('form.danceCarpet.label')}
              errors={errors.danceCarpet}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <Select
                name="danceCarpet"
                ref={register}
                placeholder={t('form.choose')}
              >
                <option value="true">{t('form.yes')}</option>
                <option value="false">{t('form.no')}</option>
                <option value="possible">{t('form.possible')}</option>
              </Select>
            </FormField>
            <FormField
              label={t('form.danceBar.label')}
              errors={errors.danceBar}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <Select
                name="danceBar"
                ref={register}
                placeholder={t('form.choose')}
              >
                <option value="true">{t('form.yes')}</option>
                <option value="false">{t('form.no')}</option>
              </Select>
            </FormField>
          </SimpleGrid>
          <Flex mt={6} alignItems="center">
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
              columnGap={5}
              rowGap={6}
              w="100%"
            >
              <FormField
                label={t('form.accomodation.label')}
                errors={errors.accomodation}
                isComplete={isComplete && Boolean(place?.external_id)}
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
                isComplete={isComplete && Boolean(place?.external_id)}
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
            </SimpleGrid>
          </Flex>
          <Flex mb={{ base: 0, md: 14 }} mt={6} alignItems="center">
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
              columnGap={5}
              w="100%"
            >
              <FormField
                label={t('form.floor.label')}
                errors={errors.floor}
                isComplete={isComplete && Boolean(place?.external_id)}
              >
                <Select
                  name="floor"
                  ref={register}
                  placeholder={t('form.choose')}
                >
                  <option value="parquetTraditionnel">
                    {t('form.floor.traditional')}
                  </option>
                  <option value="plancherDanse">{t('form.floor.dance')}</option>
                  <option value="other">{t('form.floor.other')}</option>
                </Select>
              </FormField>
              {floor === 'other' && (
                <FormField
                  label={t('form.otherFloor.label')}
                  info={t('form.otherFloor.info')}
                  errors={errors.otherFloor}
                  gridColumn="2/5"
                  isComplete={isComplete && Boolean(place?.external_id)}
                >
                  <Input
                    name="otherFloor"
                    ref={register({
                      required: true,
                    })}
                  />
                </FormField>
              )}
            </SimpleGrid>
          </Flex>
        </Box>
        <Box>
          <Text textStyle="infoLabel">{t('form.textsLabel')}</Text>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={5}
            mb={10}
            px={2.5}
          >
            <FormField
              label={t('form.about.label')}
              errors={errors.about}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <Textarea
                name="about"
                ref={register}
                resize="none"
                h="215px"
                placeholder={t('form.about.placeholder')}
              />
            </FormField>
            <FormField
              label={t('form.details.label')}
              errors={errors.details}
              isComplete={isComplete && Boolean(place?.external_id)}
            >
              <Textarea
                name="details"
                ref={register}
                resize="none"
                h="215px"
                placeholder={t('form.details.placeholder')}
              />
            </FormField>
          </Stack>
        </Box>
        <InputFile control={control} place={place} />
        <Box>
          <Text textStyle="infoLabel" mt={{ base: 10, md: 16 }}>
            {t('form.location')}
          </Text>
          <Box px={2.5}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={5}
              mb={10}
              alignItems="flex-start"
            >
              <FormField
                label={t('form.address.label')}
                errors={errors.address}
                flex={1}
                isComplete={isComplete && Boolean(place?.external_id)}
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
                    <Map
                      flex={1}
                      h="250px"
                      markers={[{ latitude, longitude }]}
                      zoomControl={false}
                    />
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
            </Stack>
          </Box>
        </Box>
      </Box>
      {isEditMode &&
        (place?.disponibilities.length === 0 ||
          Object.keys(formState.dirtyFields).length > 0) && (
          <PlaceFormBar isNotAvailable={place?.disponibilities.length === 0}>
            <Flex alignItems="center">
              <Button
                variant="unstyled"
                color="gray.400"
                _hover={{ color: 'gray.500' }}
                onClick={() => reset()}
              >
                {t('cancel')}
              </Button>
              <Button
                ml={3}
                size="lg"
                leftIcon={<Check />}
                isLoading={isLoading}
                type="submit"
                isDisabled={Object.keys(formState.dirtyFields).length === 0}
              >
                {t('save')}
              </Button>
            </Flex>
          </PlaceFormBar>
        )}
      {!isEditMode && (
        <PlaceFormBar>
          <Button
            colorScheme="blue"
            size="lg"
            type="submit"
            isLoading={isLoading}
            isDisabled={Object.keys(formState.dirtyFields).length === 0}
            rightIcon={<Arrow />}
          >
            {t(`form.submit`)}
          </Button>
        </PlaceFormBar>
      )}
    </form>
  )
}

export default PlaceForm
