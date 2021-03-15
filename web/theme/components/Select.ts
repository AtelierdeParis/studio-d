const Select = {
  parts: ['field', 'icon'],
  variants: {
    outline: {
      field: {
        fontSize: 'sm',
        color: 'black',
        border: '1px solid',
        borderColor: 'black',
        borderRadius: 'md',
        _hover: {
          borderColor: '1px solid #b5b5b5',
        },
      },
      icon: {
        color: 'black',
        w: 8,
        fontSize: '32px',
      },
    },
  },
}

export default Select
