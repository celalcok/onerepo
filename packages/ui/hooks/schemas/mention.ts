import * as yup from 'yup'

import type { FormFields, Mention } from '@fc/types'

import { yupMultiSelect } from './common'

export const useMentionSchema = () => {
  return yup.object({
    username: yup.string().required(),
    data: yup.string(),
    categories: yupMultiSelect,
    hashtags: yupMultiSelect,
  })
}

export const mentionFields: FormFields<Mention> = [
  { name: 'username', isRequired: true },
  { name: 'data', type: 'json' },
  { name: 'categories', type: 'select', isMulti: true, endpoint: 'categories' },
  { name: 'hashtags', type: 'select', endpoint: 'hashtags', isMulti: true },
]
