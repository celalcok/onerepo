import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { ArchiveContent, Category, Post, Prison, Victim } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useVictimsColumns = (): WTableProps<Victim>['columns'] => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return [
    { accessorKey: 'name', sortable: true, type: 'text' },
    {
      accessorKey: 'description_en',
      label: t('description'),
      transform(value, model) {
        if (!model) return value?.toString() ?? '-'

        return (model?.[`description_${locale}` as keyof Victim] ??
          model?.description_en ??
          model?.description_nl ??
          model?.description_tr ??
          '-') as string
      },
    },
    {
      accessorKey: 'incidentDate',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'resolvedDate',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'deceased',
      label: t('details'),
      transform(value, model) {
        return model ? (
          <Wrap>
            {model.resolved && (
              <Badge variant={'outline'} colorScheme={'green'}>
                {t('victim.label.resolved')}
              </Badge>
            )}
            {model.deceased && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.deceased')}
              </Badge>
            )}
            {model.pregnant && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.pregnant')}
              </Badge>
            )}
            {model.baby && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.baby')}
              </Badge>
            )}
            {model.sick && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.sick')}
              </Badge>
            )}
            {model.noshare && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.no-share')}
              </Badge>
            )}
            {model.elderly && (
              <Badge variant={'outline'} colorScheme={'red'}>
                {t('victim.label.elderly')}
              </Badge>
            )}
          </Wrap>
        ) : null
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
      accessorKey: 'prisons',
      transform: value => {
        return (
          <Wrap gap={13}>
            {((value ?? []) as Prison[])?.map((item: Prison) => (
              <Badge variant={'outline'} key={item.id}>
                {item.name}
              </Badge>
            ))}
          </Wrap>
        )
      },
    },
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
