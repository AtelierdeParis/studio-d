import { Box, HStack, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { CampaignMode } from '~components/Campaign/CampaignContext'
import { ROUTE_ACCOUNT_APPLICATIONS } from '~constants'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import { Espace } from '~typings/api'
import { format } from '~utils/date'

const ApplicationSelector = ({
  places,
  hasConfirmedSelection,
}: {
  places: Espace[]
  hasConfirmedSelection?: boolean
}) => {
  const router = useRouter()
  const {
    espace: queryEspace,
    disponibility: queryDisponibility,
    campaign,
  } = router.query
  const { selectedCampaign } = useSelectedCampaign()
  const [espace, setEspace] = useState(queryEspace)
  const [disponibility, setDisponibility] = useState(queryDisponibility)

  const initState = () => {
    const espace = places?.[0]?.id
    const disponibility = places?.[0]?.disponibilities[0]?.id
    setEspace(espace)
    setDisponibility(disponibility)
    if (!queryEspace || !queryDisponibility) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, espace, disponibility },
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
      return places?.find((p) => p.id.toString() === espace.toString())
        ?.disponibilities
    }
    return []
  }

  const dispoOptions = useMemo(() => getDispoOptions(espace), [
    espace,
    campaign,
  ])

  return (
    <HStack paddingBottom={4}>
      <Box background="#F4F5F9" p={1} borderRadius="18px">
        <Select
          width="auto"
          height="30px"
          borderRadius="18px"
          backgroundColor={
            selectedCampaign?.mode === 'closed' ? 'gray.700' : 'blue.500'
          }
          color="white"
          value={espace}
          onChange={(e) => {
            setEspace(e.target.value)
            const disponibility = getDispoOptions(e.target.value)[0]?.id
            router.push({
              pathname: router.pathname,
              query: { ...router.query, espace: e.target.value, disponibility },
            })
          }}
        >
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </Select>
      </Box>

      {Boolean(dispoOptions?.length) && (
        <Box background="#F4F5F9" p={1} borderRadius="18px">
          <Select
            width="auto"
            height="30px"
            borderRadius="18px"
            backgroundColor={
              selectedCampaign?.mode === 'closed'
                ? 'gray.700'
                : hasConfirmedSelection
                ? '#4B965F'
                : 'blue.500'
            }
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
                {format(d.start, 'dd/MM')} → {format(d.end, 'dd/MM')}
              </option>
            ))}
          </Select>
        </Box>
      )}
    </HStack>
  )
}

export default ApplicationSelector
