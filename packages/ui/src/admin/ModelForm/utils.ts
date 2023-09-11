import { useMemo } from 'react'

import { format } from 'date-fns'
import { useRouter } from 'next/router'

import {
  Activity,
  Category,
  Course,
  CourseApplication,
  Hashtag,
  Mention,
  Post,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
  User,
  Volunteer,
} from '@wsvvrijheid/types'

import { FormFields } from './types'

export const mapModelsToOptions = (
  models?: StrapiModel[],
  locale?: StrapiLocale,
) => models?.map(model => mapModelToOption(model, locale))

export const mapModelToOption = (
  model?: StrapiModel,
  locale?: StrapiLocale,
) => {
  if (!model) return { value: '', label: '' }

  const mention = model as unknown as Mention
  const user = model as unknown as User
  const modelWithLocalizedName = model as unknown as Category
  const localizedName = locale
    ? modelWithLocalizedName[`name_${locale}`]
    : 'name'
  const value = model.id.toString()
  let label = (model as StrapiTranslatableModel).title

  // Mention
  if (mention.data && mention.username) {
    label = `@${mention.username}`
  }

  // User
  else if (user.email) {
    label = user.email || user.name || user.username
  }

  // Category, Tag etc.
  else if (localizedName) {
    label = localizedName
  }

  return { value, label }
}

export const useDefaultValues = <T extends StrapiModel>(
  model?: T | null,
  fields?: FormFields<T>,
) => {
  const hashtagModel = model as Hashtag
  const activityModel = model as Activity
  const volunteerModel = model as Volunteer
  const postModel = model as Post
  const courseModel = model as Course
  const applicationModel = model as CourseApplication
  const userModel = model as User

  const { locale } = useRouter()

  return useMemo(() => {
    if (!model || !fields) return {} as T

    const defaults = {} as any
    const { date, createdAt, updatedAt, publishedAt } = model as Activity

    const getDate = (date?: string | null, isDateTime?: boolean) =>
      date
        ? isDateTime
          ? new Date(date).toISOString().replace('Z', '')
          : format(new Date(date), 'yyyy-MM-dd')
        : ''

    const dateFields: Record<string, [string, string]> = {
      date: [getDate(date), getDate(date, true)],
      createdAt: [getDate(createdAt), getDate(createdAt, true)],
      updatedAt: [getDate(updatedAt), getDate(updatedAt, true)],
      publishedAt: [getDate(publishedAt), getDate(publishedAt, true)],
    }

    fields.forEach(field => {
      switch (field.name) {
        case 'date':
        case 'createdAt':
        case 'updatedAt':
        case 'publishedAt':
          if (field.type === 'date') {
            defaults[field.name] = dateFields[field.name as string][0]
          } else if (field.type === 'datetime-local') {
            defaults[field.name] = dateFields[field.name as string][1]
          }
          break
        case 'mentions':
          defaults.mentions =
            hashtagModel.mentions?.map(m => ({
              label: m.username,
              value: m.id.toString(),
            })) || []
          break
        case 'jobs':
          defaults.jobs =
            volunteerModel.jobs?.map(j => ({
              label: j[`name_${locale}`],
              value: j.id.toString(),
            })) || []
          break
        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title,
            value: postModel.hashtag?.id.toString(),
          }

          break
        case 'platform':
          defaults.platform = {
            label: courseModel.platform?.[`name_${locale}`],
            value: courseModel.platform?.id.toString(),
          }

          break
        case 'course':
          defaults.course = {
            label: applicationModel.course?.[`title_${locale}`],
            value: applicationModel.course?.id.toString(),
          }

          break
        case 'user':
          defaults.user = {
            label: volunteerModel.user?.email,
            value: volunteerModel.user?.id.toString(),
          }

          break
        case 'role':
          defaults.role = {
            label: userModel.role?.name || '',
            value: userModel.role?.id.toString(),
          }

          break
        case 'categories':
          defaults.categories =
            hashtagModel?.categories?.map(c => ({
              label: c[`name_${locale}`],
              value: c.id.toString(),
            })) || []
          break
        case 'platforms':
          defaults.platforms =
            activityModel?.platforms?.map(p => ({
              label: p[`name_${locale}`],
              value: p.id.toString(),
            })) || []
          break
        case 'tags':
          defaults.tags =
            postModel?.tags?.map(c => ({
              label: c[`name_${locale}`],
              value: c.id.toString(),
            })) || []
          break
        default:
          defaults[field.name] = model[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
  }, [model, fields, locale])
}
