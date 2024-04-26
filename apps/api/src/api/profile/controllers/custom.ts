import { mapPermissions } from '../../../utils/permissions'

module.exports = {
  async getProfile(ctx) {
    if (!ctx.state.user) {
      throw ctx.unauthorized('You are not authenticated')
    }

    const userId = ctx.state.user.id

    try {
      // what should I use here?
      const profileResponse = await strapi.entityService.findMany(
        'api::profile.profile',
        {
          filters: {
            user: { id: { $eq: userId } },
          },
          populate: '*',
        },
      )

      const profile = profileResponse?.[0] || null

      if (!profile) {
        return ctx.notFound('Profile not found')
      }

      const roleId = ctx.state.user.role.id
      const roleResponse =
        await strapi.plugins['users-permissions'].services.role.findOne(roleId)

      const newProfile = { ...profile }
      delete newProfile.user

      return { data: { ...profile, permissions: roleResponse.permissions } }
    } catch (error) {
      strapi.log.error(error)
      throw error
    }
  },
  async getRoles(ctx) {
    const roles = await strapi.plugins['users-permissions'].services.role.find()

    for (const role of roles) {
      const response = await strapi.plugins[
        'users-permissions'
      ].services.role.findOne(role.id)

      role.permissions = mapPermissions(response.permissions)
    }

    return { data: roles }
  },
}
