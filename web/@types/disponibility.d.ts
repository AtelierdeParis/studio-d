import { ScheduleEventWhen, ScheduleEventType } from './schedule-event'

export enum DisponibilityStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  BOOKED = 'booked',
  PAST = 'past',
  CANCELED = 'canceled',
}
