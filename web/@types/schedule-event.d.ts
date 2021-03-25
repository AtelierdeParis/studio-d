export enum ScheduleEventType {
  MORNING = 'morning',
  AFTERNOON = 'morning',
  FULL = 'full',
}

export interface ScheduleEvent {
  date: Date
  extendedProps: {
    type: ScheduleEventType
    isSelected?: boolean
  }
}
