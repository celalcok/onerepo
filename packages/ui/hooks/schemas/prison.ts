import * as yup from 'yup'

import type { FormFields, Prison } from '@fc/types'

import { yupMultiSelect } from './common'

export const usePrisonSchema = () => {
  return yup.object({
    name: yup.string().required(),
    city: yup.date().required(),
    contents: yupMultiSelect,
    posts: yupMultiSelect,
    image: yup.mixed(),
  })
}

export const prisonFields: FormFields<Prison> = [
  { name: 'name', isRequired: true },
  { name: 'city', isRequired: true },
  {
    name: 'contents',
    type: 'select',
    isMulti: true,
    endpoint: 'archive-contents',
  },
  { name: 'posts', type: 'select', endpoint: 'posts', isMulti: true },
  { name: 'images', type: 'file' },
]
