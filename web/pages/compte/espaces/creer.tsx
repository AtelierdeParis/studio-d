import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Tabs, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import PlaceCreate from '~components/Account/Place/PlaceCreate'
import PlaceTabList from '~components/Account/Place/PlaceTabList'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'

interface ICreatePlace {
  user: UsersPermissionsUser
}

const CreatePlace = ({ user }: ICreatePlace) => {
  return (
    <Box pt={8}>
      <Tabs isLazy index={0}>
        <PlaceTabList disabledIndexes={[1, 2]} />
        <TabPanels>
          <TabPanel px={0}>
            <PlaceCreate user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account', 'place', 'yup'])),
      },
    }
  },
)

export default CreatePlace
