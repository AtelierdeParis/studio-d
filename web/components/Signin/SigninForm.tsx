import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ROUTE_RESET_PASSWORD } from '~constants'
import { signIn } from 'next-auth/client'
import Link from 'components/Link'
import InputPassword from '~components/InputPassword'
import useToast from '~hooks/useToast'
import Letter from 'public/assets/img/letter.svg'

interface SignInFormProps {
  onClose: () => void
}

interface FormData {
  email: string
  password: string
}
const SignInForm = (props: SignInFormProps) => {
  const { t } = useTranslation('common')
  const { errorToast } = useToast()
  const schema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email(t('email.format'))
          .required(t('email.required')),
        password: yup.string().required(t('password.required')),
      }),
    [t],
  )
  const { register, formState, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (values: FormData) => {
    try {
      await signIn('credentials', {
        username: values.email,
        password: values.password,
        redirect: false,
      })
    } catch {
      errorToast(t('signin.error'))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel>{t('signin.email.label')}</FormLabel>
          <InputGroup>
            <Input
              name="email"
              type="email"
              ref={register}
              placeholder={t('signin.email.placeholder')}
            />
            <InputRightElement children={<Letter />} />
          </InputGroup>
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password} pt={3.5}>
          <FormLabel>{t('signin.password.label')}</FormLabel>
          <InputPassword register={register} />
          <FormErrorMessage>
            {formState.errors.password?.message}
          </FormErrorMessage>
          <Box textAlign="right" pt={1.5}>
            <Link
              href={ROUTE_RESET_PASSWORD}
              onClick={props.onClose}
              textDecoration="underline"
              fontSize="sm"
            >
              {t('signin.forgottenPassword')}
            </Link>
          </Box>
        </FormControl>
        <Flex align="center" justify="center" mt={8}>
          <Button type="submit" size="lg">
            {t('signin.submit')}
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default SignInForm
