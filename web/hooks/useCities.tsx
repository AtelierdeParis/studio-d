import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useCities = () => {
  return useQuery('cities', () =>
    client.espaces.citiesList().then((res) =>
      res.data
        .filter((val) => val !== 'todefine')
        .map((city) => ({
          value: city,
          label: city,
        })),
    ),
  )
}
