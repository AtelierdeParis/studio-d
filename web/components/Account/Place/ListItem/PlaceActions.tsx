import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_PLACE_DETAIL, ROUTE_PLACE_DETAIL } from '~constants'
import useNbDisponibility from '~hooks/useNbDisponibility'
import { Espace } from '~typings/api'
import Eye from 'public/assets/img/eye.svg'
import EyeIcon from '~public/assets/icons/EyeIcon'
import useNbBooking from '~hooks/useNbBooking'
import { useMemo } from 'react'
import UnpublishModal from '~components/Account/Place/UnpublishModal'
import DeletePlaceModal from '~components/Account/Place/DeletePlaceModal'
import PublishModal from '~components/Account/Place/PublishModal'

const PlaceActions = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')
  const { coming, pending } = useNbBooking(place.disponibilities)

  const canSeeDetail = Boolean(place.published)
  const canDelete = !Boolean(place.published)
  const canUnpublish = useMemo(
    () =>
      Boolean(place.published) && (coming.length === 0 || pending.length === 0),
    [coming, pending, place.published],
  )
  const canPublish = !Boolean(place.published) && place.filledUntil

  return (
    <HStack width="100%" spacing={2} alignItems="flex-start">
      <Button
        as={Link}
        variant="blueFill"
        href={{
          pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
          query: { id: place.slug, index: 0 },
        }}
        width="auto"
        borderRadius="4px"
        padding="6px!important"
        height="30px"
      >
        {t('list.edit')}
      </Button>

      <VStack alignItems={'flex-start'}>
        {canUnpublish && <UnpublishModal place={place} />}

        {canPublish && <PublishModal placeId={place.id} />}

        {canDelete && <DeletePlaceModal placeId={place.id} />}
      </VStack>

      {canSeeDetail && (
        <IconButton
          icon={<EyeIcon stroke="gray" />}
          variant="grayLine"
          as={Link}
          href={{
            pathname: ROUTE_PLACE_DETAIL,
            query: { id: place.slug },
          }}
          borderRadius="4px"
          paddingX={'6px!important'}
          paddingY={'2px!important'}
          aria-label="see-detail"
          minWidth={'auto'}
          height="30px!important"
        />
      )}
    </HStack>
  )
}

export default PlaceActions
