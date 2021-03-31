import React, { useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FormField from '~components/FormField'
import InputPassword from '~components/InputPassword'
import { useTranslation } from 'next-i18next'
import {
  Box,
  HStack,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Letter from 'public/assets/img/letter.svg'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'

interface IAccountInformation {
  user: UsersPermissionsUser
}
interface FormInformation
  extends Pick<UsersPermissionsUser, 'email' | 'address' | 'city' | 'zipCode' | 'phone'> {
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .test('is-incorrect', '${path} must be at least 10 characters', (value) => {
      if (value !== '') return value.length >= 10
      return true
    }),
  address: yup.string().required(),
  zipCode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string(),
})

const AccountInformation = ({ user }: IAccountInformation) => {
  const { t } = useTranslation('account')
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const {
    register,
    errors,
    handleSubmit,
    formState,
    reset,
  } = useForm<FormInformation>({
    defaultValues: {
      email: user.email,
      address: user.address,
      zipCode: user.zipCode,
      city: user.city,
      phone: user.phone,
      password: undefined,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const filteredData = Object.keys(data).reduce((total, current) => {
      if (Boolean(data[current])) total[current] = data[current]
      return total
    }, {})
    setLoading(true)

    client.users.putUsers(filteredData)
      .then(() => {
        reset(filteredData, { dirtyFields: false })
        successToast(t('information.success'))
      })
      .catch(() => errorToast(t('information.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box py={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Text textStyle="groupLabel">{t('information.username')}</Text>
          <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
            <FormField
              label={t('information.email.label')}
              errors={errors.email}
              isRequired
            >
              <InputGroup>
                <Input name="email" type="email" ref={register} />
                <InputRightElement children={<Letter />} />
              </InputGroup>
            </FormField>
            <FormField
              label={t('information.password.label')}
              info={t('information.password.info')}
              errors={errors.password}
            >
              <InputPassword
                register={register}
                placeholder={t('information.password.placeholder')}
              />
            </FormField>
          </HStack>
        </Box>
        <Box my={14}>
          <Text textStyle="groupLabel">{t('information.address.title')}</Text>
          <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
            <FormField
              label={t('information.address.label')}
              errors={errors.address}
              isRequired
              flex={1}
            >
              <Input name="address" ref={register} />
            </FormField>
            <HStack spacing={5} flex={1}>
              <FormField
                label={t('information.zipCode.label')}
                errors={errors.zipCode}
                isRequired
              >
                <Input name="zipCode" ref={register} />
              </FormField>
              <FormField
                label={t('information.city.label')}
                errors={errors.city}
                isRequired
              >
                <Input name="city" ref={register} />
              </FormField>
            </HStack>
          </HStack>
        </Box>
        <Box my={14}>
          <Text textStyle="groupLabel">{t('information.contact')}</Text>
          <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
            <FormField
              label={t('information.phone.label')}
              errors={errors.phone}
              flex={1}
            >
              <Input name="phone" ref={register} />
            </FormField>
            <Spacer flex={1} />
          </HStack>
        </Box>
        <Flex justifyContent="center">
          <Button
            colorScheme="blue"
            size="lg"
            isLoading={isLoading}
            type="submit"
            isDisabled={Object.keys(formState.dirtyFields).length === 0}
          >
            {t('information.submit')}
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account'])),
      },
    }
  },
)

export default AccountInformation
