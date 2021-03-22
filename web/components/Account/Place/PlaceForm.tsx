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
import useToast from '~hooks/useToast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createNewPlace } from '~api/api'
import { User } from '~@types/user.d'
import Arrow from 'public/assets/img/arrow-right.svg'

const Map = dynamic(() => import('~components/Map'), { ssr: false })

const getSchema = () => {
  return yup.object().shape({
    name: yup.string().required(),
    surface: yup.number().required(),
    roomLength: yup.number().required(),
    width: yup.number().required(),
    height: yup.number().required(),
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
  onSuccess: (any) => void
  user: User
}

const PlaceForm = ({ onSuccess, user }: IPlaceForm) => {
  const { t } = useTranslation('place')
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const { register, errors, handleSubmit, watch, control } = useForm({
    resolver: yupResolver(getSchema()),
  })
  const { floor, latitude, longitude, address } = watch([
    'floor',
    'address',
    'latitude',
    'longitude',
  ])

  const onSubmit = (values) => {
    setLoading(true)
    const { form, data } = Object.keys(values).reduce(
      (total, key) => {
        if (key === 'files') {
          console.log(
            Array.from(values[key]).map((file: any, index) => {
              return file?.display_name
                ? Object.defineProperty(file, 'name', {
                    value: file.display_name,
                    writable: true,
                  })
                : file
            }),
          )
          Array.from(values[key]).map((file: any, index) =>
            total.form.append(
              `files[${index}]`,
              file?.display_name
                ? new File([file], file.display_name, { type: file.type })
                : file,
            ),
          )
        } else {
          total.data[key] = values[key]
        }
        return total
      },
      { form: new FormData(), data: { users_permissions_user: user.id } },
    )

    form.append('data', JSON.stringify(data))

    createNewPlace(form)
      .then(onSuccess)
      .catch(() => errorToast(t('common:error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text textStyle="infoLabel">{t('form.detailsLabel')}</Text>
        <FormField label={t('form.name.label')} errors={errors.name} mb={6}>
          <Input name="name" ref={register} />
        </FormField>
        <SimpleGrid columns={4} columnGap={5} rowGap={6} mb={14}>
          <FormField label={t('form.surface.label')} errors={errors.surface}>
            <InputNumber name="surface" register={register} />
          </FormField>
          <FormField label={t('form.length.label')} errors={errors.roomLength}>
            <InputNumber name="roomLength" register={register} />
          </FormField>
          <FormField label={t('form.width.label')} errors={errors.width}>
            <InputNumber name="width" register={register} />
          </FormField>
          <FormField label={t('form.height.label')} errors={errors.height}>
            <InputNumber name="height" register={register} />
          </FormField>
          <FormField label={t('form.mirror.label')} errors={errors.mirror}>
            <Select name="mirror" ref={register} placeholder={t('form.choose')}>
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
              <option value="floor">{t('form.floor.floor')}</option>
              <option value="carpet">{t('form.floor.carpet')}</option>
              <option value="other">{t('form.floor.other')}</option>
            </Select>
          </FormField>
          {floor === 'other' && (
            <FormField
              label={t('form.otherFloor.label')}
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
        </SimpleGrid>
        <Text textStyle="infoLabel">{t('form.textsLabel')}</Text>
        <HStack spacing={5} mb={10}>
          <FormField label={t('form.about.label')} errors={errors.about}>
            <Textarea name="about" ref={register} resize="none" h="215px" />
          </FormField>
          <FormField label={t('form.details.label')} errors={errors.details}>
            <Textarea name="details" ref={register} resize="none" h="215px" />
          </FormField>
        </HStack>
        <InputFile register={register} />
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
                <Map
                  flex={1}
                  h="250px"
                  latitude={latitude}
                  longitude={longitude}
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
        </HStack>
        <Flex justifyContent="center" mt={18}>
          <Button
            colorScheme="blue"
            size="lg"
            mt={6}
            type="submit"
            isLoading={isLoading}
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
