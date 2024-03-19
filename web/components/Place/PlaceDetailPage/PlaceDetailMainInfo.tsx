import { Box, Text, Link, Button, Flex, Divider } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import Pin from 'public/assets/img/pin-outline.svg'
import PlaceAttributesGrid from '~components/Place/PlaceAttributesGrid'
import { useTranslation } from 'next-i18next'

const PlaceDetailMainInfo = ({
  place,
  displayPrecise,
  isMobile,
  isCampaignTab,
}: {
  place: Espace
  displayPrecise: boolean
  isMobile: boolean
  isCampaignTab?: boolean
}) => {
  const { t } = useTranslation('place')

  return (
    <Box flex={1} w="100%">
      <Text
        fontFamily="mabry medium"
        fontWeight="500"
        fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
      >
        {place?.name}
      </Text>
      <Text
        fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
        color="gray.500"
        pt={{ base: 0, lg: 1 }}
      >
        {place?.users_permissions_user?.structureName}
      </Text>
      {place?.users_permissions_user?.website && (
        <Text pt={{ base: 1, lg: 2 }}>
          <Link
            href={
              !place?.users_permissions_user?.website.includes('http')
                ? `http://${place?.users_permissions_user?.website}`
                : place?.users_permissions_user?.website
            }
            isExternal
            layerStyle="link"
            fontSize={{ base: 'md', sm: 'lg' }}
            color="gray.500"
            textDecoration="underline"
          >
            {place?.users_permissions_user?.website}
          </Link>
        </Text>
      )}
      <Divider mt={{ base: 5, lg: 7 }} mb={5} opacity={0.4} />
      <Flex justifyContent="flex-end">
        <Flex>
          <Box textAlign="right" pr={3.5}>
            <Text>{place?.address}</Text>
            <Button
              as={Link}
              href="#map"
              variant="line"
              color="gray.500"
              borderBottomColor="gray.500"
            >
              {t('detail.seeMap')}
            </Button>
          </Box>
          <Pin stroke="black" height="26px" width="26px" />
        </Flex>
      </Flex>
      {!isMobile && (
        <>
          <Divider mt={5} mb={2} opacity={0.4} />
          <PlaceAttributesGrid
            place={place}
            displayPrecise={displayPrecise}
            isCampaignTab={isCampaignTab}
          />
        </>
      )}
    </Box>
  )
}

export default PlaceDetailMainInfo
