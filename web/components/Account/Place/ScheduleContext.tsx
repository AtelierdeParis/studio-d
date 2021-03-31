import React from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import { Espace } from '~typings/api'

interface IScheduleContext {
  newEvents?: ScheduleEvent[]
  oldEvents?: ScheduleEvent[]
  oldEventsDate?: Date[]
  eventsIdToDelete?: string[]
  setToDelete: (events: string[]) => void
  place: Espace
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
