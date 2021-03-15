const Tag = {
  variants: {
    subtle: {
      container: {
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: 'black',
        fontSize: 'xxs',
        px: 4,
      },
    },
  },
  sizes: {
    sm: {
      container: {
        borderRadius: 0,
        lineHeight: 1.9,
      },
    },
    md: {
      container: {
        py: 2,
        letterSpacing: 'wide',
        borderRadius: 'sm',
      },
    },
  },
}

export default Tag
