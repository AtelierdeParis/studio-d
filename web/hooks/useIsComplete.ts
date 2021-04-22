import { useMemo } from 'react'

export const useIsComplete = (place) => {
  return useMemo(() => {
    if (!place) return false

    return !(
      place.height === 0 ||
      place.surface === 0 ||
      place.danceCarpet === null ||
      place.floor === 'todefine'
    )
  }, [place])
}
