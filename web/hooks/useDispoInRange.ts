import { useMemo } from 'react'
import { Disponibility } from '~typings/api'
import isSameDay from 'date-fns/isSameDay'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'

const useDispoInRange = (
  disponibilities: Disponibility[] = [],
  start: Date,
  end?: Date,
) => {
  return useMemo(() => {
    if (disponibilities.length === 0 || (!start && !end)) return null
    return disponibilities?.filter((dispo) => {
      return (
        isSameDay(start, new Date(dispo.start)) ||
        (end &&
          ((isAfter(new Date(dispo.start), start) &&
            isBefore(new Date(dispo.start), end)) ||
            isSameDay(end, new Date(dispo.start))))
      )
    })
  }, [disponibilities, start, end])
}

export default useDispoInRange
