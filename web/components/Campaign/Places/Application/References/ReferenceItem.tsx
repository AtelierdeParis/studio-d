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
  handleDelete: () => void
  handleEdit: () => void
  index: number
  isEdited?: boolean
}) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  return (
    <VStack
      border="1px solid blue"
      borderColor="blue.500"
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
      </HStack>

      <VStack width="100%" alignItems={'flex-start'} spacing={0}>
        <Text fontWeight={'bold'}>
          {reference.title}, {reference.year}
        </Text>
        <Text>
          <Text as="span">
            {t(
              `campaignApplication.references.references_actor${
                reference?.actors > 1 ? 's' : ''
              }_display`,
              {
                number: reference?.actors,
              },
            )}
          </Text>
          <Text as="span" pl={1} color="gray.500">
            {[
              ...((Array.isArray(reference?.coproducers)
                ? reference.coproducers
                : reference.coproducers.split(',')
              ).map(
                (coproducer) =>
                  currentCampaign.users_permissions_users.find(
                    (user) => user?.id === coproducer,
                  )?.structureName,
              ) || []),
              reference.other,
            ]?.join(', ')}
          </Text>
        </Text>
      </VStack>
    </VStack>
  )
}

export default ReferenceItem
