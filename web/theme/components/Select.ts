const Select = {
  parts: ['field', 'icon'],
  variants: {
    outline: {
      field: {
        border: '1px solid',
        borderColor: 'gray.100',
        borderRadius: 'xs',
        h: '45px',
        _focus: {
          borderColor: 'blue.500',
          boxShadow: '0 0 0 2px rgb(95 105 162 / 27%)',
        },
        _invalid: {
          boxShadow: '0 0 0 2px rgb(229 62 62 / 20%)',
        },
      },
    },
  },
}

export default Select
