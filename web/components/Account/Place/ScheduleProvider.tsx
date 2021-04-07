import React, { useMemo, useState } from 'react'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import { Espace } from '~typings/api'
import { createNewEvents, createOldEvents } from '~utils/schedule'
import { useFormContext } from 'react-hook-form'
import isSameDay from 'date-fns/isSameDay'

interface IScheduleProvider {
  place: Espace
  children: React.ReactNode
}

const ScheduleProvider = ({ place, children }: IScheduleProvider) => {
  const { watch, errors } = useFormContext()
  const [eventsIdToDelete, setToDelete] = useState<string[]>([])

  const formValues = watch()

  const oldEvents = useMemo(() => createOldEvents(place?.disponibilities), [
    place?.disponibilities,
  ])

  const oldEventsDate = useMemo(() => {
    return oldEvents
      .map((event) => {
        if (isSameDay(event.start, event.end)) return event.start

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
