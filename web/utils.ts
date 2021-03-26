import { getSession } from 'next-auth/client'
import { ScheduleEventType, ScheduleEventWhen } from '~@types/schedule-event.d'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import isBefore from 'date-fns/isBefore'
import setHours from 'date-fns/setHours'

export const requireAuth = (inner, opposite: boolean = false) => {
  return async (context) => {
    const session = await getSession(context)

    if ((opposite && session) || (!opposite && !session)) {
      return { redirect: { destination: '/', permanent: false } }
    }

    return inner ? inner(context) : { props: { session } }
  }
}

export const createScheduleEventObj = (
  start,
  when = null,
  end = null,
  status = 'selected',
) => {
  return {
    start: new Date(start),
    end: end ? setHours(new Date(end), 12) : null,
    extendedProps: {
      when,
      status,
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

export const createScheduleEvents = (form) => {
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
      repeatedEvents.map((date) =>
        events.push(createScheduleEventObj(date, form.when)),
      )
    } else {
      events.push(createScheduleEventObj(start, form.when))
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
        events.push(createScheduleEventObj(start, null, end)),
      )
    } else {
      events.push(createScheduleEventObj(start, null, end))
    }
  }
  return events
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

export const createDbEventObj = (type, start, when = null, end = null) => ({
  type,
  start,
  end: end || start,
  when,
})
