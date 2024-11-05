import { Badge, Wrap } from '@chakra-ui/react'

import { ArchiveContent, Post, Prison } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const usePrisonsColumns = (): WTableProps<Prison>['columns'] => {
  return [
    { accessorKey: 'name', sortable: true, type: 'text' },
    { accessorKey: 'city', sortable: true, type: 'text' },
    {
      accessorKey: 'contents',
      transform: value => {
        return (
          <Wrap gap={6}>
            {((value ?? [{ id: 0, title: '-' }]) as ArchiveContent[]).map(
              (item: ArchiveContent) => (
                <Badge variant={'outline'} key={item.id}>
                  {item.title}
                </Badge>
              ),
            )}
          </Wrap>
        )
      },
    },
    {
      accessorKey: 'posts',
      transform: value => {
        return (
          <Wrap gap={6}>
            {((value ?? [{ id: 0, title: '-' }]) as Post[]).map(
              (item: Post) => (
                <Badge variant={'outline'} key={item.id}>
                  {item.description?.slice(0, 30)}
                </Badge>
              ),
            )}
          </Wrap>
        )
      },
    },
  ]
}
