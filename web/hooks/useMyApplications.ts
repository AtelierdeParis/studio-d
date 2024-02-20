import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Application } from '~typings/api'

export const useMyApplications = (
  type: 'all' | 'request' | 'booking' = 'all',
  options: UseQueryOptions<Application[]> = {},
) => {
  return useQuery(
    ['myApplications', type],
    () => client.applications.applicationsList().then((res) => res.data),
    options,
  )
}
