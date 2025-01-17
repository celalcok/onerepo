import * as yup from 'yup'

import type { FormFields, Profile, Role } from '@fc/types'

import { yupMultiSelect, yupSelect } from './common'

export const useProfileSchema = () => {
  return yup.object({
    name: yup.string().required(),
    availableHours: yup.number().min(1),
    email: yup.string().email().required(),
    city: yup.string(),
    country: yup.string(),
    phone: yup.string(),
    birthDate: yup.string(),
    avatar: yup.mixed(),
    volunteerForm: yup.mixed(),
    cv: yup.mixed(),
    jobs: yupMultiSelect,
    role: yupMultiSelect,
    // https://yidaotus.medium.com/using-yup-and-typescript-for-typesafe-select-validation-e9ee9d4bceec
    profileStatus: yupSelect,
    isVolunteer: yup.boolean(),
    user: yupSelect.required(),
    comment: yup.string(),
    platforms: yupMultiSelect,
  })
}

export const profileFields: FormFields<Profile & { role: Role }> = [
  { name: 'name', isRequired: true },
  { name: 'email', isRequired: true, blockEdit: true },
  { name: 'phone' },
  { name: 'birthDate', type: 'date' },
  { name: 'availableHours' },
  { name: 'country' },
  { name: 'city' },
  {
    name: 'profileStatus',
    type: 'select',
    options: [
      'accepted',
      'approved',
      'awaiting',
      'in-progress',
      'left',
      'pending',
      'rejected',
    ],
  },
  { name: 'jobs', type: 'select', isMulti: true, endpoint: 'jobs' },
  { name: 'isVolunteer', type: 'boolean' },
  { name: 'user', type: 'select', endpoint: 'users' },
  { name: 'platforms', type: 'select', isMulti: true, endpoint: 'platforms' },
  { name: 'volunteerForm', type: 'file' },
  { name: 'cv', type: 'file' },
  { name: 'avatar', type: 'file' },
  { name: 'comment', type: 'textarea', blockEdit: true },
]
