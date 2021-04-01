import { RefObject, useEffect, useCallback } from 'react'
import throttle from 'lodash.throttle'

export const useScrollBottom = (
  ref: RefObject<HTMLElement>,
  onScrollBottom: () => void,
): void => {
  const onScroll = useCallback(
    throttle(() => {
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop
      const gridBottom = ref.current.offsetTop + ref.current.offsetHeight

      if (scrollBottom > gridBottom) {
        onScrollBottom()
      }
    }, 100),
    [ref, onScrollBottom],
  )

  useEffect(() => {
    if (ref.current) {
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }
    return () => {}
  }, [ref, onScroll])
}
