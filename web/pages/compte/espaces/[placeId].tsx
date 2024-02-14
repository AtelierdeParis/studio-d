import React, { useState, useEffect } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Tabs, TabPanels, TabPanel, Box, Text } from '@chakra-ui/react'
import PlaceEdit from '~components/Account/Place/PlaceEdit'
import PlaceTabList from '~components/Account/Place/PlaceTabList'
import { UsersPermissionsUser } from '~typings/api'
import { usePlace } from '~hooks/usePlace'
import PlaceImage from '~components/Account/Place/PlaceImage'
import Loading from '~components/Loading'
import { useRouter } from 'next/router'
import { requireAuth } from '~utils/auth'
import { useIsComplete } from '~hooks/useIsComplete'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import MigrationMessage from '~components/MigrationMessage'
import { NextSeo } from 'next-seo'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import CampaignPlaceSchedule from '~components/Campaign/Places/Admin/CampaignSchedule'

const PlaceSchedule = dynamic(
  () => import('~components/Account/Place/PlaceSchedule'),
  {
    ssr: false,
  },
)

interface Props {
  user: UsersPermissionsUser
  slug: string
}

const EditPlace = ({ slug }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const { query, asPath } = useRouter()
  const { data: place, isLoading } = usePlace(slug)
  const isComplete = useIsComplete(place)
  const [index, setIndex] = useState(
    !isComplete ? 0 : Number(query?.index) || 0,
  )
  useEffect(() => {
    if (!Boolean(query) || !query?.index) return
    setIndex(Number(query.index))
  }, [query?.index])

  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo
        title={place?.name}
        openGraph={{
          url: process.env.NEXT_PUBLIC_FRONT_URL + asPath,
          title: place?.name,
        }}
      />
      <Box pt={{ base: 3, md: 8 }} pb={{ base: 8, md: 0 }}>
        {!isComplete && (
          <MigrationMessage
            title={t('form.migration.title')}
            message={t('form.migration.message')}
          />
        )}
        <Text pb={6} ml={{ base: 0, schedule: 2.5 }} textStyle="accountTitle">
          {place?.name}
        </Text>
        <Tabs isLazy index={index}>
          <PlaceTabList
            isComplete={isComplete}
            place={place}
            setIndex={setIndex}
          />
          <TabPanels>
            <TabPanel px={0}>
              <PlaceEdit place={place} />
            </TabPanel>
            <TabPanel px={0}>
              <PlaceImage place={place} />
            </TabPanel>
            <TabPanel px={0}>
              <PlaceSchedule place={place} />
            </TabPanel>
            {currentCampaign && (
              <TabPanel px={0}>
                <CampaignPlaceSchedule place={place} />
              </TabPanel>
            )}
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
        slug: query.placeId,
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
