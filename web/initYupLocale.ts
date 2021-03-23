import { i18n } from 'next-i18next'
import * as yup from 'yup'

export const initYupLocale = () => {
  return yup.setLocale({
    mixed: {
      notType: i18n.t('yup:mixed.notType', {
        path: '${path}',
        value: '${value}',
        type: '${type}',
      }),
      required: i18n.t('yup:mixed.required', { path: '${path}' }),
      default: i18n.t('yup:mixed.default', { path: '${path}' }),
      oneOf: i18n.t('yup:mixed.oneOf', {
        path: '${path}',
        values: '${values}',
      }),
      notOneOf: i18n.t('yup:mixed.notOneOf', {
        path: '${path}',
        values: '${values}',
      }),
    },
    string: {
      email: i18n.t('yup:string.email'),
      url: i18n.t('yup:string.url'),
      max: i18n.t('yup:string.max', { max: '${max}' }),
      min: i18n.t('yup:string.min', { min: '${min}' }),
      matches: i18n.t('yup:string.matches', { matches: '${regex}' }),
    },
    number: {
      max: i18n.t('yup:number.max', { max: '${max}' }),
      min: i18n.t('yup:number.min', { min: '${min}' }),
      lessThan: i18n.t('yup:number.lessThan', { lessThan: '${less}' }),
      moreThan: i18n.t('yup:number.moreThan', { moreThan: '${more}' }),
      positive: i18n.t('yup:number.positive'),
      negative: i18n.t('yup:number.negative'),
      integer: i18n.t('yup:number.integer'),
    },
  })
}
