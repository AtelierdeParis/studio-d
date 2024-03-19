import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'

const CampaignDetailTabs = ({
  hasSolidarityDispo,
}: {
  hasSolidarityDispo: boolean
}) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<number>()
  const isCampaignTab = selectedTab === 1
  const { setSelected } = useContext(BookingScheduleContext)

  useEffect(() => {
    if (router.query.tab) {
      setSelectedTab(parseInt(router.query.tab as string, 10) || 0)
      setSelected([])
    }
  }, [router.query.tab])

  const handleTabClick = (tabValue) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: tabValue },
    })
  }

  return (
    <HStack
      width="100%"
      backgroundColor={isCampaignTab ? 'campaign.light' : 'blue.200'}
      borderRadius="18px"
      padding={2}
    >
      {hasSolidarityDispo && (
        <Button
          height="auto"
          variant={isCampaignTab ? 'unSelected' : 'blueFill'}
          onClick={() => handleTabClick('0')}
          padding="9px 15px 9px 15px"
          borderRadius="12px"
        >
          {t('detail.campaign.solidarity_slot')}
        </Button>
      )}
      <Button
        height="auto"
        variant={isCampaignTab ? 'campaign' : 'unSelected'}
        onClick={() => handleTabClick('1')}
        padding="9px 15px 9px 15px"
        borderRadius="12px"
      >
        {t('detail.campaign.campaign_slot', { title: currentCampaign?.title })}
      </Button>
    </HStack>
  )
}

export default CampaignDetailTabs
