import { ScheduleEventWhen, ScheduleEventType } from './schedule-event'

export enum DisponibilityStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  BOOKED = 'booked',
}

export interface Disponibility {
  id: number
  type: ScheduleEventType
  when: ScheduleEventWhen | null
  status: DisponibilityStatus
  start: Date
  end: Date
}
