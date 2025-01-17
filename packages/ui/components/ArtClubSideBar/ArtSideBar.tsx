import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { Collection } from '@fc/types'

import { ArtSideBarProps } from './types'
import { useChangeParams } from '../../hooks'
import { CategoryFilter } from '../CategoryFilter'
import { CollectionList } from '../CollectionList'

export const ArtSideBar: FC<ArtSideBarProps> = ({
  categoryList,
  isLoading,
  setIsLoading,
}) => {
  const { t } = useTranslation()
  const { changeCategories } = useChangeParams()
  const {
    locale,
    query: { categories },
  } = useRouter()

  const collectionsQuery = useStrapiRequest<Collection>({
    endpoint: 'collections',
    locale,
  })

  const initialCategories = (categories as string)
    ?.split('&')
    .map(category => category.split('=')[1])

  return (
    <Stack spacing={8} alignSelf="start">
      {categoryList && (
        <Box maxH="calc((100vh - 150px) / 2)" overflowY="scroll">
          <CategoryFilter
            categoryData={categoryList || []}
            initialCategories={initialCategories}
            isLoading={isLoading}
            selectCategories={changeCategories}
            setIsLoading={setIsLoading}
            title={t('categories')}
            locale={locale}
          />
        </Box>
      )}

      {collectionsQuery?.data && collectionsQuery?.data?.data?.length > 0 && (
        <Box overflowY="auto" maxH="calc((100vh - 150px) / 2)">
          <CollectionList
            collectionData={collectionsQuery.data?.data || []}
          ></CollectionList>
        </Box>
      )}
    </Stack>
  )
}
