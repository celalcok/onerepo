import { StrapiLocale } from '@fc/types'
import { sentry } from '../../../../utils/sentry'

const getEdgeConfigKey = (locale: StrapiLocale) =>
  process.env.VERCEL_ENV === 'production'
    ? `${locale}-last-hashtag`
    : `${locale}-last-hashtag-dev`

const updateEdgeConfig = async (value: string, locale: StrapiLocale) => {
  try {
    const configKey = getEdgeConfigKey(locale)
    const requestUrl = process.env.EDGE_ENDPOINT
    const requestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'update',
            key: configKey,
            value,
          },
        ],
      }),
    }
    const response = await fetch(requestUrl, requestConfig)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        JSON.stringify(
          {
            result,
            requestUrl,
            requestConfig,
          },
          null,
          2,
        ),
      )
    }

    return result
  } catch (error) {
    console.error(error)
    sentry(error)
  }
}

export default {
  async afterCreate({ result }) {
    if (result.publishedAt) {
      const edgeValue = `${result.slug}__${result.date}`
      await updateEdgeConfig(edgeValue, result.locale)
    } else {
      const edgeValue = ''
      await updateEdgeConfig(edgeValue, result.locale)
    }
  },

  async afterUpdate({ result }) {
    if (result.publishedAt) {
      const edgeValue = `${result.slug}__${result.date}`
      await updateEdgeConfig(edgeValue, result.locale)
    } else {
      const edgeValue = ''
      await updateEdgeConfig(edgeValue, result.locale)
    }
  },
}
