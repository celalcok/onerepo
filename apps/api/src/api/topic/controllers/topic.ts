import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::topic.topic',
  ({ strapi }) => ({
    async find(ctx) {
      const response = await super.find(ctx)

      if (!response) return []

      const { data, meta } = response

      const updatedAt = new Date(data.attributes.updatedAt).getTime()
      const now = new Date().getTime()
      const oneHour = 1000 * 60 * 60

      if (data.attributes.isSyncing || now - updatedAt < oneHour) {
        return { data, meta }
      }

      await strapi.entityService.update('api::topic.topic', data.id, {
        data: {
          isSyncing: true,
        },
      })

      const count = await strapi.service('api::topic.topic').sync()

      const result = await super.find(ctx)
      result.meta.count = count

      return result
    },
  }),
)
