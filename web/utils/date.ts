import fr from 'date-fns/locale/fr'
import DateFnsFormat from 'date-fns/format'

export const format = (
  date: string | Date,
  formatDate: string = 'dd/MM/yyyy',
) =>
  DateFnsFormat(new Date(date), formatDate, {
    locale: fr,
  })

export const orderByDate = (array: Record<string, any>[], key: string) => {
  if (!array) return []
  return array.sort((a, b) => {
    // @ts-ignore
    return new Date(a[key]) - new Date(b[key])
  })
}
