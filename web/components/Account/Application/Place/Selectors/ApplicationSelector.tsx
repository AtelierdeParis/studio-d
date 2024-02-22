import { HStack, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { ROUTE_ACCOUNT_APPLICATIONS } from '~constants'
import { Espace } from '~typings/api'
import { format } from '~utils/date'

const ApplicationSelector = ({ places }: { places: Espace[] }) => {
  const { currentCampaign } = useCampaignContext()

  const router = useRouter()
  const {
    espace: queryEspace,
    disponibility: queryDisponibility,
  } = router.query
  const [espace, setEspace] = useState(queryEspace)
  const [disponibility, setDisponibility] = useState(queryDisponibility)

  const initState = () => {
    const espace = queryEspace || places?.[0]?.id
    const disponibility = places?.[0]?.id
    setEspace(espace)
    setDisponibility(disponibility)
    if (!queryEspace || !queryDisponibility) {
      router.push({
        pathname: router.pathname,
        query: { espace, disponibility },
      })
    }
  }

  useEffect(() => {
    initState()
  }, [])

  useEffect(() => {
    if (!espace) {
      initState()
    }
  }, [places])

  const getDispoOptions = (espace) => {
    if (espace) {
      return places
        ?.find((p) => p.id.toString() === espace.toString())
        ?.disponibilities //@ts-expect-error
        ?.filter((d) => d?.campaign === currentCampaign?.id)
    }
    return []
  }

  const dispoOptions = useMemo(() => getDispoOptions(espace), [espace])

  return (
    <HStack paddingBottom={4}>
      <Select
        width="auto"
        borderRadius="18px"
        backgroundColor="blue.500"
        color="white"
        value={espace}
        onChange={(e) => {
          setEspace(e.target.value)
          const disponibility = getDispoOptions(e.target.value)[0]?.id
          router.push({
            pathname: router.pathname,
            query: { espace: e.target.value, disponibility },
          })
        }}
      >
        {places.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </Select>

      {Boolean(dispoOptions?.length) && (
        <Select
          width="auto"
          borderRadius="18px"
          backgroundColor="blue.500"
          color="white"
          value={disponibility}
          onChange={(e) => {
            setDisponibility(e.target.value)
            router.push({
              pathname: ROUTE_ACCOUNT_APPLICATIONS,
              query: { ...router.query, disponibility: e.target.value },
            })
          }}
        >
          {dispoOptions.map((d) => (
            <option key={d.id} value={d.id}>
              {format(d.start, 'dd/MM')} {format(d.end, 'dd/MM')}
            </option>
          ))}
        </Select>
      )}
    </HStack>
  )
}

export default ApplicationSelector
