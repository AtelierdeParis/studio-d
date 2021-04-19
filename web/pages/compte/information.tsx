import React, { useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FormField from '~components/FormField'
import InputPassword from '~components/InputPassword'
import AskPasswordModal from '~components/Account/AskPasswordModal'
import DesactivateAccountModal from '~components/Account/DesactivateAccountModal'
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
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Letter from 'public/assets/img/letter.svg'
import { client } from '~api/client-api'
import { NewUsersPermissionsUser } from '~typings/api'
import useToast from '~hooks/useToast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'

interface Props {
  user: UsersPermissionsUser
}
interface FormInformation extends UsersPermissionsUser {
  password: string
}

const getSchema = (target) => {
  const schema = {
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().test({
      message: 'Le mot de passe doit faire au minimum 10 caractères',
      test: (value) => {
        if (value !== '') return value.length >= 10
        return true
      },
    }),
    structureName: yup.string().required(),
    address: yup.string().required(),
    phone: yup
      .string()
      .optional()
      .test({
        message: 'Le format du téléphone est incorrect',
        test: (value) => {
          if (value === '') return true
          const match = value.match(
            /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8,12}/i,
          )
          if (!match) return false
          return match[0] === value
        },
      }),
    license: yup.string().test({
      message: 'Les licences doivent être séparés par des virgules',
      test: (value) => {
        if (value === '') return true
        const match = value.match(/[a-z0-9]+(, ?[a-z0-9]+)*/i)
        if (!match) return false
        return match[0] === value
      },
    }),
    website: yup.string().url(),
    zipCode: yup.string().required(),
    city: yup.string().required(),
    siret: yup.string().required().min(14).max(14),
    ape: yup.string().required().min(5).max(5),
  }

  if (target === 'compagnie') {
    schema['choreographer'] = yup.string().required()
    schema['insuranceName'] = yup.string().required()
    schema['insuranceNumber'] = yup.string().required()
  } else {
    schema['legalRepresentative'] = yup.string().required()
    schema['statusRepresentative'] = yup.string().required()
  }

  return yup.object().shape(schema)
}

const AccountInformation = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    errors,
    handleSubmit,
    getValues,
    formState,
    reset,
  } = useForm<FormInformation>({
    defaultValues: {
      ...user,
      password: undefined,
    },
    // @ts-ignore
    resolver: yupResolver(getSchema(user.type)),
  })

  const save = (data) => {
    const filteredData = Object.keys(data).reduce((total, current) => {
      if (Boolean(data[current])) total[current] = data[current]
      return total
    }, {})
    setLoading(true)

    client.users
      .putUsers(filteredData as NewUsersPermissionsUser)
      .then(() => {
        reset(filteredData, { dirtyFields: false })
        successToast(t('information.success'))
      })
      .catch(() => errorToast(t('information.error')))
      .finally(() => setLoading(false))
  }

  const onSubmit = (data) => {
    if (data.email !== user.email || data.password !== '') {
      setShowModal(true)
      return
    }
    save(data)
  }

  return (
    <Box py={8}>
      {showModal && (
        <AskPasswordModal
          onSuccess={() => save(getValues())}
          setShowModal={setShowModal}
        />
      )}
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
            <VStack
              direction="column"
              flex={1}
              alignItems="flex-start"
              spacing={5}
            >
              <HStack spacing={5} w="100%">
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
              <FormField
                label={t('information.country.label')}
                errors={errors.country}
                isRequired
              >
                <Input name="country" ref={register} />
              </FormField>
            </VStack>
          </HStack>
        </Box>
        <Box my={14}>
          <Text textStyle="groupLabel">{t('information.info')}</Text>
          <VStack spacing={5}>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              <FormField
                label={t('information.firstname')}
                errors={errors.firstname}
                flex={1}
              >
                <Input name="firstname" ref={register} />
              </FormField>
              <FormField
                label={t('information.lastname')}
                errors={errors.lastname}
                flex={1}
              >
                <Input name="lastname" ref={register} />
              </FormField>
            </HStack>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              <FormField
                label={t('information.structure')}
                errors={errors.structureName}
                flex={1}
              >
                <Input name="structureName" ref={register} />
              </FormField>
              <FormField
                label={t('information.socialReason.label')}
                info={t('information.socialReason.info')}
                errors={errors.socialReason}
                flex={1}
              >
                <Input name="socialReason" ref={register} />
              </FormField>
            </HStack>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              <FormField label={t('information.siret')} errors={errors.siret}>
                <Input name="siret" ref={register} />
              </FormField>
              <FormField label={t('information.ape')} errors={errors.ape}>
                <Input name="ape" ref={register} />
              </FormField>
            </HStack>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              <FormField
                label={t('information.phone.label')}
                errors={errors.phone}
              >
                <Input name="phone" ref={register} />
              </FormField>
              <FormField
                label={t('information.license.label')}
                info={t('information.license.info')}
                errors={errors.license}
              >
                <Input name="license" ref={register} />
              </FormField>
            </HStack>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              <FormField
                label={t('information.website')}
                errors={errors.website}
              >
                <Input name="website" ref={register} />
              </FormField>
              {user.type === 'company' ? (
                <FormField
                  label={t('information.choreographer')}
                  errors={errors.choreographer}
                >
                  <Input name="choreographer" ref={register} />
                </FormField>
              ) : (
                <FormField
                  label={t('information.legalRepresentative')}
                  errors={errors.legalRepresentative}
                >
                  <Input name="legalRepresentative" ref={register} />
                </FormField>
              )}
            </HStack>
            <HStack spacing={5} w="100%" alignItems="flex-start" pl={2.5}>
              {user.type === 'company' ? (
                <>
                  <FormField
                    label={t('information.insuranceName')}
                    errors={errors.insuranceName}
                  >
                    <Input name="insuranceName" ref={register} />
                  </FormField>
                  <FormField
                    label={t('information.insuranceNumber')}
                    errors={errors.insuranceNumber}
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
                  >
                    <Input name="statusRepresentative" ref={register} />
                  </FormField>
                  <Spacer flex={1} />
                </>
              )}
            </HStack>
          </VStack>
        </Box>
        {user.confirmed && !user.blocked && (
          <Box my={14}>
            <Text textStyle="groupLabel">
              {t('information.desactivate.title')}
            </Text>
            <DesactivateAccountModal />
          </Box>
        )}
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
