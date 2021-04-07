import { client } from '~api/client-api'

export const getPage = (route) => {
  return client.pages
    .pagesDetail(route.replace('/', ''))
    .then((res) => res.data)
    .catch(() => null)
}
