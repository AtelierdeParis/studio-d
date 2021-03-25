import { getSession } from 'next-auth/client'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'

export const requireAuth = (inner, opposite: boolean = false) => {
  return async (context) => {
    const session = await getSession(context)

    if ((opposite && session) || (!opposite && !session)) {
      return { redirect: { destination: '/', permanent: false } }
    }

    return inner ? inner(context) : { props: { session } }
  }
}

const formatEvent = (date, type) => {
  return {
    date,
    extendedProps: {
      type,
      isSelected: true,
    },
  }
}

export const createScheduleEvents = (form) => {
  const events = []
  if (form.slot === 'day' && form.start !== '' && form.slotType) {
    const start = new Date(form.start)
    if (
      form.repeat &&
      form.repeatNb &&
      ['day', 'week', 'month'].includes(form.repeatType)
    ) {
      let range = []
      switch (form.repeatType) {
        case 'day':
          range = eachDayOfInterval({
            start,
            end: addDays(start, form.repeatNb),
          })
          break
        case 'week':
          range = eachDayOfInterval(
            { start, end: addWeeks(start, form.repeatNb) },
            { step: 7 },
          )
          break
        case 'month':
          const array = Array.from(Array(Number(form.repeatNb) + 1).keys())
          console.log(array)
          range = array.map((nb) => addMonths(start, nb))
          break
      }
      range.map((date) => events.push(formatEvent(date, form.slotType)))
    } else {
      events.push(formatEvent(start, form.slotType))
    }
  } else if (
    form.slot === 'period' &&
    Boolean(form.start) &&
    Boolean(form.end)
  ) {
    let range = []
    const start = new Date(form.start)
    const end = new Date(form.end)
    range = eachDayOfInterval({
      start,
      end,
    })
    range.map((date) => events.push(formatEvent(date, form.slotType)))
  }

  return events
}
