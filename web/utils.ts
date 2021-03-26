import { getSession } from 'next-auth/client'
import { ScheduleEventType, ScheduleEventWhen } from '~@types/schedule-event.d'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import isBefore from 'date-fns/isBefore'

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
    start,
    end,
    extendedProps: {
      when,
      status,
    },
  }
}

const repeatEvent = (start, repeatNb, repeatType) => {
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

export const createScheduleEvents = (form) => {
  const events = []

  if (!form.start || form.start === '') return events
  const start = new Date(form.start)

  const isRepeatable =
    form.repeat &&
    form.repeatNb &&
    ['day', 'week', 'month'].includes(form.repeatType)

  if (form.type === ScheduleEventType.PUNCTUAL && form.when) {
    if (isRepeatable) {
      const repeatedEvents = repeatEvent(start, form.repeatNb, form.repeatType)
      repeatedEvents.map((date) =>
        events.push(createScheduleEventObj(date, form.when)),
      )
    } else {
      events.push(createScheduleEventObj(start, form.when))
    }
  } else if (form.type === ScheduleEventType.DAY) {
    if (isRepeatable) {
      const repeatedEvents = repeatEvent(start, form.repeatNb, form.repeatType)
      repeatedEvents.map((date) => events.push(createScheduleEventObj(date)))
    } else {
      events.push(createScheduleEventObj(start))
    }
  } else if (
    form.type === ScheduleEventType.PERIOD &&
    Boolean(form.end) &&
    isBefore(start, new Date(form.end))
  ) {
    let range = []
    range = eachDayOfInterval({
      start,
      end: new Date(form.end),
    })

    range.map((date) => events.push(createScheduleEventObj(date, form.when)))
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
