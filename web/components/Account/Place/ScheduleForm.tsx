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
import * as yup from 'yup'
import { Place } from '~@types/place.d'
import Arrow from 'public/assets/img/arrow-right.svg'

const schema = yup.object().shape({
  // name: !place ? yup.string().required() : null,
  surface: yup.number().required(),
  // roomLength: yup.number().required(),
  // width: yup.number().required(),
  // height: yup.number().required(),
  // mirror: yup.string().required(),
  // danceBar: yup.string().required(),
  // accomodation: yup.string().required(),
  // technicalStaff: yup.string().required(),
  // floor: yup.string().required(),
  // address: yup.string().required(),
  // latitude: yup.string().required(),
  // longitude: yup.string().required(),
  // otherFloor: yup.string().when('floor', {
  //   is: 'other',
  //   then: yup.string().required(),
  // }),
})

interface IScheduleForm {}

const getDefaultValues = (place) => {
  if (!place) return {}
  const { files, name, ...placeAttributes } = place
  return placeAttributes
}

const ScheduleForm = ({}: IScheduleForm) => {
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
    resolver: yupResolver(schema),
  })

  const { floor, latitude, longitude, address } = watch([
    'floor',
    'address',
    'latitude',
    'longitude',
  ])

  const submitForm = (values) => {
    // setLoading(true)
    // onSubmit(values)
    //   .then((res) => {
    //     reset({
    //       ...res,
    //       removedFiles: [],
    //     })
    //   })
    //   .finally(() => setLoading(false))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormField
          label={t('schedule.addSlot.label')}
          errors={errors.name}
          mb={6}
        >
          <Select
            name="addSlot"
            ref={register}
            placeholder={t('schedule.addSlot.placeholder')}
          >
            <option></option>
          </Select>
        </FormField>

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

export default ScheduleForm
