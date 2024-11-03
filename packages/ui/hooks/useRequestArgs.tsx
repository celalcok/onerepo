import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs } from '@fc/services/common/strapiRequest'
import type { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'

import { FilterOption, RelationFilterOption } from '../components/FilterMenu'

type UseRequestArgsReturn<T extends StrapiModel> = Partial<
  Record<
    StrapiCollectionEndpoint,
    {
      relationFilters?: RelationFilterOption<T>[]
      booleanFilters?: FilterOption[]
      populate?: RequestCollectionArgs<T>['populate']
      searchFields?: string[]
    }
  >
>

export const useRequestArgs = <
  T extends StrapiModel,
>(): UseRequestArgsReturn<T> => {
  const { t } = useTranslation()

  return {
    assets: {
      relationFilters: [
        {
          endpoint: 'foundations',
          field: 'foundation',
        },
      ],
      searchFields: ['name', 'description'],
    },
    hashtags: {
      searchFields: ['title'],
    },
    collections: {
      searchFields: ['title', 'description'],
    },
    payments: {
      populate: ['profile', 'courseApplication.course'],
      searchFields: ['email', 'name'],
    },
    posts: {
      populate: [
        'hashtag.categories',
        'hashtag.image',
        'image',
        'video',
        'caps',
      ],
      relationFilters: [
        {
          endpoint: 'hashtags',
          field: 'hashtag',
        },
      ],
      searchFields: ['description'],
    },
    courses: {
      relationFilters: [
        {
          endpoint: 'platforms',
          field: 'platform',
        },
      ],
    },
    foundations: { searchFields: ['title'] },
    blogs: {
      relationFilters: [
        {
          endpoint: 'profiles',
          field: 'profile',
          label: t('author'),
          // queryFilters: { ownedBlogs: { id: { $gt: 0 } } },
        },
      ],
      searchFields: ['title', 'description'],
    },
    users: {
      searchFields: ['username'],
      relationFilters: [
        {
          endpoint: 'users-permissions/roles',
          field: 'role',
        },
      ],
    },
    mentions: {
      populate: ['categories', 'hashtags'],
      searchFields: ['username'],
      relationFilters: [
        {
          endpoint: 'categories',
          field: 'categories',
          label: t('category'),
        },
      ],
    },
    victims: {
      searchFields: [
        'name',
        'description_en',
        'description_nl',
        'description_tr',
      ],
      populate: ['prisons', 'categories', 'contents', 'image', 'posts'],
      booleanFilters: [
        {
          field: 'sick',
          label: t('victim.label.sick'),
          operator: '$eq',
        },
        {
          field: 'deceased',
          label: t('victim.label.deceased'),
          operator: '$eq',
        },
        {
          field: 'pregnant',
          label: t('victim.label.pregnant'),
          operator: '$eq',
        },
        {
          field: 'elderly',
          label: t('victim.label.elderly'),
          operator: '$eq',
        },
        {
          field: 'baby',
          label: t('victim.label.baby'),
          operator: '$eq',
        },
        {
          field: 'noshare',
          label: t('victim.label.no-share'),
          operator: '$eq',
        },
      ],
      relationFilters: [
        {
          endpoint: 'prisons',
          field: 'name',
          label: t('prisons'),
        },
      ],
    },
    prisons: {
      searchFields: ['name', 'city'],
      populate: ['images', 'contents', 'posts'],
      relationFilters: [
        {
          endpoint: 'prisons',
          field: 'city',
          label: t('city'),
        },
      ],
    },
    profiles: {
      booleanFilters: [
        {
          field: 'isVolunteer',
          label: t('volunteer'),
          operator: '$eq',
        },
        {
          field: '(ext)isVolunteer',
          label: t('profile'),
          operator: '$null',
        },
      ],
      relationFilters: [
        {
          endpoint: 'jobs',
          field: 'jobs',
        },
        {
          endpoint: 'users-permissions/roles',
          field: 'user.role',
          label: t('role'),
        },
        {
          endpoint: 'platforms',
          field: 'platforms',
        },
      ],
      populate: [
        'user.role',
        'jobs.platform',
        'platforms',
        'volunteerForm',
        'cv',
        'address',
      ],
      searchFields: ['name', 'email'],
    },
  }
}
