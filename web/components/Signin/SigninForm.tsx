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
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/client'
import InputPassword from '~components/InputPassword'
import useToast from '~hooks/useToast'
import Letter from 'public/assets/img/letter.svg'
import { client } from '~api/client-api'
import { getRouteToRedirect } from '~utils/auth'
import { useRouter } from 'next/router'

interface Propz {
  onClose: () => void
  onOpenReset: () => void
  initialRef: React.Ref<any>
  redirect?: boolean
}
interface FormData {
  email: string
  password: string
}

const SignInForm = ({
  initialRef,
  onClose,
  onOpenReset,
  redirect = true,
}: Propz) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const schema = yup.object({
    email: yup.string().email(t('signin.email.error')),
    password: yup.string().required(t('signin.password.error')),
  })

  const { errorToast } = useToast()
  const [email, setEmail] = useState('')
  const { register, formState, handleSubmit, setError } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values: FormData) => {
    if (!email) {
      setError('email', {
        type: 'manual',
        message: t('yup:mixed.required'),
      })
      return
    }
    try {
      const res = await signIn('credentials', {
        username: email,
        password: values.password,
        redirect: false,
      })
      if (res.ok && redirect) {
        const [user, bookings] = await Promise.all([
          client.users.getUsers().then((res) => res.data),
          client.bookings.getMyBookings('all').then((res) => res.data),
        ])

        router.push(getRouteToRedirect(user, bookings))
      }
    } catch {
      errorToast(t('signin.error'))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
            {t('signin.email.label')}
          </FormLabel>
          <InputGroup>
            <Input
              name="email"
              ref={initialRef}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('signin.email.placeholder')}
            />
            <InputRightElement children={<Letter />} />
          </InputGroup>
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password} pt={3.5}>
          <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
            {t('signin.password.label')}
          </FormLabel>
          <InputPassword register={register} />
          <FormErrorMessage>
            {formState.errors.password?.message}
          </FormErrorMessage>
          <Box textAlign="right" pt={1.5}>
            <Box
              as="span"
              onClick={() => {
                onClose()
                onOpenReset()
              }}
              textDecoration="underline"
              fontSize="sm"
              cursor="pointer"
            >
              {t('signin.forgottenPassword')}
            </Box>
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
