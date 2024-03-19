import { Button, Flex, HStack, StackProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_MY_APPLICATIONS } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'

const ApplicationCounter = ({
  isFullButton,
  ...props
}: { isFullButton?: boolean } & StackProps) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const { data: user, applications } = useCurrentUser()

  if (
    user?.type === 'company' &&
    currentCampaign?.applications_max > 0 &&
    applications?.length > 0
  ) {
    return (
      <HStack width="100%" paddingY={3} {...props}>
        <Flex>
          <Text fontWeight="bold">
            {t('campaign.applications_counter.counter')}
          </Text>
          <Text
            pl={1}
            color={'campaign.dark'}
          >{`${applications?.length}/${currentCampaign.applications_max}`}</Text>
        </Flex>
        {isFullButton ? (
          <Button
            variant={'campaign'}
            colorScheme="campaign"
            as={Link}
            href={ROUTE_ACCOUNT_MY_APPLICATIONS}
            size="sm"
            height="auto"
            paddingX={2}
            paddingY={2}
          >
            {t('campaign.applications_counter.see')}
          </Button>
        ) : (
          <Button
            variant="outline"
            colorScheme="campaign"
            as={Link}
            href={ROUTE_ACCOUNT_MY_APPLICATIONS}
            size="sm"
            height="auto"
            paddingX={2}
            paddingY={2}
            color={'campaign.dark'}
            _hover={{ bg: 'campaign.light', textDecor: 'none' }}
          >
            {t('campaign.applications_counter.see')}
          </Button>
        )}
      </HStack>
    )
  }

  return null
}

export default ApplicationCounter
