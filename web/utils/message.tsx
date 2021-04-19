import { ROUTE_ACCOUNT_MESSAGE_DETAIL } from '~constants'
import Link from '~components/Link'
import { Trans } from 'next-i18next'
import isSameDay from 'date-fns/isSameDay'
import { format } from '~utils/date'

const getCreatedText = (booking, type) => {
  const { disponibilities: dispos } = booking
  const components = {
    a: (
      <Link
        textDecoration="underline"
        href={{
          pathname: ROUTE_ACCOUNT_MESSAGE_DETAIL,
          query: { id: booking?.id },
        }}
      />
    ),
  }

  if (!dispos || dispos.length === 0) return '-'

  if (dispos.length > 1) {
    return (
      <Trans
        i18nKey={`booking:history.${type}.created.many`}
        components={components}
      />
    )
  }
  if (isSameDay(new Date(dispos[0].start), new Date(dispos[0].end))) {
    return (
      <Trans
        i18nKey={`booking:history.${type}.created.day`}
        components={components}
        values={{
          date: format(dispos[0].start, 'd MMMM yyyy'),
        }}
      />
    )
  }

  return (
    <Trans
      i18nKey={`booking:history.${type}.created.period`}
      components={components}
      values={{
        start: format(dispos[0].start, 'd MMMM yyyy'),
        end: format(dispos[0].end, 'd MMMM yyyy'),
      }}
    />
  )
}

export const getHistoryInfo = (status, booking, type) => {
  switch (status) {
    case 'accepted':
      return {
        colorCircle: 'green.500',
        color: 'green.500',
        text: <Trans i18nKey={`booking:history.${type}.accepted`} />,
      }
    case 'created':
      return {
        color: 'black',
        colorCircle: 'gray.300',
        text: getCreatedText(booking, type),
      }
    case 'askcancel':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: (
          <Trans
            i18nKey={`booking:history.${type}.askcancel`}
            components={{
              a: (
                <Link
                  textDecoration="underline"
                  href={{
                    pathname: ROUTE_ACCOUNT_MESSAGE_DETAIL,
                    query: { id: booking?.id },
                  }}
                />
              ),
            }}
          />
        ),
      }
    case 'canceled':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: <Trans i18nKey={`booking:history.${type}.canceledByYou`} />,
      }
    case 'canceledbyplace':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: <Trans i18nKey={`booking:history.${type}.canceledByPlace`} />,
      }
  }
}
