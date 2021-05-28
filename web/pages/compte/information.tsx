import React, { useState, useEffect } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FormField from '~components/FormField'
import InputPassword from '~components/InputPassword'
import AskPasswordModal from '~components/Account/AskPasswordModal'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Flex,
  Spacer,
  Button,
  VStack,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Letter from 'public/assets/img/letter.svg'
import { client } from '~api/client-api'
import { NewUsersPermissionsUser } from '~typings/api'
import useToast from '~hooks/useToast'
import { useUserIsComplete } from '~hooks/useUserIsComplete'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import MigrationMessage from '~components/MigrationMessage'
import Loading from '~components/Loading'
import { ROUTE_ACCOUNT_PLACES, ROUTE_ACCOUNT } from '~constants'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

interface Props {
  user: UsersPermissionsUser
}
interface FormInformation extends UsersPermissionsUser {
  password: string
}

const getSchema = (user: UsersPermissionsUser, t) => {
  if (!user) return null
  const schema = {
    firstname: yup.string().required(t('errors.required')),
    lastname: yup.string().required(t('errors.required')),
    // email: yup.string().email().required(t('errors.required')),
    // password: yup.string().test({
    //   message: 'Le mot de passe doit faire au minimum 10 caractères',
    //   test: (value) => {
    //     if (value !== '') return value.length >= 10
    //     return true
    //   },
    // }),
    structureName: yup.string().required(t('errors.required')),
    address: yup.string().required(t('errors.required')),
    phone: yup
      .string()
      .test({
        message: 'Le format du téléphone est incorrect',
        test: (value) => {
          const match = value.match(
            /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8,12}/i,
          )
          if (!match) return false
          return match[0] === value
        },
      })
      .required(t('errors.required')),
    license: yup
      .string()
      .test({
        message: 'Les licences doivent être séparés par des virgules',
        test: (value) => {
          const match = value.match(/[a-z0-9]+(, ?[a-z0-9]+)*/i)
          if (!match) return false
          return match[0] === value
        },
      })
      .required(),
    website: yup.string().test({
      message: 'Url incorrect',
      test: (value) => {
        if (value === '') return true
        const match = value.match(
          /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        )
        if (!match) return false
        return match[0] === value
      },
    }),
    zipCode: yup.string().required(t('errors.required')),
    city: yup.string().required(t('errors.required')),
    country: yup.string().required(t('errors.required')),
    siret: yup
      .string()
      .required(t('errors.required'))
      .min(14, t('errors.min', { min: 14 }))
      .max(14, t('errors.max', { max: 14 })),
    ape: yup
      .string()
      .required(t('errors.required'))
      .min(5, t('errors.min', { min: 5 }))
      .max(5, t('errors.max', { max: 5 })),
  }

  if (user.type === 'company') {
    schema['choreographer'] = yup.string().required(t('errors.required'))
    schema['insuranceName'] = yup.string().required(t('errors.required'))
    schema['insuranceNumber'] = yup.string().required(t('errors.required'))
  } else {
    schema['legalRepresentative'] = yup.string().required(t('errors.required'))
    schema['statusRepresentative'] = yup.string().required(t('errors.required'))
  }

  return yup.object().shape(schema)
}

