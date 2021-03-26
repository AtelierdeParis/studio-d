import React, { useState } from 'react'
import { useTranslation, Trans } from 'next-i18next'
import {
  VStack,
  Box,
  Input,
  HStack,
  Text,
  Divider,
  Button,
  Flex,
  Checkbox,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormField from '~components/FormField'
import InputPassword from '~components/InputPassword'
import Link from '~components/Link'
import { ROUTE_CGU } from '~constants'
import { Target } from '~pages/inscription/[target]'
import useToast from '~hooks/useToast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signup } from '~api/auth'
import Letter from 'public/assets/img/letter.svg'
import Lock from 'public/assets/img/lock.svg'

const getSchema = (target: Target) => {
  const schema = {
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(10),
    structureName: yup.string().required(),
    address: yup.string().required(),
    zipCode: yup.string().required(),
    city: yup.string().required(),
    siret: yup.string().required().min(14).max(14),
    ape: yup.string().required().min(5).max(5),
    acceptCondition: yup.bool().isTrue(),
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

interface ISignupForm {
  target: Target
  onSuccess: () => void
}

const SignupForm = ({ target, onSuccess }: ISignupForm) => {
  const { t } = useTranslation('signup')
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const { register, errors, handleSubmit, setError } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(getSchema(target)),
  })

  const onSubmit = (data) => {
    const { acceptCondition, ...user } = data
    setLoading(true)

    signup({
      ...user,
      type: target === 'compagnie' ? 'company' : 'place',
      username: user.email,
    })
      .then(onSuccess)
      .catch((err) => {
        if (err.response?.data?.message?.field) {
          errorToast(t(`${err.response.data.message.id}`))
          setError(err.response.data.message.field, {
            type: 'manual',
            message: t(`${err.response.data.message.id}`),
          })
        } else errorToast(t('signup:form.error.default'))
      })
      .finally(() => setLoading(false))
  }
  return (
    <Box maxW="40rem" m="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box px={8}>
          <VStack spacing={5} mb={18}>
            <HStack spacing={5} w="100%" alignItems="flex-start">
              <FormField
                label={t('form.firstname')}
                errors={errors.firstname}
                isRequired
              >
                <Input name="firstname" ref={register} />
              </FormField>
              <FormField
                label={t('form.lastname')}
                errors={errors.lastname}
                isRequired
              >
                <Input name="lastname" ref={register} />
              </FormField>
            </HStack>
            <FormField
              label={t('form.email.label')}
              errors={errors.email}
              info={t('form.email.info')}
              isRequired
            >
              <InputGroup>
                <Input
                  name="email"
                  type="email"
                  ref={register}
                  placeholder={t('form.email.placeholder')}
                />
                <InputRightElement children={<Letter />} />
              </InputGroup>
            </FormField>
            <FormField
              label={t('form.password.label')}
              errors={errors.password}
              info={t('form.password.info')}
              isRequired
            >
              <InputPassword
                register={register}
                placeholder={t('form.password.placeholder')}
              />
            </FormField>
            <FormField
              label={t('form.structure')}
              errors={errors.structureName}
              isRequired
            >
              <Input name="structureName" ref={register} />
            </FormField>
            <FormField
              label={t('form.socialReason.label')}
              info={t('form.socialReason.info')}
              errors={errors.socialReason}
            >
              <Input name="socialReason" ref={register} />
            </FormField>
          </VStack>
          <Text textStyle="titleFieldGroup">{t('form.address')}</Text>
          <Divider opacity={0.5} mb={5} />
          <VStack spacing={5} mb={18}>
            <FormField
              label={t('form.street')}
              errors={errors.address}
              isRequired
            >
              <Input name="address" ref={register} />
            </FormField>
            <HStack spacing={5} w="100%" alignItems="flex-start">
              <FormField
                label={t('form.zipCode')}
                errors={errors.zipCode}
                isRequired
                w="50%"
              >
                <Input name="zipCode" ref={register} />
              </FormField>
              <FormField label={t('form.city')} errors={errors.city} isRequired>
                <Input name="city" ref={register} />
              </FormField>
            </HStack>
            <FormField
              label={
                <Flex as="span" alignItems="center">
                  <Text as="span" mr={2}>
                    {t('form.country.label')}
                  </Text>
                  <Lock />
                </Flex>
              }
              info={t('form.country.info')}
              errors={errors.country}
            >
              <Input
                name="country"
                readOnly
                ref={register}
                value="France"
                _readOnly={{
                  cursor: 'not-allowed',
                  opacity: 0.5,
                }}
              />
            </FormField>
          </VStack>
          <Text textStyle="titleFieldGroup">{t(`form.${target}Info`)}</Text>
          <Divider opacity={0.5} mb={5} />
          <VStack spacing={5} mb={20}>
            <HStack spacing={5} w="100%" alignItems="flex-start">
              <FormField
                label={t('form.siret')}
                errors={errors.siret}
                isRequired
              >
                <Input name="siret" ref={register} />
              </FormField>
              <FormField label={t('form.ape')} errors={errors.ape} isRequired>
                <Input name="ape" ref={register} />
              </FormField>
            </HStack>
            <FormField label={t('form.referent')} errors={errors.referent}>
              <Input name="phone" ref={register} />
            </FormField>
            <FormField
              label={t('form.license.label')}
              errors={errors.license}
              info={t('form.license.info')}
            >
              <Input name="license" ref={register} />
            </FormField>
            <FormField label={t('form.website')} errors={errors.website}>
              <Input name="website" ref={register} />
            </FormField>
            {target === 'compagnie' ? (
              <>
                <FormField
                  label={t('form.choreographer')}
                  errors={errors.choreographer}
                  isRequired
                >
                  <Input
                    name="choreographer"
                    ref={register({
                      required: true,
                    })}
                  />
                </FormField>
                <HStack spacing={5} w="100%" alignItems="flex-start">
                  <FormField
                    label={t('form.insuranceName')}
                    errors={errors.insuranceName}
                    isRequired
                  >
                    <Input
                      name="insuranceName"
                      ref={register({
                        required: true,
                      })}
                    />
                  </FormField>
                  <FormField
                    label={t('form.insuranceNumber')}
                    errors={errors.insuranceNumber}
                    isRequired
                  >
                    <Input
                      name="insuranceNumber"
                      ref={register({
                        required: true,
                      })}
                    />
                  </FormField>
                </HStack>
              </>
            ) : (
              <>
                <FormField
                  label={t('form.legalRepresentative')}
                  errors={errors.legalRepresentative}
                  isRequired
                >
                  <Input
                    name="legalRepresentative"
                    ref={register({
                      required: true,
                    })}
                  />
                </FormField>
                <FormField
                  label={t('form.qualityRepresentative')}
                  errors={errors.qualityRepresentative}
                  isRequired
                >
                  <Input
                    name="statusRepresentative"
                    ref={register({
                      required: true,
                    })}
                  />
                </FormField>
              </>
            )}
          </VStack>
        </Box>
        <Box layerStyle="blueBox" p={10} color="grayText.1">
          <Flex alignItems="flex-start">
            <Checkbox
              mt={1}
              name="acceptCondition"
              ref={register}
              size="lg"
              borderColor="grayText.1"
            />
            <Box whiteSpace="pre-line" pl={5}>
              <Trans
                i18nKey="signup:form.condition"
                components={{
                  a: <Link href={ROUTE_CGU} textDecoration="underline" />,
                }}
              />
            </Box>
          </Flex>
          <Flex justifyContent="center">
            <Button
              colorScheme="blue"
              size="lg"
              mt={6}
              type="submit"
              isLoading={isLoading}
            >
              {t(`about.btn`)}
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  )
}

export default SignupForm
