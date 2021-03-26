import { ScheduleEventWhen, ScheduleEventType } from './schedule-event'

export interface Disponibility {
  id: number
  type: ScheduleEventType
  when: ScheduleEventWhen | null
  start: Date
  end: Date
}
