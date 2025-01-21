import {
  Box,
  Divider as ChakraDivider,
  DividerProps,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Chevron from 'public/assets/img/chevron-down.svg'
import { useEffect, useMemo, useState } from 'react'
import ApplicationPlaceListItem from '~components/Account/Application/Place/ApplicationPlaceListItem'
import ApplicationPlaceHelper from '~components/Account/Application/Place/ApplicationsHelpers/ApplicationPlaceHelper'
import ApplicationDetailDrawer from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailDrawer'
import Cell from '~components/Account/Booking/Cell'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import { Application } from '~typings/api'

interface Props {
  applications: Application[]
}

const Divider = (props: DividerProps) => (
  <ChakraDivider orientation="vertical" h="24px" mr={2.5} {...props} />
)

const ApplicationPlaceList = ({ applications = [] }: Props) => {
  const { t } = useTranslation('application')
  const [list, setList] = useState<Application[]>([])
  const [isDesc, setDesc] = useState<boolean>(true)
  const [selectedApplication, onApplicationSelect] = useState<Application>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { query } = useRouter()

  const { selectedCampaign } = useSelectedCampaign()

  useEffect(() => {
    setList(applications)
    setDesc(true)
  }, [applications])

  const sortByDate = () => {
    setDesc(!isDesc)
    setList(list.reverse())
  }

  const preselectedApplications = applications?.filter(
    (application) => application?.status === 'preselected',
  )

  const validatedApplications = applications?.filter(
    (application) => application?.status === 'confirmed',
  ).length

  const hasValidatedApplications =
    selectedCampaign?.mode === 'preselections' && validatedApplications > 0

  const filteredList = useMemo(
    () =>
      list.filter((application) => {
        return (
          !query.search?.length ||
          `${application?.company?.structureName} (${application.company?.firstname} ${application.company?.lastname})`
            .toLowerCase()
            ?.includes((query.search as string)?.toLowerCase())
        )
      }),
    [list, query.search],
  )

  return (
    <Box>
      <ApplicationPlaceHelper applications={applications} />

      {filteredList.length ? (
        <SimpleGrid
          gridTemplateColumns={`fit-content(300px) minmax(200px, auto) minmax(auto, auto) minmax(auto, auto)${
            ['preselections', 'closed']?.includes(selectedCampaign?.mode)
              ? 'minmax(auto, auto)'
              : ''
          }`}
          overflowX="auto"
        >
          <Cell isHeader>
            <Text pl="9px">{t('place.table.head.number')}</Text>
          </Cell>
          <Cell isHeader>
            <Divider />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flex={1}
              cursor="pointer"
              onClick={sortByDate}
            >
              <Text color="black">{t('place.table.head.artist')}</Text>
              <Box transform={`rotate(${isDesc ? '0' : '180'}deg)`}>
                <Chevron />
              </Box>
            </Flex>
          </Cell>
          <Cell isHeader>
            <Divider />
            <Text>{t('place.table.head.email')}</Text>
          </Cell>
          <Cell isHeader>
            <Divider />
            <Text>{t('place.table.head.creation')}</Text>
          </Cell>
          {['preselections', 'closed']?.includes(selectedCampaign?.mode) && (
            <Cell isHeader>
              <Divider />
            </Cell>
          )}

          {filteredList.map((application) => (
            <ApplicationPlaceListItem
              key={application.id}
              application={application}
              onSelect={() => {
                onApplicationSelect(application)
                onOpen()
              }}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box p={4} backgroundColor="gray.50" borderRadius={4} width="100%">
          <Text>
            {t(
              `place.no_applications${
                Boolean(
                  ['closed', 'preselections']?.includes(selectedCampaign?.mode),
                )
                  ? '_past'
                  : ''
              }`,
            )}
          </Text>
        </Box>
      )}

      <ApplicationDetailDrawer
        isOpen={isOpen}
        onClose={onClose}
        application={selectedApplication}
        hasValidatedApplications={hasValidatedApplications}
        canPreselect={
          preselectedApplications?.length <
            selectedCampaign?.preselections_max &&
          selectedCampaign?.mode === 'preselections'
        }
      />
    </Box>
  )
}

export default ApplicationPlaceList
