import { Checkbox, HStack, VStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Disponibility } from '~typings/api'
import { format } from '~utils/date'

const DetailScheduleItem = ({
  disponibility,
}: {
  disponibility: Disponibility
}) => {
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

  return (
    <HStack
      p={4}
      backgroundColor="white"
      width="100%"
      alignItems="flex-start"
      spacing={6}
    >
      <Checkbox
        colorScheme="green"
        paddingTop={2}
        sx={{
          "span[class*='checkbox__control']:not([data-disabled])": {
            borderRadius: '50%',
            width: '20px',
            height: '20px',
          },
        }}
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

export default DetailScheduleItem
