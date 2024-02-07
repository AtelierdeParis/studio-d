import theme from '~theme'
import { campaign } from '~theme/colors'

const baseContainerTag = {
  container: {
    fontSize: 'sm',
    px: 2,
    py: 1,
    whiteSpace: 'pre',
    lineHeight: 1,
    borderRadius: 'sm',
    color: 'white',
  },
}

const Tag = {
  variants: {
    subtle: {
      container: {
        backgroundColor: 'transparent',
        fontSize: 'md',
        px: 1.5,
        py: 1,
        whiteSpace: 'pre',
        lineHeight: 1,
      },
    },
    campaign: {
      container: {
        ...baseContainerTag,
        backgroundColor: campaign.light,
        color: campaign.dark,
      },
    },
    blue: {
      container: {
        ...baseContainerTag,
        backgroundColor: 'blue.200',
        color: 'blue.500',
      },
    },
  },
  sizes: {
    md: {
      container: {
        borderRadius: 'xs',
      },
    },
  },
}

export default Tag
