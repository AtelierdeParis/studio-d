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
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import Letter from 'public/assets/img/letter.svg'

interface ResetPasswordFormProps {
  onClose: () => void
}

const schema = yup.object({
  email: yup.string().email().required(),
})

const ResetPasswordForm = ({ onClose }: ResetPasswordFormProps) => {
  const { t } = useTranslation('common')
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    setLoading(true)
    client.auth
      .forgotPassword({ email: data.email })
      .then(() => {
        successToast(t('reset.success'))
        onClose()
      })
      .catch((err) => {
        if (err.response?.data?.data) {
          err.response?.data?.data?.map(({ messages }) => {
            if (messages.length > 0) errorToast(t(messages[0].id))
          })
        } else errorToast(t('error'))
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel>{t('reset.email.label')}</FormLabel>
          <InputGroup>
            <Input
              name="email"
              type="email"
              ref={register}
              placeholder={t('reset.email.placeholder')}
            />
            <InputRightElement children={<Letter />} />
          </InputGroup>
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Flex align="center" justify="center" mt={8}>
          <Button type="submit" size="lg" isLoading={isLoading}>
            {t('reset.submit')}
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default ResetPasswordForm
