const Button = {
  baseStyle: {
    fontWeight: '500',
    borderRadius: 'md',
    lineHeight: 1,
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      textDecoration: 'none',
    },
  },
  defaultProps: {
    colorScheme: 'orange',
  },
  variants: {
    outline: {
      px: 7,
    },
    delete: {
      justifyContent: 'flex-start',
      bgColor: 'tag.red',
      h: '40px',
      _hover: {
        bgColor: '#efc8c8',
      },
    },
    confirm: {
      justifyContent: 'flex-start',
      bgColor: 'tag.green',
      h: '40px',
      _hover: {
        bgColor: '#c7ead0',
      },
    },
    message: {
      justifyContent: 'flex-start',
      bgColor: 'tag.blue',
      color: 'blue.500',
      h: '40px',
      _hover: {
        bgColor: '#d9def7',
      },
    },
    line: {
      borderBottom: '1px solid black',
      px: 0,
      pb: 0.5,
      h: 'auto',
      borderRadius: 0,
      minW: 0,
    },
  },
  sizes: {
    md: {
      fontSize: 'md',
      px: 4,
      h: '30px',
    },
    lg: {
      fontSize: 'md',
      px: 4,
      h: '34px',
    },
    xl: {
      px: 6,
      h: '40px',
    },
  },
}

export default Button
