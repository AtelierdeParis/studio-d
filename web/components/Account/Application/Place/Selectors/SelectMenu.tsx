import { useTranslation } from 'next-i18next'
import Select from 'react-select'

const colourStyles = {
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '2px 8px 2px 3px',
  }),
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'white',
    width: '100%',
  }),
}

const SelectMenu = ({
  options = [],
  onChange,
  value,
}: {
  options: any
  onChange: any
  value: string
}) => {
  const { t } = useTranslation('application')
  return (
    <Select
      name="colors"
      placeholder={t('search')}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={colourStyles}
      onChange={onChange}
      value={value}
    />
  )
}

export default SelectMenu
