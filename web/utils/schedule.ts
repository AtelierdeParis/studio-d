import {
  ScheduleEventType,
  ScheduleEventWhen,
  ScheduleEvent,
} from '~@types/schedule-event.d'
import { Disponibility } from '~typings/api'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import isBefore from 'date-fns/isBefore'
import setHours from 'date-fns/setHours'
import isSameDay from 'date-fns/isSameDay'

export const createScheduleEventObj = ({
  start,
  when = null,
  end = null,
  type = null,
  status = 'selected',
  id = null,
  hasEventSameDay = false,
}): ScheduleEvent => {
  return {
    start: new Date(start),
    end: end ? setHours(new Date(end), 12) : start,
    extendedProps: {
      id,
      when,
      status,
      type,
      hasEventSameDay,
    },
  }
}

const repeatDailyEvent = (start, repeatNb, repeatType) => {
  let range = []

  switch (repeatType) {
    case 'day':
      range = eachDayOfInterval({
        start,
        end: addDays(start, repeatNb),
      })
      break
    case 'week':
      range = eachDayOfInterval(
        { start, end: addWeeks(start, repeatNb) },
        { step: 7 },
      )
      break
    case 'month':
      const array = Array.from(Array(Number(repeatNb) + 1).keys())
      range = array.map((nb) => addMonths(start, nb))
      break
  }
  return range
}

const repeatPeriodEvent = (start, end, repeatNb, repeatType) => {
  let range = []
  const arrayRepetition = Array.from(Array(Number(repeatNb) + 1).keys())

  switch (repeatType) {
    case 'week':
      range = arrayRepetition.map((nb) => ({
        start: addWeeks(start, nb),
        end: addWeeks(end, nb),
      }))
      break
    case 'month':
      range = arrayRepetition.map((nb) => ({
        start: addMonths(start, nb),
        end: addMonths(end, nb),
      }))
      break
  }
  return range
}

const checkIfEventSameDay = (disponibility, sources = []): boolean => {
  return sources.some(
    ({ start, id }) =>
      disponibility.id !== id &&
      isSameDay(new Date(disponibility.start), new Date(start)),
  )
}

export const createOldEvents = (
  disponibilities: Disponibility[] = [],
): ScheduleEvent[] => {
  return disponibilities
    .filter((dispo) => dispo.status !== 'past')
    .map((dispo) => {
      return createScheduleEventObj({
        id: dispo.id,
        start: dispo.start,
        end: dispo.end,
        when: dispo.when,
        status: dispo.status,
        type: dispo.type,
        hasEventSameDay: checkIfEventSameDay(dispo, disponibilities),
      })
    })
}

export const createNewEvents = (form, oldEventsDate = [], isError = false) => {
  const events = []
  if (!form.start || form.start === '') return events
  const start = form.start
  const end = form.end || null

  const isRepeatable =
    form.repeat &&
    form.repeatNb &&
    ['day', 'week', 'month'].includes(form.repeatType)

  if (
    (form.type === ScheduleEventType.PUNCTUAL && form.when) ||
    form.type === ScheduleEventType.DAY
  ) {
    if (isRepeatable) {
      const repeatedEvents = repeatDailyEvent(
        start,
        form.repeatNb,
        form.repeatType,
      )
      repeatedEvents.map((start) =>
        events.push(createScheduleEventObj({ start, when: form.when })),
      )
    } else {
      events.push(
        createScheduleEventObj({
          start,
          when: form.when,
        }),
      )
    }
  } else if (
    form.type === ScheduleEventType.PERIOD &&
    end &&
    isBefore(start, end)
  ) {
    if (isRepeatable) {
      const repeatedEvents = repeatPeriodEvent(
        start,
        end,
        form.repeatNb,
        form.repeatType,
      )
      repeatedEvents.map(({ start, end }) =>
        events.push(createScheduleEventObj({ start, end })),
      )
    } else {
      events.push(
        createScheduleEventObj({
          start,
          end,
        }),
      )
    }
  }

  return events.map((event) => {
    let hasEventSameDay
    if (form.type === ScheduleEventType.PERIOD) {
      const periodDays = eachDayOfInterval({
        start: event.start,
        end: event.end,
      })
      hasEventSameDay = periodDays.some((date) => {
        return oldEventsDate.some((oldEventDate) => {
          return isSameDay(oldEventDate, date)
        })
      })
    } else {
      hasEventSameDay = oldEventsDate.some((oldEventDate) => {
        return isSameDay(oldEventDate, new Date(event.start))
      })
    }
    return {
      ...event,
      extendedProps: {
        ...event.extendedProps,
        hasEventSameDay,
        status: isError ? 'error' : 'selected',
      },
    }
  })
}

export const createDbEvent = (type, start, when = null, end = null) => {
  if (when === ScheduleEventWhen.FULL) {
    return [
      createDbEventObj(type, start, ScheduleEventWhen.MORNING),
      createDbEventObj(type, start, ScheduleEventWhen.AFTERNOON),
    ]
  } else {
    return createDbEventObj(type, start, when, end)
  }
}

export const createDbEventObj = (type, start, when = null, end = null) => {
  let transformedStart = setHours(start, 6)
  let transformedEnd = setHours(end || start, 19)

  if (type === ScheduleEventType.PUNCTUAL) {
    if (when === ScheduleEventWhen.AFTERNOON) {
      transformedStart = setHours(start, 13)
    } else if (when === ScheduleEventWhen.MORNING) {
      transformedEnd = setHours(start, 13)
    }
  }

  return {
    type,
    start: transformedStart,
    end: transformedEnd,
    when,
  }
}
