import { Activity } from '@wsvvrijheid/types'
import { sample } from 'lodash'
import { rest } from 'msw'

import { ACTIVITY_MOCKS } from '../../strapi/activity'

export const getActivityMock = rest.get<Activity>(
  `${process.env['NX_API_URL']}/api/activities`,
  (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')

    // If slug is provided, return single random activity
    if (slug) {
      const sampleMock = sample(ACTIVITY_MOCKS.data)
      if (!sampleMock) return res(ctx.status(200), ctx.json(null))

      return res(ctx.status(200), ctx.json(sampleMock))
    }

    return res(ctx.status(200), ctx.json(ACTIVITY_MOCKS))
  },
)
