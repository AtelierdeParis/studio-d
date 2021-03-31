import React from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import { Place } from '~@types/place.d'

interface IScheduleContext {
  newEvents?: ScheduleEvent[]
  oldEvents?: ScheduleEvent[]
  oldEventsDate?: Date[]
  eventsIdToDelete?: number[]
  setToDelete: (events: number[]) => void
  place: Place
}

const ScheduleContext = React.createContext<IScheduleContext>({
  newEvents: [],
  oldEvents: [],
  oldEventsDate: [],
  eventsIdToDelete: [],
  setToDelete: null,
  place: null,
})

export default ScheduleContext
