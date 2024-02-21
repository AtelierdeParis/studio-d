import { HStack, Select } from '@chakra-ui/react'
import { useMyPlaces } from '~hooks/useMyPlaces'

const ApplicationSelector = () => {
  const { data: places, isLoading } = useMyPlaces()
  if (isLoading || !places) return null

  return (
    <HStack>
      <Select>
        {places.map((place) => (
          <option value={place.id}>{place.name}</option>
        ))}
      </Select>
    </HStack>
  )
}

export default ApplicationSelector
