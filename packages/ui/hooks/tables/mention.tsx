import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import type { Category, Hashtag, Mention } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useMentionsColumns = (): WTableProps<Mention>['columns'] => {
  const { locale } = useRouter()

  return [
    { accessorKey: 'username', sortable: true, type: 'text' },
    {
      accessorKey: 'data',
      type: 'text',
      transform: value => {
        const val = value as {
          name?: string
          description?: string
          location?: string
        }

        return (val?.name ?? val?.description ?? val?.location ?? '-')
          .toString()
          .slice(0, 30)
      },
    },
    {
      accessorKey: 'categories',
      transform: value => {
        return (
          <Wrap spacing={3}>
            {((value ?? [{ id: 0, name_en: '-' }]) as Category[])?.map(
              (item: Category) => (
                <Badge key={item.id}>
                  {(item[`name_${locale}` as keyof Category] as string) ??
                    item.name_en ??
                    item.name_tr ??
                    item.name_nl}
                </Badge>
              ),
            )}
          </Wrap>
        )
      },
    },

    {
      accessorKey: 'hashtags',
      transform: value => {
        return (
          <Wrap gap={13}>
            {((value ?? []) as Hashtag[])?.map((item: Hashtag) => (
              <Badge variant={'outline'} key={item.id}>
                {item.title}
              </Badge>
            ))}
          </Wrap>
        )
      },
    },
  ]
}
