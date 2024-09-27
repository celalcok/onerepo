import * as yup from 'yup'

import type { Foundation, FormFields } from '@fc/types'

export const useFoundationsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    bank1: yup.string(),
    iban1: yup.string(),
    bank2: yup.string(),
    iban2: yup.string(),
    email: yup.string().email().required(),
    about_tr: yup.object().required(),
    about_nl: yup.object().required(),
    about_en: yup.object().required(),
    // TODO
    // contact: yup.string().required(),
  })
}

export const foundationFields: FormFields<Foundation> = [
  { name: 'name', isRequired: true },
  { name: 'bank1' },
  { name: 'IBAN1' },
  { name: 'bank2' },
  { name: 'IBAN2' },
  { name: 'email', isRequired: true },
  {
    name: 'about_tr',
    isRequired: true,
    type: 'block',
  },
  {
    name: 'about_en',
    isRequired: true,
    type: 'block',
  },

  {
    name: 'about_nl',
    isRequired: true,
    type: 'block',
  },
]
