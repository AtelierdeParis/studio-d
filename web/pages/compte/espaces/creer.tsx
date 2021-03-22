import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Tabs, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import PlaceForm from '~components/Account/Place/PlaceForm'
import PlaceTabList from '~components/Account/Place/PlaceTabList'
import { User } from '~@types/user.d'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { useRouter } from 'next/router'

interface ICreatePlace {
  user: User
}

const CreatePlace = ({ user }: ICreatePlace) => {
  const router = useRouter()

  return (
    <Box pt={8}>
      <Tabs isLazy index={0}>
        <PlaceTabList index={0} />
        <TabPanels>
          <TabPanel px={0}>
            <PlaceForm
              onSuccess={(res) => {
                router.push({
                  pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                  query: { id: res.data.id },
                })
              }}
              user={user}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['account', 'place'])),
    },
  }
}

export default CreatePlace
