import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useCities = () => {
  return useQuery('cities', () =>
    // @ts-ignore
    client.cities.citiesList({ 'espaces.published_eq': true }).then((res) => {
      return res.data
        .filter((val) => val.name !== 'todefine' && val.espaces.length > 0)
        .map((city) => ({
          value: city.name,
          label: city.name,
        }))
    }),
  )
}
