import { ApprovalStatus, Blog, Profile } from '@wsvvrijheid/types'

import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useBlogColumns = (): WTableProps<Blog>['columns'] => {
  return {
    image: { type: 'image' },
    author: {
      transform: value => (value as Profile)?.username,
      sortKey: 'username',
      sortable: true,
    },
    title: { sortable: true },
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
