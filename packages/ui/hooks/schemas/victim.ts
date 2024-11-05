import * as yup from 'yup'

import type { FormFields, Victim } from '@fc/types'

import { yupMultiSelect } from './common'

export const useVictimSchema = () => {
  return yup.object({
    name: yup.string().required(),
    description_en: yup.string(),
    description_nl: yup.string(),
    description_tr: yup.string(),
    birthDate: yup.date(),
    incidentDate: yup.date(),
    resolvedDate: yup.date(),
    resolved: yup.boolean(),
    deceased: yup.boolean(),
    pregnant: yup.boolean(),
    baby: yup.boolean(),
    sick: yup.boolean(),
    noshare: yup.boolean(),
    elderly: yup.boolean(),
    categories: yupMultiSelect,
    prison: yupMultiSelect,
    contents: yupMultiSelect,
    posts: yupMultiSelect,
    image: yup.mixed(),
  })
}

export const victimFields: FormFields<Victim> = [
  { name: 'name', isRequired: true },
  { name: 'description_en' },
  { name: 'description_nl' },
  { name: 'description_tr' },
  { name: 'birthDate', type: 'date' },
  { name: 'incidentDate', type: 'date' },
  { name: 'resolvedDate', type: 'date' },
  { name: 'resolved', type: 'boolean' },
  { name: 'deceased', type: 'boolean' },
  { name: 'pregnant', type: 'boolean' },
  { name: 'baby', type: 'boolean' },
  { name: 'sick', type: 'boolean' },
  { name: 'noshare', type: 'boolean' },
  { name: 'elderly', type: 'boolean' },
  { name: 'categories', type: 'select', endpoint: 'categories', isMulti: true },
  { name: 'prisons', type: 'select', endpoint: 'prisons', isMulti: true },
  {
    name: 'contents',
    type: 'select',
    isMulti: true,
    endpoint: 'archive-contents',
  },
  { name: 'posts', type: 'select', endpoint: 'posts', isMulti: true },
  { name: 'images', type: 'file' },
]
