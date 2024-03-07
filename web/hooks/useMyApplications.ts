import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Application, Applications } from '~typings/api'

export const useMyApplications = ({
  searchParams = {},
  options = {},
  name = ['myApplications'],
}: {
  searchParams?: Applications.ApplicationsList.RequestQuery
  options?: UseQueryOptions<Application[]>
  name?: string[]
}) => {
  return useQuery(
    name,
    () =>
      client.applications
        .getMyApplications(searchParams)
        .then((res) => res.data),
    options,
  )
}
