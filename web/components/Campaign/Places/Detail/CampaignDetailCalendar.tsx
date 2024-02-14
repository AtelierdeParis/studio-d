import {
  HStack,
  VStack,
  Flex,
  Box,
  Text,
  Stack,
  Button,
  Link,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Calendar from 'public/assets/img/calendar.svg'
import DetailScheduleItem from '~components/Campaign/Places/Detail/DetailScheduleItem'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Disponibility } from '~typings/api'

const CampaignDetailCalendar = ({
  disponibilities,
}: {
  disponibilities: Disponibility[]
}) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  return (
    <VStack width="100%" alignItems="flex-start">
      <Flex alignItems="center" mb={4}>
        <Box w="18px" mt="-4px">
          <Calendar stroke="black" />
        </Box>
        <Text textStyle="h2" pl={5}>
          {t('detail.campaign.calendar_title', {
            title: currentCampaign?.title,
          })}
        </Text>
      </Flex>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <VStack
          backgroundColor="blue.100"
          flex={1}
          borderRadius="4px"
          p={4}
          alignItems="flex-start"
          spacing={6}
          padding={8}
        >
          <Text color="gray.500">{t('detail.campaign.slots_available')}</Text>
          <VStack width="100%">
            {disponibilities?.map((disponibility) => (
              <DetailScheduleItem disponibility={disponibility} />
            ))}
          </VStack>
        </VStack>

        <VStack
          backgroundColor="blue.100"
          flex={1}
          borderRadius="4px"
          p={4}
          alignItems="flex-start"
          spacing={6}
          padding={8}
        >
          <Text color="gray.500">
            {t('detail.campaign.campaign_about', {
              title: currentCampaign?.title,
            })}
          </Text>
          <Text>{currentCampaign?.description}</Text>
          <Text color="gray.500">{t('detail.campaign.eligibility')}</Text>
          <Button
            variant="blueFill"
            as={Link}
            href={currentCampaign?.article_link ?? ''}
          >
            {t('detail.campaign.more')}
          </Button>
        </VStack>
      </Stack>
    </VStack>
  )
}

export default CampaignDetailCalendar
