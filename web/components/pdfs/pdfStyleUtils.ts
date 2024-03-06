import { StyleSheet } from '@react-pdf/renderer'

export const BRAND_COLOR = '#283583'
export const FONT_SIZE = 10
export const FONT_SIZE_BIG = 14

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Mabry',
    padding: 20,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 10,
    marginBottom: 10,
  },
  container: {
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 1.2,
  },
})
