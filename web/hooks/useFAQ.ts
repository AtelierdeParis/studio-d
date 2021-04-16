import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useFAQ = () => {
  return useQuery('faq', () =>
    client.faqCategories.faqCategoriesList().then((res) => res.data),
  )
}
