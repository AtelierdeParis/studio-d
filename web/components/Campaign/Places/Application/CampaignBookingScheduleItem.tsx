import { Checkbox, HStack, VStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useContext, useMemo } from 'react'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { Disponibility } from '~typings/api'
import { format } from '~utils/date'
import { createOldEvents } from '~utils/schedule'

export const checkBoxStyle = {
  "span[class*='checkbox__control']": {
    borderRadius: '50%',
    width: '20px',
    height: '20px',
  },
}

const CampaignBookingScheduleItem = ({
  disponibility,
}: {
  disponibility: Disponibility
}) => {
  const { data: user } = useCurrentUser()
  const { selected, setSelected } = useContext(BookingScheduleContext)
  const { t } = useTranslation('place')

  const accomodationHelper =
    disponibility?.accomodation === 0
      ? t('detail.campaign.schedule_item.no_accomodation')
      : t(
          `detail.campaign.schedule_item.accomodation${
            disponibility?.accomodation > 1 ? 's' : ''
          }`,
          {
            nb: disponibility?.accomodation,
          },
        )

  const staff_availability = disponibility?.staff as string[]
  const staffHelper = staff_availability?.includes('no')
    ? t('detail.campaign.schedule_item.no_staff')
    : `${t('detail.campaign.schedule_item.staff', {
        list: `(${staff_availability
          ?.map((el) => t(`campaign.schedule.staff.${el}`))
          .join(', ')}).`,
      })} `

  const sceneGridHelper = disponibility?.scene_grid
    ? t('detail.campaign.schedule_item.scene_grid')
    : t('detail.campaign.schedule_item.no_scene_grid')

  const event = createOldEvents([disponibility])[0]
  const isSelected = useMemo(
    //@ts-expect-error
    () => selected.some((dispo) => dispo.extendedProps.id === disponibility.id),
    [selected, disponibility],
  )

  const handleClick = () => {
    if (isSelected) {
      setSelected(
        //@ts-expect-error
        selected.filter((el) => el.extendedProps.id !== disponibility.id),
      )
    } else {
      setSelected([
        ...selected,
        {
          ...event,
          extendedProps: { ...event?.extendedProps, isCampaignEvent: true },
        },
      ])
    }
  }

  return (
    <HStack
      p={4}
      backgroundColor="white"
      width="100%"
      alignItems="flex-start"
      spacing={6}
      border={isSelected ? '2px solid #6EAE7F' : '2px solid transparent'}
      borderRadius="8px"
    >
      <Checkbox
        colorScheme="green"
        paddingTop={2}
        sx={checkBoxStyle}
        isChecked={isSelected}
        onChange={handleClick}
        isDisabled={user?.type === 'place'}
      />
      <VStack alignItems="flex-start" spacing={1}>
        <Text fontWeight="bold">{`${format(
          disponibility?.start,
          'dd MMMM',
        )} → ${format(disponibility?.end, 'dd MMMM')}`}</Text>
        <Text color="gray.400">{`${accomodationHelper} ${staffHelper} ${sceneGridHelper}`}</Text>
      </VStack>
    </HStack>
  )
}

export default CampaignBookingScheduleItem
