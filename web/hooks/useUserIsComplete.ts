import { useMemo } from 'react'

export const useUserIsComplete = (user) => {
  return useMemo(() => {
    if (!user || !user.external_id) return true

    return !(
      !user.firstname ||
      !user.lastname ||
      !user.structureName ||
      !user.address ||
      !user.zipCode ||
      !user.city ||
      !user.siret ||
      !user.ape ||
      !user.license ||
      (user.type === 'company' &&
        (!user.insuranceNumber ||
          !user.insuranceName ||
          !user.choreographer)) ||
      (user.type === 'place' &&
        (!user.legalRepresentative || !user.statusRepresentative))
    )
  }, [user])
}
