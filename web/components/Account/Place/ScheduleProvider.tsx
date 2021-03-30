import React, { useMemo, useState } from 'react'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import { Place } from '~@types/place.d'
import { createScheduleEvents, createScheduleEventObj } from '~utils'
import { useFormContext } from 'react-hook-form'

interface IScheduleProvider {
  place: Place
  children: React.ReactNode
}

const ScheduleProvider = ({ place, children }: IScheduleProvider) => {
  const { watch, errors } = useFormContext()
  const [eventsIdToDelete, setToDelete] = useState<number[]>([])

  const formValues = watch()
  const oldEvents = useMemo(
    () =>
      place?.disponibilities.map((dispo) => {
        return createScheduleEventObj({
          id: dispo.id,
          start: dispo.start,
          end: dispo.end,
          when: dispo.when,
          status: dispo.status,
        })
      }),
    [place],
  )

  const oldEventsDate = useMemo(() => {
    return oldEvents
      .map((event) => {
        if (event.start === event.end) return event.start
        return eachDayOfInterval({
          start: event.start,
          end: event.end,
        })
      })
      .flat()
  }, [oldEvents])

  const newEvents = useMemo(
    () =>
      createScheduleEvents(
        formValues,
        oldEventsDate,
        errors?.repeatType || errors?.repeatNb,
      ),
    [formValues],
  )

  return (
    <ScheduleContext.Provider
      value={{
        place,
        oldEvents,
        newEvents,
        oldEventsDate,
        eventsIdToDelete,
        setToDelete,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider
