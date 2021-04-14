import React, { useMemo, useContext } from 'react'
import { Flex, Button, Text, Box, ButtonGroup } from '@chakra-ui/react'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import BookingSelection from '~components/Place/BookingSelection'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/client'
import { ROUTE_SIGNUP } from '~constants'
import SigninModal from '~components/Signin/SigninModal'

const BookingRecap = () => {
  const { t } = useTranslation('place')
  const { selected, setConfirmView } = useContext(BookingScheduleContext)
  const isPlural = useMemo(() => (selected.length > 1 ? 's' : ''), [selected])
  const [session, isLoading] = useSession()

  if (selected.length === 0 || isLoading) return null

  return (
    <Flex
      px={8}
      py={5}
      bgColor="white"
      borderRadius="xl"
      justifyContent="space-between"
      alignItems="center"
    >
      {!session ? (
        <>
          <Box maxW="container.sm" pr={6}>
            <Text>
              {t(`detail.notAuth${isPlural}`, { nb: selected.length })}
            </Text>
          </Box>
          <ButtonGroup spacing={5} alignItems="center">
            <Button variant="unstyled" fontSize="md">
              <Link href={ROUTE_SIGNUP}>{t('common:nav.signup')}</Link>
            </Button>
            <SigninModal>
              <Button size="lg">{t('common:nav.signin')}</Button>
            </SigninModal>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Box>
            <Text>
              {t(`detail.nbSelected${isPlural}`, { nb: selected.length })}
            </Text>
            <BookingSelection events={selected} />
          </Box>
          <Button
            size="lg"
            onClick={() => {
              window.scrollTo(0, 0)
              setConfirmView(true)
            }}
          >
            {t('detail.submit')}
          </Button>
        </>
      )}
    </Flex>
  )
}

export default BookingRecap
