export enum SurfaceOptions {
  LESS_50 = '< 50',
  BETWEEN_50_120 = '50 - 120',
  GREATER_120 = '> 120',
}

export enum HeightOptions {
  LESS_3 = '< 3',
  BETWEEN_3_5 = '3 - 5',
  GREATER_5 = '> 5',
}

export enum SortOptions {
  DISPO_ASC = 'dispoAsc',
  NB_DISPO_DESC = 'nbDispoDesc',
  SURFACE_ASC = 'surfaceAsc',
  SURFACE_DESC = 'surfaceDesc',
}

export interface SearchQuery {
  surface_lt?: number
  surface_gt?: number
  surface_gte?: number
  surface_lte?: number
  height_lt?: number
  height_gt?: number
  height_gte?: number
  height_lte?: number
  city_eq?: string
  accomodation_eq?: boolean
  mirror_eq?: boolean
  danceBar_eq?: boolean
  technicalStaff_eq?: boolean
  _sort?: string
  floor_eq?: boolean
  published_eq: boolean
  'disponibilities.start_gte'?: Date
  'disponibilities.end_gte'?: Date
}

export const formatSearch = (formData): SearchQuery => {
  const query = {}
  const data = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => {
      if (value === 'true') return [key, true]
      else if (value === 'false') return [key, false]

      return [key, value]
    }),
  )

  if (Boolean(data.sortBy)) {
    switch (data.sortBy) {
      case SortOptions.DISPO_ASC:
        query['_sort'] = 'dispo'
        break
      case SortOptions.NB_DISPO_DESC:
        query['_sort'] = 'nbDispo'
        break
      case SortOptions.SURFACE_ASC:
        query['_sort'] = 'surface:asc'
        break
      case SortOptions.SURFACE_DESC:
        query['_sort'] = 'surface:desc'
        break
    }
  }

  if (Boolean(data.surface)) {
    switch (data.surface) {
      case SurfaceOptions.LESS_50:
        query['surface_lt'] = 50
        break
      case SurfaceOptions.BETWEEN_50_120:
        query['surface_gte'] = 50
        query['surface_lte'] = 120
        break
      case SurfaceOptions.GREATER_120:
        query['surface_gt'] = 120
        break
    }
  }

  if (Boolean(data.height)) {
    switch (data.height) {
      case HeightOptions.LESS_3:
        query['height_lt'] = 3
        break
      case HeightOptions.BETWEEN_3_5:
        query['height_gte'] = 3
        query['height_lte'] = 5
        break
      case HeightOptions.GREATER_5:
        query['height_gt'] = 5
        break
    }
  }

  if (Boolean(data.city)) {
    query['city_eq'] = data.city
  }

  if (data.accomodation) {
    query['accomodation_eq'] = true
  }

  if (data.mirror) {
    query['mirror_eq'] = true
  }

  if (data.danceBar) {
    query['danceBar_eq'] = true
  }

  if (data.technicalStaff) {
    query['technicalStaff_eq'] = true
  }

  if (Boolean(data.floor)) {
    query['floor_eq'] = data.floor
  }

  if (Boolean(data.startDate)) {
    query['disponibilities.start_gte'] = data.startDate
  }

  if (Boolean(data.endDate)) {
    query['disponibilities.end_lte'] = data.endDate
  }

  return {
    published_eq: true,
    ...query,
  }
}
