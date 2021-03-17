const Button = {
  baseStyle: {
    fontWeight: '500',
    borderRadius: 'md',
    lineHeight: 1,
    _hover: {
      textDecoration: 'none',
    },
  },
  defaultProps: {
    colorScheme: 'orange',
  },
  variants: {
    outline: (props) => {
      const style = {
        border: '1px solid',
      }
      if (props.colorScheme === 'white') {
        style['color'] = 'white'
        style['_hover'] = {
          bg: '#696969',
        }
      }
      return style
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
  },
}

export default Button
