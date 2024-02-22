import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Application, Applications } from '~typings/api'

export const useMyApplications = ({
  searchParams = {},
  options = {},
  campaignId,
  name = ['myApplications'],
}: {
  searchParams?: Applications.ApplicationsList.RequestQuery
  campaignId: string
  options?: UseQueryOptions<Application[]>
  name?: string[]
}) => {
  return useQuery(
    name,
    () =>
      client.applications
        .getMyApplications(campaignId, searchParams)
        .then((res) => res.data),
    options,
  )
}
