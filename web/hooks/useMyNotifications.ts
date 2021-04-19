import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyNotifications = (query = {}) => {
  return useQuery(['myNotifications', query], () =>
    client.notifications.myNotifications(query).then((res) => res.data),
  )
}
