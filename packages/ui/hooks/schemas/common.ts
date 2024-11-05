import * as yup from 'yup'

export const yupSelect = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
})

export const yupMultiSelect = yup.array().of(yupSelect)

// Do not use yup.date() for date fields which do not have time
// Strapi won't accept in the future unless it is in the format YYYY-MM-DD
// https://github.com/strapi/strapi/issues/11509
export const yupDate = yup
  .string()
  .matches(/^(\d{4})-(\d{2})-(\d{2})$/, 'Date must be in the format YYYY-MM-DD')

// Use this instead of yup.date() in order to indicate that the field is a date time in the schema
export const yupDateTime = yup.date()
