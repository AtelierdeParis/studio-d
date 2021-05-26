import { ROUTE_ACCOUNT_MESSAGE_DETAIL } from '~constants'
import Link from '~components/Link'
import { Trans } from 'next-i18next'
import isSameDay from 'date-fns/isSameDay'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'

const getCreatedText = (booking, userType) => {
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
        i18nKey={`booking:history.${userType}.created.many`}
        components={components}
      />
    )
  }
  if (isSameDay(new Date(dispos[0].start), new Date(dispos[0].end))) {
    return (
      <Trans
        i18nKey={`booking:history.${userType}.created.day`}
        components={components}
        values={{
          date: format(dispos[0].start, 'd MMMM yyyy'),
        }}
      />
    )
  }

  return (
    <Trans
      i18nKey={`booking:history.${userType}.created.period`}
      components={components}
      values={{
        start: format(dispos[0].start, 'd MMMM yyyy'),
        end: format(dispos[0].end, 'd MMMM yyyy'),
      }}
    />
  )
}

const getDisposRemovedText = (
  userType,
  status,
  bookingType,
  disponibilities = [],
) => {
  const dates = disponibilities.map((dispo, index) => {
    let separator = ''

    if (index > 0) {
      separator = index + 1 === disponibilities.length ? ' et' : ','
    }

    if (dispo.type === 'period') {
      return `${separator} le ${format(dispo.start, 'd')} - ${format(
        dispo.end,
        'd MMM yyyy',
      )} (${
        differenceInDays(new Date(dispo.end), new Date(dispo.start)) + 1
      } jours)`
    } else {
      return `${separator} le ${format(dispo.end, 'd MMM yyyy')}${
        dispo.when
          ? ` (${dispo.when === 'morning' ? 'matin' : 'après-midi'})`
          : ''
      }`
    }
  })

  return (
    <Trans
      i18nKey={`booking:history.${userType}.${status}${
        disponibilities.length > 1 ? 's' : ''
      }`}
      values={{
        nb: disponibilities.length,
        verb: bookingType === 'request' ? 'retiré' : 'annulé',
        type: bookingType === 'request' ? 'demande' : 'réservation',
        dates: dates.join(''),
      }}
    />
  )
}

export const getHistoryInfo = (
  status,
  booking,
  userType,
  bookingType,
  disponibilities,
) => {
  switch (status) {
    case 'accepted':
      return {
        colorCircle: 'green.500',
        color: 'green.500',
        text: <Trans i18nKey={`booking:history.${userType}.accepted`} />,
      }
    case 'created':
      return {
        color: 'black',
        colorCircle: 'gray.300',
        text: getCreatedText(booking, userType),
      }
    case 'askcancel':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: (
          <Trans
            i18nKey={`booking:history.${userType}.askcancel`}
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
    case 'requestcanceled':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: <Trans i18nKey={`booking:history.${userType}.canceledByYou`} />,
      }
    case 'disporemovedbyplace':
    case 'disporemovedbycompany':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: getDisposRemovedText(
          userType,
          status,
          bookingType,
          disponibilities,
        ),
      }
    case 'requestcanceledbyplace':
    case 'bookingcanceledbyplace':
      return {
        colorCircle: 'red.600',
        color: 'red.600',
        text: <Trans i18nKey={`booking:history.${userType}.canceledByPlace`} />,
      }
  }
}
