export interface User {
  address: string
  ape: string
  city: string
  blocked: boolean
  confirmed: boolean
  email: string
  firstname: string
  lastname: string
  license: string
  phone?: string
  provider: string
  siret: string
  socialReason?: string
  structureName: string
  username: string
  website?: string
  zipCode: string
  created_at: Date
  updated_at: Date
}
