import React from 'react'
import { ButtonGroup, Button, Text, Flex, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import SigninModal from '~components/Signin/SigninModal'
import { ROUTE_SIGNUP, ROUTE_ACCOUNT } from '~constants'
import { useSession } from 'next-auth/client'
import Squares from 'public/assets/img/squares.svg'
interface IAuthMenu {
  colorMode: 'white' | 'black'
}
const AuthMenu = ({ colorMode }: IAuthMenu) => {
  const { t } = useTranslation('common')
  const [session] = useSession()

  if (session) {
    return (
      <Flex
        as={Link}
        href={ROUTE_ACCOUNT}
        alignItems="center"
        role="group"
        _hover={{ textDecoration: 'none' }}
      >
        <Squares stroke={colorMode} />
        <Box maxW="15rem">
          <Text
            ml={3}
            pt="2px"
            fontWeight="500"
            lineHeight={1.2}
            isTruncated
            borderBottom="1px solid transparent"
            _groupHover={{
              textDecoration: 'none',
              borderBottom: '1px solid black',
            }}
          >
            {session.user.name}
          </Text>
        </Box>
      </Flex>
    )
  }

  return (
    <ButtonGroup spacing={5}>
      <Button variant="unstyled" fontSize="md">
        <Link href={ROUTE_SIGNUP}>{t('nav.signup')}</Link>
      </Button>
      <SigninModal>
        <Button>{t('nav.signin')}</Button>
      </SigninModal>
    </ButtonGroup>
  )
}

export default AuthMenu
