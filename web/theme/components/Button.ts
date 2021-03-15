const Button = {
  baseStyle: {
    fontWeight: '500',
    borderRadius: 'base',
    _hover: {
      textDecoration: 'none',
    },
  },
  defaultProps: {
    colorScheme: 'white',
  },
  variants: {
    solid: (props) => {
      const style = {
        _hover: {
          opacity: 0.8,
        },
      }
      if (props.colorScheme === 'white') {
        style['color'] = 'black'
        style['bg'] = 'white'
      }
      if (props.colorScheme === 'black') {
        style['color'] = 'white'
        style['bg'] = 'black'
      }
      return style
    },
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
      fontSize: '14px',
      letterSpacing: '.5px',
    },
    sm: {
      fontWeight: '400',
      borderRadius: 'sm',
      fontSize: '12px',
      px: '16px',
      letterSpacing: '.4px',
    },
  },
}

export default Button
