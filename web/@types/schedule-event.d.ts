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
  date: Date
  extendedProps: {
    type: ScheduleEventWhen
    isSelected?: boolean
  }
}
