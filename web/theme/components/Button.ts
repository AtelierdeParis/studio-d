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
    delete: {
      justifyContent: 'flex-start',
      bgColor: 'tag.red',
      h: '40px',
      color: 'black',
      whiteSpace: 'pre-line',
      _hover: {
        bgColor: '#efc8c8',
      },
    },
    confirm: {
      justifyContent: 'flex-start',
      bgColor: 'tag.green',
      h: '40px',
      color: 'black',
      whiteSpace: 'pre-line',
      _hover: {
        bgColor: '#c7ead0',
      },
    },
    message: {
      justifyContent: 'flex-start',
      bgColor: 'tag.blue',
      color: 'blue.500',
      whiteSpace: 'pre-line',
      h: '40px',
      _hover: {
        bgColor: '#d9def7',
      },
    },
    line: {
      borderBottom: '1px solid',
      borderColor: 'black',
      px: 0,
      pb: 0.5,
      h: 'auto',
      borderRadius: 0,
      minW: 0,
      _hover: {
        color: 'blue.500',
        borderColor: 'blue.500',
      },
    },
    lineBlue: {
      borderBottom: '1px solid',
      borderColor: 'blue.500',
      color: 'blue.500',
      px: 0,
      pb: 0.5,
      h: 'auto',
      borderRadius: 0,
      minW: 0,
      _hover: {
        color: 'black',
        borderColor: 'black',
      },
    },
    blueFill: {
      bgColor: 'blue.500',
      justifyContent: 'flex-start',
      color: 'white',
      whiteSpace: 'pre-line',
      h: '40px',
      minW: 0,
      _hover: {
        backgroundColor: 'blue.400',
      },
    },
    campaign: {
      justifyContent: 'flex-start',
      bgColor: 'campaign.primary',
      color: 'white',
      whiteSpace: 'pre-line',
      h: '40px',
      _hover: {
        bgColor: 'campaign.dark',
      },
    },
    grayLine: {
      justifyContent: 'flex-start',
      bgColor: 'white',
      color: '#626782',
      borderRadius: '4px',
      border: '1px solid rgba(98, 103, 130, 0.6)',
      _hover: {
        bgColor: 'gray.100',
      },
    },
    unSelected: {
      borderColor: 'black',
      px: 0,
      pb: 0.5,
      h: 'auto',
      borderRadius: 0,
      minW: 0,
    },
  },
  sizes: {
    md: {
      fontSize: { base: '13px', sm: 'md' },
      px: { base: 3, md: 4 },
      h: { base: '25px', sm: '28px', md: '30px' },
    },
    lg: {
      fontSize: { base: 'sm', sm: 'md' },
      px: { base: 4 },
      h: { base: '28px', sm: '30px', md: '34px' },
    },
    xl: {
      px: { base: 3, md: 6 },
      h: { base: '32px', md: '40px' },
    },
  },
}

export default Button
