import * as yup from 'yup'

import type { Notification, FormFields } from '@fc/types'

export const useNotificationsSchema = () => {
  return yup.object({
    title: yup.string().required(),
    message: yup.string().required(),
  })
}

export const notificationFields: FormFields<
  Notification & {
    roles: number[]
    profiles: number[]
  }
> = [
  { name: 'title', isRequired: true },
  { name: 'message', isRequired: true },
  {
    name: 'roles',
    type: 'select',
    endpoint: 'users-permissions/roles',
    isMulti: true,
  },
  { name: 'profiles', type: 'select', endpoint: 'profiles', isMulti: true },
]
