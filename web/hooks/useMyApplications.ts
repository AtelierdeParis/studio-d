import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Application } from '~typings/api'

export const useMyApplications = (
  options: UseQueryOptions<Application[]> = {},
) => {
  return useQuery(
    ['myApplications'],
    () => client.applications.getMyApplications().then((res) => res.data),
    options,
  )
}
