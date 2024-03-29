import { useMyApplications } from '~hooks/useMyApplications'
import ApplicationPlaceList from '~components/Account/Application/Place/ApplicationPlaceList'
import Loading from '~components/Loading'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ApplicationPlaceData = ({ searchParams }) => {
  const { query } = useRouter()
  const {
    data: applications,
    isLoading,
    refetch,
    isFetching,
  } = useMyApplications({
    name: ['myApplications', query?.disponibility as string],
    searchParams: { ...searchParams, _sort: 'company.structureName:asc' },
    options: {
      enabled:
        Boolean(searchParams?.disponibility_eq) &&
        Boolean(searchParams?.espace_eq),
    },
  })

  useEffect(() => {
    refetch()
  }, [JSON.stringify(searchParams)])

  return (
    <Loading isLoading={isLoading || isFetching} isCentered>
      <ApplicationPlaceList applications={applications} />
    </Loading>
  )
}

export default ApplicationPlaceData
