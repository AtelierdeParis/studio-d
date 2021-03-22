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
import PlaceForm from '~components/Account/Place/PlaceForm'
import PlaceTabList from '~components/Account/Place/PlaceTabList'
import { User } from '~@types/user.d'
import { usePlace } from '~hooks/usePlace'
import PlaceImage from '~components/Account/Place/PlaceImage'
import Loading from '~components/Loading'
import { useTranslation } from 'next-i18next'
import Check from 'public/assets/img/check.svg'

interface IEditPlace {
  user: User
  placeId: number
}

const EditPlace = ({ placeId }: IEditPlace) => {
  const { t } = useTranslation('place')
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
        <Tabs isLazy index={1}>
          <PlaceTabList index={1} />
          <TabPanels>
            <TabPanel px={0}>
              {/* <PlaceForm
          
              user={user}
            /> */}
            </TabPanel>
            <TabPanel px={0}>
              <PlaceImage place={place} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  return {
    props: {
      placeId: query.placeId,
      ...(await serverSideTranslations(locale, ['account', 'place'])),
    },
  }
}

export default EditPlace
