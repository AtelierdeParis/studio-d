import React, { useMemo, useContext } from 'react'
import { Flex, Button, Text, Box, ButtonGroup } from '@chakra-ui/react'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import BookingSelection from '~components/Place/BookingSelection'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { ROUTE_SIGNUP } from '~constants'
import SigninModal from '~components/Signin/SigninModal'
import AuthInsert from '~components/Place/BookingRecapInsert/AuthInsert'

const BookingRecap = () => {
  const { t } = useTranslation('place')
  const { selected, setConfirmView, setSelected } = useContext(
    BookingScheduleContext,
  )
  const isPlural = useMemo(() => (selected.length > 1 ? 's' : ''), [selected])
  const { data: user, isLoading } = useCurrentUser()

  if (selected.length === 0 || isLoading) return null

  return (
    <Flex
      boxShadow="1px 1px 4px #ccc"
      pos={{ base: 'fixed', md: 'static' }}
      left={0}
      right={0}
      bottom={0}
      px={{ base: 5, md: 8 }}
      py={{ base: 4, md: 5 }}
      zIndex={{ base: 20, md: 1 }}
      bgColor="white"
      borderRadius="xl"
      justifyContent="space-between"
      alignItems={{ base: 'flex-start', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
    >
      {!user ? (
        <AuthInsert nbSelected={selected?.length || 0} />
      ) : (
        <>
          {!user.confirmed || !user.accepted ? (
            <Box>
              <Text>
                {t(`detail.notConfirm${isPlural}`, { nb: selected.length })}
              </Text>
            </Box>
          ) : (
            <>
              <Box flex={1}>
                <Text>
                  {t(`detail.nbSelected${isPlural}`, { nb: selected.length })}
                </Text>
                <Box display={{ base: 'none', md: 'block' }}>
                  <BookingSelection events={selected} />
                </Box>
              </Box>
              <ButtonGroup
                flex={0}
                mt={{ base: 2, md: 0 }}
                alignItems="center"
                justifyContent={{ base: 'flex-end', md: 'flex-end' }}
                w="100%"
                spacing={4}
              >
                <Button onClick={() => setSelected([])} variant="unstyled">
                  {t('detail.cancel')}
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    window.scrollTo(0, 0)
                    setConfirmView(true)
                  }}
                >
                  {t('detail.submit')}
                </Button>
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export default BookingRecap
