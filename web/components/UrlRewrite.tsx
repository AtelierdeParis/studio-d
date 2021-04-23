import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'

const UrlRewrite = ({ id, path }) => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  useEffect(() => {
    router.push(makeContextualHref({ id }), `${path}${id ? `/${id}` : ''}`, {
      shallow: true,
    })
  }, [])
  return <></>
}
export default UrlRewrite
