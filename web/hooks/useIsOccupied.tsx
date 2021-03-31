import { useMemo } from 'react'
import { Disponibility } from '~@types/disponibility.d'
import isToday from 'date-fns/isToday'
import isWithinInterval from 'date-fns/isWithinInterval'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import { ScheduleEventWhen } from '~@types/schedule-event.d'
import setHours from 'date-fns/setHours'

const useIsOccupied = (disponibilities: Disponibility[] = []) => {
  return useMemo(() => {
    const morning = setHours(new Date(), 8)
    const afternoon = setHours(new Date(), 14)
    return disponibilities.some((dispo) => {
      const start = new Date(dispo.start)
      const end = new Date(dispo.end)
      const days = eachDayOfInterval({ start, end })

      return days.some((date) => {
        if (isToday(date)) {
          if (
            [ScheduleEventWhen.AFTERNOON, ScheduleEventWhen.MORNING].includes(
              dispo.when,
            )
          ) {
            const isMorning = isWithinInterval(new Date(), {
              start: morning,
              end: afternoon,
            })
            if (isMorning) {
              return ScheduleEventWhen.MORNING === dispo.when
            }
            return ScheduleEventWhen.AFTERNOON === dispo.when
          }
          return true
        }
        return false
      })
    })
  }, [disponibilities])
}

export default useIsOccupied
