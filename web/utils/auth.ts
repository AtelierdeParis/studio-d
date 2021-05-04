import { getSession } from 'next-auth/client'
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_PLACES,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'

export const requireAuth = (inner, opposite: boolean = false) => {
  return async (context) => {
    const session = await getSession(context)

    if ((opposite && session) || (!opposite && !session)) {
      return { redirect: { destination: '/', permanent: false } }
    }

    return inner ? inner(context) : { props: { session } }
  }
}

export const getRouteToRedirect = (user = null, bookings = []) => {
  if (!user) return null
  if (user.type === 'place' && user.espaces.length > 0)
    return ROUTE_ACCOUNT_PLACES
  if (user.type === 'company' && bookings && bookings.length > 0)
    return ROUTE_ACCOUNT_REQUEST
  return ROUTE_ACCOUNT
}
