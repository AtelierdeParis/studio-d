export enum ScheduleEventWhen {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  FULL = 'full',
}

export enum ScheduleEventType {
  PUNCTUAL = 'punctual',
  DAY = 'day',
  PERIOD = 'period',
}

export interface ScheduleEvent {
  start: Date
  end?: Date
  extendedProps: {
    id: number
    when: ScheduleEventWhen
    status: string
    hasEventSameDay?: boolean
    type: ScheduleEventType
  }
}