const AccountInformation = ({ user }: Props) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('account')
  const isComplete = useUserIsComplete(user)
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const {
    register,
    errors,
    getValues,
    formState,
    reset,
    handleSubmit,
    trigger,
  } = useForm<FormInformation>({
    mode: isComplete ? 'onSubmit' : 'onChange',
    defaultValues: {
      ...user,
      password: undefined,
    },
    // @ts-ignore
    resolver: yupResolver(getSchema(user, t)),
  })

  useEffect(() => {
    trigger()
  }, [])

  const save = (data) => {
    const filteredData = Object.keys(data).reduce((total, current) => {
      if (Boolean(data[current])) total[current] = data[current]
      return total
    }, {})
    setLoading(true)

    client.users
      .putUsers(filteredData as NewUsersPermissionsUser)
      .then((res) => {
        if (user.external_id && !isComplete) {
          router.push(
            user.type === 'place' ? ROUTE_ACCOUNT_PLACES : ROUTE_ACCOUNT,
          )
        }
        queryClient.setQueryData(['me'], res.data)
        reset(filteredData, { dirtyFields: false })
        successToast(t('information.success'))
      })
      .catch((res) => {
        if (res?.response?.data?.data?.id) {
          errorToast(t(res?.response?.data?.data?.id))
        } else {
          errorToast(t('information.error'))
        }
      })
      .finally(() => setLoading(false))
  }

  const onSubmit = (data) => {
    if (
      (!!data.email && data.email !== user?.email) ||
      (!!data.password && data.password !== '')
    ) {
      setShowModal(true)
      return
    }
    save(data)
  }

  return (
    <Loading isLoading={!user} isCentered>
      <Box pt={{ base: 4, sm: 8 }} pb={8}>
        <NextSeo title={t('title.info')} />
        {showModal && (
          <AskPasswordModal
            onSuccess={() => save(getValues())}
            setShowModal={setShowModal}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {user?.external_id && !isComplete && (
            <MigrationMessage
              title={t('information.migration.title')}
              message={t('information.migration.message')}
            />
          )}
          {user?.confirmed && user?.accepted && (
            <Box mb={{ base: 10, sm: 14 }}>
              <Text textStyle="groupLabel">{t('information.username')}</Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.email.label')}
                  errors={errors.email}
                  isRequired
                  isComplete={isComplete}
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
                  isComplete={isComplete}
                >
                  <InputPassword
                    register={register}
                    placeholder={t('information.password.placeholder')}
                  />
                </FormField>
              </Stack>
            </Box>
          )}
          <Box mb={{ base: 10, sm: 14 }}>
            <Text textStyle="groupLabel">{t('information.address.title')}</Text>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={5}
              w="100%"
              alignItems="flex-start"
              pl={2.5}
              pr={{ base: 2.5, md: 0 }}
            >
              <FormField
                label={t('information.address.label')}
                errors={errors.address}
                isRequired
                flex={1}
                isComplete={isComplete}
              >
                <Input name="address" ref={register} />
              </FormField>
              <VStack
                direction="column"
                flex={1}
                alignItems="flex-start"
                spacing={5}
                w={{ base: '100%', md: 'auto' }}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={5}
                  w="100%"
                >
                  <FormField
                    label={t('information.zipCode.label')}
                    errors={errors.zipCode}
                    isRequired
                    isComplete={isComplete}
                  >
                    <Input name="zipCode" ref={register} />
                  </FormField>
                  <FormField
                    label={t('information.city.label')}
                    errors={errors.city}
                    isRequired
                    isComplete={isComplete}
                  >
                    <Input name="city" ref={register} />
                  </FormField>
                </Stack>
                <FormField
                  label={t('information.country.label')}
                  errors={errors.country}
                  isRequired
                  isComplete={isComplete}
                >
                  <Input name="country" ref={register} />
                </FormField>
              </VStack>
            </Stack>
          </Box>
          <Box my={14}>
            <Text textStyle="groupLabel">{t('information.info')}</Text>
            <VStack spacing={5}>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.firstname')}
                  errors={errors.firstname}
                  flex={1}
                  isComplete={isComplete}
                >
                  <Input name="firstname" ref={register} />
                </FormField>
                <FormField
                  label={t('information.lastname')}
                  errors={errors.lastname}
                  flex={1}
                  isComplete={isComplete}
                >
                  <Input name="lastname" ref={register} />
                </FormField>
              </Stack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.structure')}
                  errors={errors.structureName}
                  flex={1}
                  isRequired
                  isComplete={isComplete}
                >
                  <Input name="structureName" ref={register} />
                </FormField>
                <FormField
                  label={t('information.socialReason.label')}
                  info={t('information.socialReason.info')}
                  errors={errors.socialReason}
                  flex={1}
                  isComplete={isComplete}
                >
                  <Input name="socialReason" ref={register} />
                </FormField>
              </Stack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.siret')}
                  errors={errors.siret}
                  isComplete={isComplete}
                  isRequired
                >
                  <Input name="siret" ref={register} />
                </FormField>
                <FormField
                  label={t('information.ape')}
                  errors={errors.ape}
                  isComplete={isComplete}
                  isRequired
                >
                  <Input name="ape" ref={register} />
                </FormField>
              </Stack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.phone.label')}
                  errors={errors.phone}
                  isComplete={isComplete}
                  isRequired
                >
                  <Input name="phone" ref={register} />
                </FormField>
                <FormField
                  label={t('information.license.label')}
                  info={t('information.license.info')}
                  errors={errors.license}
                  isComplete={isComplete}
                  isRequired
                >
                  <Input name="license" ref={register} />
                </FormField>
              </Stack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                <FormField
                  label={t('information.website')}
                  errors={errors.website}
                  isComplete={isComplete}
                >
                  <Input name="website" ref={register} />
                </FormField>
                {user?.type === 'company' ? (
                  <FormField
                    label={t('information.choreographer')}
                    errors={errors.choreographer}
                    isComplete={isComplete}
                  >
                    <Input name="choreographer" ref={register} />
                  </FormField>
                ) : (
                  <FormField
                    label={t('information.legalRepresentative')}
                    errors={errors.legalRepresentative}
                    isComplete={isComplete}
                  >
                    <Input name="legalRepresentative" ref={register} />
                  </FormField>
                )}
              </Stack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={5}
                w="100%"
                alignItems="flex-start"
                pl={2.5}
                pr={{ base: 2.5, md: 0 }}
              >
                {user?.type === 'company' ? (
                  <>
                    <FormField
                      label={t('information.insuranceName')}
                      errors={errors.insuranceName}
                      isComplete={isComplete}
                    >
                      <Input name="insuranceName" ref={register} />
                    </FormField>
                    <FormField
                      label={t('information.insuranceNumber')}
                      errors={errors.insuranceNumber}
                      isComplete={isComplete}
                    >
                      <Input name="insuranceNumber" ref={register} />
                    </FormField>
                  </>
                ) : (
                  <>
                    <FormField
                      flex={1}
                      label={t('information.qualityRepresentative')}
                      errors={errors.statusRepresentative}
                      isComplete={isComplete}
                    >
                      <Input name="statusRepresentative" ref={register} />
                    </FormField>
                    <Spacer flex={1} />
                  </>
                )}
              </Stack>
            </VStack>
          </Box>
          {/* {user?.confirmed && !user?.blocked && (
          <Box my={14}>
            <Text textStyle="groupLabel">
              {t('information.desactivate.title')}
            </Text>
            <Box pl={2.5}>
              <DesactivateAccountModal />
            </Box>
          </Box>
        )} */}
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
    </Loading>
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
