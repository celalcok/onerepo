import {
  ApprovalStatus,
  Art,
  Collection,
  Profile,
  StrapiLocale,
} from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCollectionColumns = (): WTableProps<Collection>['columns'] => {
  return {
    image: { type: 'image' },
    creator: {
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
    title: { sortable: true },
    slug: { label: 'Slug' },
    description: {},
    approvalStatus: {
      type: 'badge',
      componentProps: value => {
        const colorScheme = {
          approved: 'green',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ApprovalStatus],
        }
      },
    },
    arts: { transform: value => (value as Art[])?.length },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
