import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React, { useRef, useEffect, useContext, useMemo } from 'react'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex } from '@chakra-ui/react'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { useFormContext } from 'react-hook-form'
import isSameDay from 'date-fns/isSameDay'
import isToday from 'date-fns/isToday'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import styled from '@emotion/styled'

export const StyleWrapper = styled.div`
  ${(props) => props.className} {
    background: repeating-linear-gradient(
      -45deg,
      white,
      white 5px,
      #ebecf2 5px,
      #ebecf2 10px
    );
    inset: 0;
    display: block;
    position: absolute;
    z-index: 11;
    border-radius: 8px;
    margin: 3px 2px 3px 2px;
    mix-blend-mode: multiply;
  }
`

const Schedule = ({ isCampaignMode }: { isCampaignMode?: boolean }) => {
  const { currentCampaign } = useCampaignContext()
  const { watch } = useFormContext()
  const { start } = watch(['start'])
  const { oldEvents, newEvents, setToDelete, eventsIdToDelete } = useContext(
    ScheduleContext,
  )
  const scheduleRef = useRef(null)

  const view = createPlugin({
    views: {
      custom: {
        type: 'dayGridMonth',
        eventContent: ({ event }) => {
          return (
            // @ts-ignore
            <ScheduleSlot
              isCampaignMode={isCampaignMode}
              {...event._def.extendedProps}
              range={event._instance.range}
            />
          )
        },
      },
    },
  })

  useEffect(() => {
    if (!scheduleRef || !start) return
    const calendarApi = scheduleRef.current.getApi()
    calendarApi.gotoDate(new Date(start))
  }, [start, scheduleRef])

  const events = useMemo(() => {
    const filteredEvents = oldEvents.concat(newEvents).filter((event) => {
      return !(
        event.extendedProps.hasEventSameDay &&
        event.extendedProps.status === 'error'
      )
    })

    return filteredEvents
      .map((event) => {
        const hasEventSameDay = filteredEvents.some(
          (e) =>
            event.extendedProps.id !== e.extendedProps.id &&
            !event.extendedProps.hasEventSameDay &&
            isSameDay(e.start, event.start),
        )

        return {
          ...event,
          extendedProps: {
            ...event.extendedProps,
            hasEventSameDay:
              hasEventSameDay || event.extendedProps.hasEventSameDay,
          },
        }
      })
      .sort((a, b) => {
        // @ts-ignore
        return new Date(a.start) - new Date(b.start)
      })
  }, [oldEvents, newEvents])

  const excludedDaysClassName = useMemo(() => {
    let classNames = []
    const events = [...oldEvents, ...newEvents]

    events.forEach((event) => {
      const dates = event?.extendedProps?.exclude_days?.map((el) =>
        format(el, 'yyyy-MM-dd'),
      )

      dates?.map((date) => {
        classNames.push(`[data-date='${date}'] .fc-daygrid-day-frame:after`)
      })
    })
    return classNames.join(', ')
  }, [oldEvents, newEvents])

  return (
    <Flex
      w={{ base: 'calc(100% + 1.5rem)', md: '100%', schedule: '600px' }}
      backgroundColor="blue.100"
      borderRadius="sm"
      px={4}
      pb={6}
      ml={{ base: '-0.75rem', md: 0 }}
      minH={{ base: 'none', schedule: '600px' }}
      my={{ base: 8, schedule: 0 }}
      id="calendar"
      className="account-schedule"
    >
      <StyleWrapper className={excludedDaysClassName} style={{ width: '100%' }}>
        <FullCalendar
          ref={scheduleRef}
          plugins={[dayGridPlugin, interactionPlugin, view]}
          initialView="custom"
          headerToolbar={{
            start: 'prev',
            center: 'title',
            end: 'next',
          }}
          initialDate={isCampaignMode && currentCampaign?.campaign_start}
          dayCellContent={(day) => {
            const event = events.find((event) =>
              isSameDay(event.start, day.date),
            )
            const hasEvent = Boolean(event)
            const isCampaignEvent = event?.extendedProps?.isCampaignEvent
            const isDisabled =
              (isCampaignMode && !isCampaignEvent) ||
              (!isCampaignMode && isCampaignEvent)

            return (
              <Box
                color={hasEvent && 'black'}
                borderBottom={isToday(day.date) && '1px solid orange'}
                lineHeight="1"
                fontSize={{ base: '11px', sm: 'sm', md: 'md' }}
                pt={{ base: 0, sm: 0.5 }}
                opacity={isDisabled ? 0.6 : 1}
              >
                {day.dayNumberText}
              </Box>
            )
          }}
          dateClick={() => {
            if (eventsIdToDelete.length > 0) setToDelete([])
          }}
          fixedWeekCount={false}
          nextDayThreshold="00:00"
          events={events}
          locale={frLocale}
        />
      </StyleWrapper>
    </Flex>
  )
}

export default Schedule
