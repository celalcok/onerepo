import { useMemo } from 'react'

import { addMinutes, format } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type {
  Activity,
  ArchiveContent,
  Art,
  Asset,
  AssetsTracking,
  Blog,
  Course,
  CourseApplication,
  FormFields,
  Hashtag,
  Platform,
  Post,
  Profile,
  StrapiModel,
  User,
} from '@fc/types'
import { getMinuteDifferenceAmsterdamBetweenUTC } from '@fc/utils/timeDifference'

import { I18nNamespaces } from '../@types/i18next'

export const useDefaultValues = <T extends StrapiModel>(
  model?: T | null,
  fields?: FormFields<T>,
) => {
  const activityModel = model as Activity
  const applicationModel = model as CourseApplication
  const archiveContentModel = model as ArchiveContent
  const artModel = model as Art
  const assetModel = model as Asset
  const assetTrackingModel = model as AssetsTracking
  const blogModel = model as Blog
  const courseModel = model as Course
  const hashtagModel = model as Hashtag
  const platformModel = model as Platform
  const postModel = model as Post
  const profileModel = model as Profile
  const userModel = model as User

  const { locale } = useRouter()

  const { t } = useTranslation()

  return useMemo(() => {
    if (!model || !fields) return {} as T

    const defaults = {} as any

    const convertDate = (
      fieldName: string | number | symbol,
      toDateOnly: boolean,
      date?: string | null,
    ) => {
      if (!date) return ''

      const dateTime = new Date(date)
      if (
        fieldName !== 'createdAt' &&
        fieldName !== 'updatedAt' &&
        fieldName !== 'publishedAt'
      ) {
        /*
          The underlying math and logic can be explained as follows:

          - The getMinuteDifferenceAmsterdamBetweenUTC(date) function calculates the minute 
            difference between the Amsterdam time zone and UTC (Coordinated Universal Time). 
            This difference indicates how many minutes Amsterdam is ahead of or behind UTC.

          - The addMinutes(date, timeDif) function adds the calculated minute difference to 
            the date value. This adjusts the date value to the Amsterdam time zone.

          - The dateTime.setTime(amsterdamDateTime.getTime()) line assigns the adjusted date 
            value to the dateTime object.
          
          The purpose of these operations is to standardize date values to the Amsterdam 
          time zone. This is particularly important for ensuring consistency across users 
          or systems in different time zones.

          For example, if a user in Amsterdam creates a record at 14:00, it may be recorded 
          as 13:00 in UTC. However, when the system is set to the Amsterdam time zone, 
          the record will be displayed as 14:00.

          This approach takes into account time zone differences to ensure that date values 
          are processed correctly and consistently.
        */
        const timeDif = getMinuteDifferenceAmsterdamBetweenUTC(date)
        const amsterdamDateTime = addMinutes(date, timeDif)
        dateTime.setTime(amsterdamDateTime.getTime())
      }

      if (toDateOnly) {
        return format(dateTime, 'yyyy-MM-dd')
      }

      return dateTime.toISOString().replace('Z', '')
    }

    fields.forEach(field => {
      if (field.type === 'date' || field.type === 'datetime-local') {
        // this ll work for future fields too.
        defaults[field.name] = convertDate(
          field.name,
          field.type === 'date',
          model[field.name as keyof T] as string | null,
        )

        return
      }

      switch (field.name) {
        case 'mentions':
          defaults.mentions =
            hashtagModel.mentions?.map(m => ({
              label: m.username || '',
              value: m.id.toString() || '',
            })) || []
          break

        case 'profileStatus':
          defaults.profileStatus = {
            label: t(
              profileModel.profileStatus as keyof I18nNamespaces['common'],
            ),
            value: profileModel.profileStatus || '',
          }
          break

        case 'jobs':
          defaults.jobs =
            profileModel.jobs?.map(j => ({
              label: j[`name_${locale}`] || '',
              value: j.id.toString() || '',
            })) || []
          break

        case 'artist':
          defaults.artist = {
            label: `${artModel.artist?.name} (${artModel.artist?.email})` || '',
            value: artModel?.artist?.id.toString() || '',
          }
          break

        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title || '',
            value: postModel.hashtag?.id.toString() || '',
          }
          break

        case 'platform':
          defaults.platform = {
            label: courseModel.platform?.[`name_${locale}`] || '',
            value: courseModel.platform?.id.toString() || '',
          }
          break

        case 'peopleInCharge':
          defaults.peopleInCharge =
            assetModel?.peopleInCharge?.map(person => ({
              label: person.name || person.email || '',
              value: person.id.toString() || '',
            })) || []
          break

        case 'assignedTo':
          defaults.assignedTo = {
            label:
              assetTrackingModel?.assignedTo?.name ||
              assetTrackingModel?.assignedTo?.email ||
              '',
            value: assetTrackingModel?.assignedTo?.id.toString() || '',
          }
          break

        case 'asset':
          defaults.asset = {
            label: assetTrackingModel?.asset?.name || '',
            value: assetTrackingModel?.asset?.id.toString() || '',
          }
          break

        case 'foundation':
          defaults.foundation = {
            label: platformModel.foundation?.name || '',
            value: platformModel.foundation?.id.toString() || '',
          }
          break
        case 'course':
          defaults.course = {
            label: applicationModel.course?.[`title_${locale}`] || '',
            value: applicationModel.course?.id.toString() || '',
          }
          break

        case 'user':
          defaults.user = {
            label: profileModel.user?.email || '',
            value: profileModel.user?.id.toString() || '',
          }
          break

        case 'author':
          defaults.author = {
            label: blogModel.author?.name || '',
            value: blogModel?.author?.id?.toString() || '',
          }
          break

        case 'role':
          defaults.role = {
            label: userModel?.role?.name || '',
            value: userModel?.role?.id.toString() || '',
          }
          break

        case 'categories':
          defaults.categories =
            hashtagModel?.categories?.map(c => ({
              label: c[`name_${locale}`] || '',
              value: c.id.toString() || '',
            })) || []
          break

        case 'platforms':
          defaults.platforms =
            activityModel?.platforms?.map(p => ({
              label: p[`name_${locale}`] || '',
              value: p.id.toString() || '',
            })) || []
          break

        case 'victim':
          defaults.victim = {
            label: postModel.victim?.name || '',
            value: postModel.victim?.id.toString() || '',
          }
          break
        case 'victims':
          defaults.victims =
            archiveContentModel.victims?.map(v => ({
              label: v.name || '',
              value: v.id.toString() || '',
            })) || []
          break
        case 'prison':
          defaults.prison = {
            label: postModel.prison?.name || '',
            value: postModel.prison?.id.toString() || '',
          }
          break
        case 'prisons':
          defaults.prisons =
            archiveContentModel.prisons?.map(p => ({
              label: p.name || '',
              value: p.id.toString() || '',
            })) || []
          break
        default:
          defaults[field.name] = model[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, fields, locale])
}
