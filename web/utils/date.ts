import fr from 'date-fns/locale/fr'
import DateFnsFormat from 'date-fns/format'

export const format = (
  date: string | Date,
  formatDate: string = 'dd/MM/yyyy',
) =>
  DateFnsFormat(new Date(date), formatDate, {
    locale: fr,
  })
