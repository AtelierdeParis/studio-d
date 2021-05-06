import { useMemo } from 'react'

export const useIsComplete = (place) => {
  return useMemo(() => {
    if (!place || !place.external_id) return true
    return !(
      place.height === 0 ||
      place.surface === 0 ||
      place.danceCarpet === null ||
      place.floor === 'todefine' ||
      place.city === 'todefine' ||
      place.country === 'todefine' ||
      place.latitude === 'todefine' ||
      place.longitude === 'todefine' ||
      place.address === 'todefine' ||
      place.name === 'todefine'
    )
  }, [place])
}
