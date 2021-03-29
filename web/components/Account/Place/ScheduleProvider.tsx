import React, { useMemo } from 'react'
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

  const formValues = watch()

  const oldEvents = useMemo(
    () =>
      place?.disponibilities.map((dispo) => {
        return createScheduleEventObj({
          start: dispo.start,
          end: dispo.end,
          when: dispo.when,
          status: 'available',
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
        oldEvents,
        newEvents,
        oldEventsDate,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider
