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
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FooterMenu from '~components/FooterMenu'
import Twitter from 'public/assets/img/twitter.svg'
import Instagram from 'public/assets/img/instagram.svg'
import Facebook from 'public/assets/img/facebook.svg'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <Box as="footer" backgroundColor="gray.50" mt={{ base: 14, lg: 20 }}>
      <Container pt={8} pb={{ base: 10, lg: 18 }} px={{ base: 3, lg: 6 }}>
        <Flex
          justifyContent="space-between"
          direction={{ base: 'column', lg: 'row' }}
        >
          <Box maxW={{ base: 'auto', lg: '26rem' }}>
            <Text fontFamily="mabry medium">{t('footer.title')}</Text>
            <Text mb={7}>{t('footer.subtitle')}</Text>
            <SimpleGrid
              columns={3}
              maxW="20rem"
              columnGap={5}
              rowGap={3}
              mb={{ base: 4, lg: 0 }}
              alignItems="center"
              filter="grayscale(1)"
              style={{
                mixBlendMode: 'multiply',
              }}
            >
              <Image src="/assets/img/partners/ministere-culture.svg" />
              <Image src="/assets/img/partners/logo-drac.svg" />
              <Image src="/assets/img/partners/logo-paris.svg" />
              <Image src="/assets/img/partners/acdcn.svg" />
              <Image src="/assets/img/partners/accn.svg" />
              <Image src="/assets/img/partners/logo-atelier-de-paris.svg" />
            </SimpleGrid>
          </Box>
          <Flex direction={{ base: 'column-reverse', lg: 'row' }}>
            <Box>
              <Text fontFamily="mabry medium">{t('footer.plan')}</Text>
              <FooterMenu />
            </Box>
            <Box
              pl={{ base: 0, lg: 14 }}
              borderTop="1px solid"
              borderBottom="1px solid"
              py={{ base: 5, lg: 0 }}
              my={{ base: 5, lg: 0 }}
              borderColor={{ base: 'gray.100', lg: 'transparent' }}
            >
              <Text fontFamily="mabry medium">{t('footer.social')}</Text>
              <HStack pt={3} pb={{ base: 3, lg: 0 }} spacing={6}>
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
        justifyContent={{ base: 'flex-start', md: 'center' }}
        direction="column"
        alignItems="center"
        py={3.5}
        px={3}
        borderTop="1px solid"
        borderTopColor="gray.100"
      >
        <Text fontSize="xs" color="gray.500">
          {t('footer.license', { name: process.env.NEXT_PUBLIC_LICENSE })}
        </Text>
        <Stack
          mt={{ base: 3, sm: 0 }}
          direction={{ base: 'column', sm: 'row' }}
          fontSize="xs"
          color="gray.500"
          spacing={1}
          w="100%"
          justifyContent={{ base: 'flex-start', sm: 'center' }}
        >
          <Text>
            Conception :
            <Link href="http://pcfh.studio" isExternal ml={1} color="gray.700">
              PCFH Studio
            </Link>
          </Text>
          <Box display={{ base: 'none', sm: 'block' }}>-</Box>
          <Text>
            Design :
            <Link
              href="http://sylvain-jule.fr/"
              isExternal
              ml={1}
              color="gray.700"
            >
              Sylvain Julé
            </Link>
          </Text>
          <Box display={{ base: 'none', sm: 'block' }}>-</Box>
          <Text>
            Développement :
            <Link
              href="http://premieroctet.com/"
              isExternal
              ml={1}
              color="gray.700"
            >
              Premier Octet
            </Link>
          </Text>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Footer
