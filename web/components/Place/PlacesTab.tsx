import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
  HStack,
  Text,
} from '@chakra-ui/react'
import { format } from '~utils/date'
import Tag from '~components/Tag'
import { useTranslation } from 'next-i18next'
import PlacesPage from '~components/Place/PlacesPage'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useRouter } from 'next/router'

const PlacesTabs = () => {
  const router = useRouter()
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('common')
  const [selectedTab, setSelectedTab] = useState<number>()

  useEffect(() => {
    if (router.query.tab) {
      setSelectedTab(parseInt(router.query.tab as string, 10) || 0)
    }
  }, [router.query.tab])

  return (
    <Tabs
      isLazy
      marginTop={6}
      onChange={(index) => {
        setSelectedTab(index)
        router.push({
          pathname: router.pathname,
          query: { ...router.query, tab: index },
        })
      }}
      variant="enclosed"
      index={selectedTab}
    >
      <TabList
        border="1px solid #E3E5F0"
        borderTopRadius="18px"
        display="inline-flex"
      >
        <Tab
          borderRadius="18px 0px 0px 0px"
          borderColor="transparent"
          _selected={{
            backgroundColor: 'blue.100',
            borderRadius: '18px 18px 0px 0px',
            borderColor: 'blue.100',
          }}
          boxShadow="none!important"
        >
          <Text
            backgroundColor={selectedTab === 0 && 'blue.500'}
            color={selectedTab === 0 && 'white'}
            paddingX={4}
            paddingY={2}
            borderRadius="12px"
          >
            {t('solidarity.title')}
          </Text>
        </Tab>
        <Tab
          borderRadius="0px 18px 0px 0px"
          borderColor="transparent"
          _selected={{
            backgroundColor: 'campaign.light',
            borderRadius: '18px 18px 0px 0px',
            borderColor: 'campaign.light',
          }}
          boxShadow="none!important"
        >
          <HStack space={0}>
            <Text
              backgroundColor={selectedTab === 1 && 'campaign.primary'}
              color={selectedTab === 1 && 'white'}
              paddingX={4}
              paddingY={2}
              borderRadius="12px"
            >
              {currentCampaign?.title}
            </Text>

            <Tag status="campaign" display={{ base: 'none', md: 'block' }}>
              {t('campaign.open', {
                date: format(
                  new Date(currentCampaign?.limitDate),
                  'd MMMM yyyy',
                ),
              })}
            </Tag>
          </HStack>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel padding={0}>
          <PlacesPage />
        </TabPanel>
        <TabPanel padding={0}>
          <PlacesPage isCampaignTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default PlacesTabs
