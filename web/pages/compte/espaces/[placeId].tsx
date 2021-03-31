import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Tabs,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react'
import PlaceEdit from '~components/Account/Place/PlaceEdit'
import PlaceTabList from '~components/Account/Place/PlaceTabList'
import { User } from '~@types/user.d'
import { usePlace } from '~hooks/usePlace'
import PlaceImage from '~components/Account/Place/PlaceImage'
import Loading from '~components/Loading'
import { useRouter } from 'next/router'
import { requireAuth } from '~utils'
import Check from 'public/assets/img/check.svg'
import dynamic from 'next/dynamic'

const PlaceSchedule = dynamic(
  () => import('~components/Account/Place/PlaceSchedule'),
  {
    ssr: false,
  },
)

interface IEditPlace {
  user: User
  placeId: number
}

const EditPlace = ({ placeId }: IEditPlace) => {
  const { query } = useRouter()
  const { data: place, isLoading } = usePlace(placeId)

  return (
    <Loading isLoading={isLoading} isCentered>
      {/* <Flex
        justifyContent="flex-end"
        alignItems="center"
        mx="-1rem"
        px={4}
        py={2}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Button
          variant="unstyled"
          color="gray.400"
          _hover={{ textDecoration: 'underline' }}
        >
          {t('cancel')}
        </Button>
        <Button ml={6} leftIcon={<Check />} size="lg">
          {t('save')}
        </Button>
      </Flex> */}
      <Box pt={8}>
        <Text pb={6} ml={2.5} textStyle="accountTitle">
          {place?.name}
        </Text>
        <Tabs isLazy defaultIndex={Number(query?.index) || 0}>
          <PlaceTabList place={place} />
          <TabPanels>
            <TabPanel px={0}>
              <PlaceEdit place={place} />
            </TabPanel>
            <TabPanel px={0}>
              <PlaceImage place={place} />
            </TabPanel>
            <TabPanel px={0}>
              <PlaceSchedule placeId={placeId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale, query }) => {
    return {
      props: {
        placeId: query.placeId,
        ...(await serverSideTranslations(locale, [
          'account',
          'place',
          'common',
          'yup',
        ])),
      },
    }
  },
)

export default EditPlace
