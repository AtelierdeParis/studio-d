import { useMemo } from 'react'
import { Disponibility } from '~typings/api'
import isSameWeek from 'date-fns/isSameWeek'

const useNbDispoPerWeek = (week: Date, disponibilities: Disponibility[]) => {
  return useMemo(() => {
    return disponibilities?.filter((dispo) => {
      return isSameWeek(week, new Date(dispo.start), {
        weekStartsOn: 1,
      })
    })
  }, [week, disponibilities])
}

export default useNbDispoPerWeek
