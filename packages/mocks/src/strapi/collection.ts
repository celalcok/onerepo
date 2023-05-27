import {
  Collection,
  Localize,
  StrapiCollectionResponse,
} from '@wsvvrijheid/types'

export const COLLECTION_MOCKS: Localize<
  StrapiCollectionResponse<Collection[]>
> = {
  tr: {
    data: [
      {
        id: 5,
        createdAt: '2022-06-17T09:20:29.328Z',
        updatedAt: '2022-09-13T21:28:44.298Z',
        publishedAt: '2022-06-17T09:20:36.532Z',
        locale: 'tr',
        content: '',
        date: '2022-06-17T09:20:29.328Z',
        title: 'Korona Döneminde Yalnızlık',
        slug: 'korona-doneminde-yalnizlik',
        description: 'Açıklama',
        approvalStatus: 'pending',
        image: {
          id: 291,
          name: 'Nederland',
          alternativeText: null,
          caption: null,
          width: 1440,
          height: 1920,
          formats: {
            large: {
              ext: '',
              url: '/uploads/large_Nederland_be7b17286c',
              hash: 'large_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'large_Nederland',
              path: null,
              size: 72.16,
              width: 750,
              height: 1000,
            },
            small: {
              ext: '',
              url: '/uploads/small_Nederland_be7b17286c',
              hash: 'small_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'small_Nederland',
              path: null,
              size: 23.82,
              width: 375,
              height: 500,
            },
            medium: {
              ext: '',
              url: '/uploads/medium_Nederland_be7b17286c',
              hash: 'medium_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'medium_Nederland',
              path: null,
              size: 46.07,
              width: 563,
              height: 750,
            },
            thumbnail: {
              ext: '',
              url: '/uploads/thumbnail_Nederland_be7b17286c',
              hash: 'thumbnail_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'thumbnail_Nederland',
              path: null,
              size: 3.77,
              width: 117,
              height: 156,
            },
          },
          hash: 'Nederland_be7b17286c',
          ext: '',
          mime: 'image/jpeg',
          size: 138.8,
          url: '/uploads/Nederland_be7b17286c',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          createdAt: '2022-07-30T16:02:26.476Z',
          updatedAt: '2022-07-30T16:02:26.476Z',
        },
        arts: [
          {
            id: 2,
            title_en: 'Anneler',
            title_nl: 'Anneler',
            title_tr: 'Anneler',
            slug: 'anneler',
            description_en: 'Anneler günü',
            description_nl: 'Anneler günü',
            description_tr: 'Anneler günü',
            createdAt: '2022-03-22T10:33:44.349Z',
            updatedAt: '2022-09-13T21:56:59.220Z',
            publishedAt: '2022-03-22T10:34:40.773Z',
            likes: 7,
            views: 6,
            approvalStatus: 'approved',
          },
        ],
        localizations: [
          {
            id: 3,
            createdAt: '2022-06-17T09:19:06.765Z',
            updatedAt: '2022-09-13T21:28:44.297Z',
            publishedAt: '2022-06-17T09:19:15.023Z',
            locale: 'en',
            title: 'Loneliness in the Corona Period',
            slug: 'loneliness-in-the-corona-period',
            content: 'Description',
            date: '2022-06',
            description: 'Description',
            approvalStatus: 'pending',
          },
          {
            id: 4,
            createdAt: '2022-06-17T09:19:43.529Z',
            updatedAt: '2022-09-13T21:28:44.281Z',
            publishedAt: '2022-06-17T09:19:50.356Z',
            locale: 'nl',
            content: 'Uitleg',
            date: '2022-06',
            title: 'Eenzaamheid in de Corona-period',
            slug: 'eenzaamheid-in-de-corona-period',
            description: 'Uitleg',
            approvalStatus: 'pending',
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
  nl: {
    data: [
      {
        id: 4,
        createdAt: '2022-06-17T09:19:43.529Z',
        updatedAt: '2022-09-13T21:28:44.281Z',
        publishedAt: '2022-06-17T09:19:50.356Z',
        locale: 'nl',
        content: '',
        date: '2022-06-17T09:20:29.328Z',
        title: 'Eenzaamheid in de Corona-period',
        slug: 'eenzaamheid-in-de-corona-period',
        description: 'Uitleg',
        approvalStatus: 'pending',
        image: {
          id: 291,
          name: 'Nederland',
          alternativeText: null,
          caption: null,
          width: 1440,
          height: 1920,
          formats: {
            large: {
              ext: '',
              url: '/uploads/large_Nederland_be7b17286c',
              hash: 'large_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'large_Nederland',
              path: null,
              size: 72.16,
              width: 750,
              height: 1000,
            },
            small: {
              ext: '',
              url: '/uploads/small_Nederland_be7b17286c',
              hash: 'small_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'small_Nederland',
              path: null,
              size: 23.82,
              width: 375,
              height: 500,
            },
            medium: {
              ext: '',
              url: '/uploads/medium_Nederland_be7b17286c',
              hash: 'medium_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'medium_Nederland',
              path: null,
              size: 46.07,
              width: 563,
              height: 750,
            },
            thumbnail: {
              ext: '',
              url: '/uploads/thumbnail_Nederland_be7b17286c',
              hash: 'thumbnail_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'thumbnail_Nederland',
              path: null,
              size: 3.77,
              width: 117,
              height: 156,
            },
          },
          hash: 'Nederland_be7b17286c',
          ext: '',
          mime: 'image/jpeg',
          size: 138.8,
          url: '/uploads/Nederland_be7b17286c',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          createdAt: '2022-07-30T16:02:26.476Z',
          updatedAt: '2022-07-30T16:02:26.476Z',
        },
        arts: [
          {
            id: 2,
            title_en: 'Anneler',
            title_nl: 'Anneler',
            title_tr: 'Anneler',
            slug: 'anneler',
            description_en: 'Anneler günü',
            description_nl: 'Anneler günü',
            description_tr: 'Anneler günü',
            createdAt: '2022-03-22T10:33:44.349Z',
            updatedAt: '2022-09-13T21:56:59.220Z',
            publishedAt: '2022-03-22T10:34:40.773Z',
            likes: 7,
            views: 6,
            approvalStatus: 'approved',
          },
        ],
        localizations: [
          {
            id: 3,
            createdAt: '2022-06-17T09:19:06.765Z',
            updatedAt: '2022-09-13T21:28:44.297Z',
            publishedAt: '2022-06-17T09:19:15.023Z',
            locale: 'en',
            content: '',
            date: '2022-06-17T09:20:29.328Z',
            title: 'Loneliness in the Corona Period',
            slug: 'loneliness-in-the-corona-period',
            description: 'Description',
            approvalStatus: 'pending',
          },
          {
            id: 5,
            createdAt: '2022-06-17T09:20:29.328Z',
            updatedAt: '2022-09-13T21:28:44.298Z',
            publishedAt: '2022-06-17T09:20:36.532Z',
            locale: 'tr',
            content: '',
            date: '2022-06-17T09:20:29.328Z',
            title: 'Korona Döneminde Yalnızlık',
            slug: 'korona-doneminde-yalnizlik',
            description: 'Açıklama',
            approvalStatus: 'pending',
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
  en: {
    data: [
      {
        id: 3,
        createdAt: '2022-06-17T09:19:06.765Z',
        updatedAt: '2022-09-13T21:28:44.297Z',
        publishedAt: '2022-06-17T09:19:15.023Z',
        locale: 'en',
        content: '',
        date: '2022-06-17T09:20:29.328Z',
        title: 'Loneliness in the Corona Period',
        slug: 'loneliness-in-the-corona-period',
        description: 'Description',
        approvalStatus: 'pending',
        image: {
          id: 291,
          name: 'Nederland',
          alternativeText: null,
          caption: null,
          width: 1440,
          height: 1920,
          formats: {
            large: {
              ext: '',
              url: '/uploads/large_Nederland_be7b17286c',
              hash: 'large_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'large_Nederland',
              path: null,
              size: 72.16,
              width: 750,
              height: 1000,
            },
            small: {
              ext: '',
              url: '/uploads/small_Nederland_be7b17286c',
              hash: 'small_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'small_Nederland',
              path: null,
              size: 23.82,
              width: 375,
              height: 500,
            },
            medium: {
              ext: '',
              url: '/uploads/medium_Nederland_be7b17286c',
              hash: 'medium_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'medium_Nederland',
              path: null,
              size: 46.07,
              width: 563,
              height: 750,
            },
            thumbnail: {
              ext: '',
              url: '/uploads/thumbnail_Nederland_be7b17286c',
              hash: 'thumbnail_Nederland_be7b17286c',
              mime: 'image/jpeg',
              name: 'thumbnail_Nederland',
              path: null,
              size: 3.77,
              width: 117,
              height: 156,
            },
          },
          hash: 'Nederland_be7b17286c',
          ext: '',
          mime: 'image/jpeg',
          size: 138.8,
          url: '/uploads/Nederland_be7b17286c',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          createdAt: '2022-07-30T16:02:26.476Z',
          updatedAt: '2022-07-30T16:02:26.476Z',
        },
        arts: [
          {
            id: 2,
            title_en: 'Anneler',
            title_nl: 'Anneler',
            title_tr: 'Anneler',
            slug: 'anneler',
            description_en: 'Anneler günü',
            description_nl: 'Anneler günü',
            description_tr: 'Anneler günü',
            createdAt: '2022-03-22T10:33:44.349Z',
            updatedAt: '2022-09-13T21:56:59.220Z',
            publishedAt: '2022-03-22T10:34:40.773Z',
            likes: 7,
            views: 6,
            approvalStatus: 'approved',
          },
        ],
        localizations: [
          {
            id: 4,
            createdAt: '2022-06-17T09:19:43.529Z',
            updatedAt: '2022-09-13T21:28:44.281Z',
            publishedAt: '2022-06-17T09:19:50.356Z',
            locale: 'nl',
            content: null,
            date: '2022-06-17T09:20:36.532Z',
            title: 'Eenzaamheid in de Corona-period',
            slug: 'eenzaamheid-in-de-corona-period',
            description: 'Uitleg',
            approvalStatus: 'pending',
          },
          {
            id: 5,
            createdAt: '2022-06-17T09:20:29.328Z',
            updatedAt: '2022-09-13T21:28:44.298Z',
            publishedAt: '2022-06-17T09:20:36.532Z',
            locale: 'tr',
            content: null,
            date: '2022-06-17T09:20:36.532Z',
            title: 'Korona Döneminde Yalnızlık',
            slug: 'korona-doneminde-yalnizlik',
            description: 'Açıklama',
            approvalStatus: 'pending',
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
}