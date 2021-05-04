import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Heading, Box, Text, Flex, Button } from '@chakra-ui/react'
import { client } from '~api/client-api'
import { Actuality } from '~typings/api'
import { useTranslation } from 'next-i18next'
import MarkdownRenderer from '~components/MarkdownRenderer'
import Image from '~components/Image'
import Link from '~components/Link'
import { ROUTE_ACTU } from '~constants'
import { format } from '~utils/date'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface Props {
  actu: Actuality
}

const ActualityDetail = ({ actu }: Props) => {
  const { t } = useTranslation('actuality')
  const router = useRouter()

  return (
    <Box textAlign="center">
      <NextSeo
        title={actu?.title}
        openGraph={{
          url: process.env.NEXT_PUBLIC_FRONT_URL + router.asPath,
          title: actu?.title,
          images: [
            {
              url: actu.image.url,
              width: 400,
              height: 300,
            },
          ],
        }}
      />
      <Heading
        as="h1"
        textStyle="h1"
        mt={{ base: 6, md: 16 }}
        maxW="container.sm"
        mx="auto"
      >
        {actu.title}
      </Heading>
      <Text color="gray.600" mt={1}>
        {t('date', {
          date: format(actu.created_at, 'd MMMM yyyy'),
        })}
      </Text>
      {actu?.image?.url && (
        <Flex
          mx="auto"
          mt={{ base: 4, md: 12 }}
          justifyContent="center"
          maxW="container.md"
        >
          <Image src={actu.image.url} objectFit="cover" />
        </Flex>
      )}
      <Container textAlign="left" mt={{ base: 8, md: 20 }} maxW="container.sm">
        <MarkdownRenderer>{actu.content}</MarkdownRenderer>
        <Flex justifyContent={{ base: 'center', md: 'flex-end' }} pt={10}>
          <Button variant="line" as={Link} href={ROUTE_ACTU}>
            {t('back')}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  const res = await client.actualities.actualitiesDetail(query.actuId as string)
  return {
    props: {
      actu: res.data,
      ...(await serverSideTranslations(locale, ['common', 'actuality'])),
    },
  }
}

export default ActualityDetail
