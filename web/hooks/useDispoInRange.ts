import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import { useMemo } from 'react'
import { Disponibility } from '~typings/api'

const useDispoInRange = (
  disponibilities: Disponibility[] = [],
  start: Date,
  end?: Date,
) => {
  return useMemo(() => {
    if (disponibilities.length === 0 || (!start && !end)) return null
    return disponibilities?.filter((dispo) => {
      return (
        isSameDay(new Date(start), new Date(dispo.start)) ||
        (end &&
          ((isAfter(new Date(dispo.start), new Date(start)) &&
            isBefore(new Date(dispo.start), new Date(end))) ||
            isSameDay(new Date(end), new Date(dispo.start))))
      )
    })
  }, [disponibilities, start, end])
}

export default useDispoInRange
