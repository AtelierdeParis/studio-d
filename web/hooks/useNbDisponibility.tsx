import { useMemo } from 'react'
import { Disponibility } from '~typings/api'
import { DisponibilityStatus } from '~@types/disponibility.d'

const useNbDisponibility = (disponibilities: Disponibility[] = []) => {
  return useMemo(
    () =>
      disponibilities.reduce(
        (total, current) => {
          switch (current.status) {
            case DisponibilityStatus.AVAILABLE:
              total.available.push(current)
              break
            case DisponibilityStatus.PAST:
              total.past.push(current)
              break
            case DisponibilityStatus.BOOKED:
              total.booked.push(current)
              break
            case DisponibilityStatus.PENDING:
              total.pending.push(current)
              break
            case DisponibilityStatus.CANCELED:
              total.canceled.push(current)
              break
          }

          return total
        },
        {
          nbDispo:
            disponibilities.filter(
              (dispo) =>
                !['past', 'canceled'].includes(dispo.status) &&
                dispo.campaign === null,
            ).length || 0,
          available: [],
          booked: [],
          pending: [],
          past: [],
          canceled: [],
        },
      ),
    [disponibilities],
  )
}

export default useNbDisponibility
