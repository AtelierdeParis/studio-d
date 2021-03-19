import React from 'react'
import {
  Container,
  Box,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Link,
  HStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FooterMenu from '~components/FooterMenu'
import Twitter from 'public/assets/img/twitter.svg'
import Instagram from 'public/assets/img/instagram.svg'
import Facebook from 'public/assets/img/facebook.svg'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <Box as="footer" backgroundColor="gray.50" mt={20}>
      <Container pt={8} pb={18} px={6}>
        <Flex justifyContent="space-between">
          <Box maxW="26rem">
            <Text fontFamily="mabry medium">{t('footer.title')}</Text>
            <Text mb={7}>{t('footer.subtitle')}</Text>
            <SimpleGrid
              columns={3}
              maxW="20rem"
              columnGap={5}
              rowGap={3}
              alignItems="center"
            >
              <Image src="/assets/img/partners/ministere-culture.png" />
              <Image src="/assets/img/partners/logo-drac.png" />
              <Image src="/assets/img/partners/logo-paris.png" />
              <Image src="/assets/img/partners/acdcn.jpeg" />
              <Image src="/assets/img/partners/accn.jpg" />
              <Image src="/assets/img/partners/logo-atelier-de-paris.jpg" />
            </SimpleGrid>
          </Box>
          <Flex>
            <Box>
              <Text fontFamily="mabry medium">{t('footer.plan')}</Text>
              <FooterMenu />
            </Box>
            <Box pl={14}>
              <Text fontFamily="mabry medium">{t('footer.social')}</Text>
              <HStack pt={3} spacing={6}>
                <Link
                  href="https://www.facebook.com/atelierdeparisCDCN/"
                  isExternal
                >
                  <Twitter />
                </Link>
                <Link href="https://twitter.com/ADP_CDCN" isExternal>
                  <Facebook />
                </Link>
                <Link
                  href="https://www.instagram.com/atelierdepariscdcn/"
                  isExternal
                >
                  <Instagram />
                </Link>
              </HStack>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Flex
        justifyContent="center"
        py={3.5}
        borderTop="1px solid"
        borderTopColor="gray.100"
      >
        {/* TODO: update license name */}
        <Text fontSize="xs" color="gray.500">
          {t('footer.license')}
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
