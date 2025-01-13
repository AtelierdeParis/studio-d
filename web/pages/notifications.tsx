import { Box, Button, Checkbox, Flex, FormLabel, Text } from '@chakra-ui/react'
import axios from 'axios'
import console from 'console'
import CryptoJS from 'crypto-js'
import { GetServerSideProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useMutation } from 'react-query'
import useToast from '~hooks/useToast'

const Notifications = ({
  email,
  hasSubscribe,
}: {
  email: string
  hasSubscribe: boolean
}) => {
  const { t } = useTranslation('account')
  const { successToast } = useToast()
  const [hasSubscribeActualityEmail, setHasSubscribeActualityEmail] = useState(
    hasSubscribe,
  )

  const { mutate, isLoading } = useMutation(
    (data: { email: string; hasSubscribeActualityEmail: boolean }) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/notifications/update`,
        data,
      ),
    {
      onSuccess: () => {
        successToast(t('information.notifications.success'))
      },
    },
  )

  return (
    <Flex
      flex={1}
      maxWidth="40rem"
      mx="auto"
      mt={10}
      backgroundColor="blue.50"
      py={{ base: 6, md: 12 }}
      px={{ base: 5, sm: 12, md: 16, lg: 20 }}
      borderRadius="lg"
      direction="column"
      alignItems="center"
    >
      <Text
        textAlign={{ base: 'left', md: 'center' }}
        mb={{ base: 3, md: 7 }}
        fontSize={{ base: 'lg', md: '1.7rem' }}
      >
        {t('information.notifications.setting_title')}
      </Text>
      <Flex alignItems="flex-start">
        <Checkbox
          id="hasSubscribeActualityEmail"
          isChecked={hasSubscribeActualityEmail}
          onChange={() =>
            setHasSubscribeActualityEmail(!hasSubscribeActualityEmail)
          }
          size="lg"
          borderColor="grayText.1"
        />
        <Box whiteSpace="pre-line" pl={3}>
          <FormLabel htmlFor="hasSubscribeActualityEmail">
            {t('information.notifications.label_notif_actuality')}
          </FormLabel>
        </Box>
      </Flex>
      <Button
        isLoading={isLoading}
        onClick={() => mutate({ email, hasSubscribeActualityEmail })}
        colorScheme="blue"
        size="lg"
        alignSelf={{ base: 'flex-start', md: 'center' }}
        mt={{ base: 6, md: 8 }}
      >
        {t('information.notifications.setting_save')}
      </Button>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  const { token } = query

  try {
    const decryptedEmail = CryptoJS.AES.decrypt(
      decodeURIComponent(token as string),
      process.env.HASH_EMAIL_NOTIFICATION,
    ).toString(CryptoJS.enc.Utf8)

    const email = decryptedEmail

    if (!email || !email.includes('@')) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACK_URL
      }/notifications/info?email=${encodeURIComponent(email)}`,
    )

    return {
      props: {
        email: email,
        hasSubscribe: data.hasSubscribeActualityEmail,
        ...(await serverSideTranslations(locale, ['common', 'account'])),
      },
    }
  } catch (error) {
    console.log({ error })
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default Notifications
