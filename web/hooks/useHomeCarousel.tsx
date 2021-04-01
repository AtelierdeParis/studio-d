import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useHomeCarousel = () => {
  return useQuery('homeCarousel', () =>
    client.homeCarousel.homeCarouselList().then((res) => res.data),
  )
}
