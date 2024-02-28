import { ButtonGroup, Button, Text, VStack, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Reference } from '~@types/reference'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const ReferenceItem = ({
  reference,
  index,
  handleEdit,
  handleDelete,
  isEdited,
}: {
  reference: Reference
  handleDelete?: () => void
  handleEdit?: () => void
  index: number
  isEdited?: boolean
}) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  const { coproducers, actors, other, title, year } = reference

  const coproducersValues = Array.isArray(coproducers)
    ? coproducers
    : typeof coproducers === 'string'
    ? coproducers.split(',')
    : []

  const partners = coproducersValues.map(
    (coproducer) =>
      currentCampaign?.users_permissions_users?.find(
        (user) => user?.id?.toString() === coproducer?.toString(),
      )?.structureName,
  )

  return (
    <VStack
      border="1px solid blue"
      borderColor={
        Boolean(handleDelete && handleEdit) ? 'blue.500' : 'transparent'
      }
      width="100%"
      p={4}
      borderRadius="4px"
      spacing={0}
      opacity={isEdited ? 0.5 : 1}
    >
      <HStack width="100%" justifyContent="space-between">
        <Text color="blue.500" fontWeight="bold">
          {t('campaignApplication.references.references_creation', {
            index: index + 1,
          })}
        </Text>
        {Boolean(handleDelete && handleEdit) && (
          <ButtonGroup>
            <Button
              variant="outline"
              colorScheme="blue"
              size="md"
              onClick={handleEdit}
              isDisabled={isEdited}
            >
              {t('campaignApplication.references.edit')}
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              colorScheme="blue"
              size="md"
              isDisabled={isEdited}
            >
              {t('campaignApplication.references.delete')}
            </Button>
          </ButtonGroup>
        )}
      </HStack>

      <VStack width="100%" alignItems={'flex-start'} spacing={0}>
        <Text fontWeight={'bold'}>
          {title}, {year}
        </Text>
        <Text>
          <Text as="span">
            {t(
              `campaignApplication.references.references_actor${
                actors > 1 ? 's' : ''
              }_display`,
              {
                number: actors,
              },
            )}
          </Text>
          <Text as="span" pl={1} color="gray.500">
            {(Boolean(other) ? [partners, other] : partners)?.join(', ')}
          </Text>
        </Text>
      </VStack>
    </VStack>
  )
}

export default ReferenceItem
