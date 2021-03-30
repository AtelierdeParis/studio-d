import React, { useMemo, useState } from 'react'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import { Place } from '~@types/place.d'
import { createNewEvents, createOldEvents } from '~utils'
import { useFormContext } from 'react-hook-form'

interface IScheduleProvider {
  place: Place
  children: React.ReactNode
}

const ScheduleProvider = ({ place, children }: IScheduleProvider) => {
  const { watch, errors } = useFormContext()
  const [eventsIdToDelete, setToDelete] = useState<number[]>([])

  const formValues = watch()

  const oldEvents = useMemo(() => createOldEvents(place?.disponibilities), [
    place?.disponibilities,
  ])

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
      createNewEvents(
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
