import { Meta, Story } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { ArtTemplate, ArtTemplateProps } from './ArtTemplate'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtTemplate,
  title: 'Templates/ArtTemplate',
  parameters: {
    nextRouter: {
      path: `club/art/:slug`,
      asPath: `club/art/${sampleArt.slug}`,
      query: {
        slug: sampleArt.slug,
      },
    },
  },
} as Meta<ArtTemplateProps>

const Template: Story<ArtTemplateProps> = args => {
  return <ArtTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {} as ArtTemplateProps