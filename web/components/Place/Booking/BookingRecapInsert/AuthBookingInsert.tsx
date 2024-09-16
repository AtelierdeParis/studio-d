import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import SigninModal from '~components/Signin/SigninModal'
import { ROUTE_SIGNUP } from '~constants'

const AuthBookingInsert = ({
  nbSelected,
  isCampaignMode,
}: {
  nbSelected: number
  isCampaignMode?: boolean
}) => {
  const { t } = useTranslation('place')

  if (!nbSelected) return null

  return (
    <>
      <Box maxW="container.sm" pr={6}>
        <Text>
          {t(
            `detail.notAuth${nbSelected > 1 ? 's' : ''}${
              isCampaignMode ? 'Campaign' : ''
            }`,
            {
              nb: nbSelected,
            },
          )}
        </Text>
      </Box>
      <ButtonGroup
        spacing={5}
        alignSelf="center"
        alignItems="center"
        mt={{ base: 6, md: 0 }}
      >
        <Button variant="unstyled" fontSize="md">
          <Link href={ROUTE_SIGNUP}>{t('common:nav.signup')}</Link>
        </Button>
        <SigninModal redirect={false}>
          <Button size="lg">{t('common:nav.signin')}</Button>
        </SigninModal>
      </ButtonGroup>
    </>
  )
}

export default AuthBookingInsert
