import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  Input,
  VStack,
  Button,
  Flex,
  FormLabel,
  Select,
  Checkbox,
} from '@chakra-ui/react'
import InputNumber from '~components/InputNumber'
import { useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import * as yup from 'yup'
import { Place } from '~@types/place.d'

export const schema = yup.object().shape({
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

  const { register, errors, handleSubmit, watch, control } = useFormContext()

  const { slot, repeat } = watch(['slot', 'repeat'])

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
        <VStack spacing={5} alignItems="flex-start">
          <HStack spacing={5} w="100%">
            <FormField label={t('schedule.addSlot.label')} errors={errors.slot}>
              <Select
                name="slot"
                ref={register}
                placeholder={t('schedule.addSlot.placeholder')}
              >
                <option value="day">{t('schedule.addSlot.day')}</option>
                <option value="period">{t('schedule.addSlot.period')}</option>
              </Select>
            </FormField>
            {slot === 'day' && (
              <FormField
                label={t('schedule.slotType.label')}
                errors={errors.slotType}
              >
                <Select
                  name="slotType"
                  ref={register}
                  placeholder={t('schedule.slotType.placeholder')}
                >
                  <option value="morning">{t('schedule.morning')}</option>
                  <option value="afternoon">{t('schedule.afternoon')}</option>
                  <option value="both">{t('schedule.both')}</option>
                </Select>
              </FormField>
            )}
          </HStack>
          {Boolean(slot) && (
            <>
              <FormField label={t('schedule.date')} errors={errors.date}>
                <Input type="text" name="date" ref={register} />
              </FormField>
              <Flex alignItems="center">
                <Checkbox
                  name="repeat"
                  ref={register}
                  size="lg"
                  borderColor="grayText.1"
                />
                <FormLabel m={0} pl={3}>
                  {t(`schedule.repeat`)}
                </FormLabel>
              </Flex>
              {repeat && (
                <HStack spacing={5} w="100%">
                  <FormField
                    label={t('schedule.repeatNb')}
                    errors={errors.repeatNb}
                  >
                    <InputNumber name="repeatNb" control={control} />
                  </FormField>
                  <FormField
                    label={t('schedule.repeatType.label')}
                    errors={errors.repeatType}
                  >
                    <Select
                      name="repeatType"
                      ref={register}
                      placeholder={t('schedule.repeatType.placeholder')}
                    >
                      <option value="day">
                        {t('schedule.repeatType.day')}
                      </option>
                      <option value="week">
                        {t('schedule.repeatType.week')}
                      </option>
                      <option value="month">
                        {t('schedule.repeatType.month')}
                      </option>
                    </Select>
                  </FormField>
                </HStack>
              )}
              <Flex
                justifyContent="flex-end"
                mt={18}
                alignItems="center"
                w="100%"
              >
                <Button variant="unstyled" mr={5} color="gray.500">
                  {t(`schedule.cancel`)}
                </Button>
                <Button
                  size="lg"
                  type="submit"
                  isLoading={isLoading}
                  // isDisabled={Object.keys(formState.dirtyFields).length === 0}
                >
                  {t(`list.add`)}
                </Button>
              </Flex>
            </>
          )}
        </VStack>
      </form>
    </Box>
  )
}

export default ScheduleForm
