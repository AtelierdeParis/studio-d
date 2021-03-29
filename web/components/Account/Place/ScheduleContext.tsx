import React from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'

interface IScheduleContext {
  newEvents?: ScheduleEvent[]
  oldEvents?: ScheduleEvent[]
  oldEventsDate?: Date[]
}

const ScheduleContext = React.createContext<IScheduleContext>({
  newEvents: [],
  oldEvents: [],
  oldEventsDate: [],
})

export default ScheduleContext
