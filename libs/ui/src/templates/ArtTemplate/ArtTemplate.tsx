import { FC } from 'react'

import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { QueryKey } from '@tanstack/react-query'
import { Art, Auth } from '@wsvvrijheid/types'
import {
  useArtBySlug,
  useArtsByCategories,
  useViewArtMutation,
} from '@wsvvrijheid/utils'
import { useTranslation } from 'react-i18next'

import { Container, ArtCardBase } from '../../components'
import { ArtWithDetails } from '../../components/ArtWithDetails'

export type ArtTemplateProps = {
  auth: Auth
  queryKey: QueryKey
}

export const ArtTemplate: FC<ArtTemplateProps> = ({ auth, queryKey }) => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })
  const { data: art } = useArtBySlug()

  useViewArtMutation()

  const categories = (art?.categories?.flatMap(c => c.code) || []) as string[]
  const { data: arts } = useArtsByCategories(categories, art?.id)

  if (!art) return null

  return (
    <Container minH="inherit" my={8}>
      {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}

      <ArtWithDetails auth={auth} art={art} queryKey={queryKey} />

      {/* Other Arts List */}
      {arts && arts?.length > 0 && (
        <Stack justify="space-between" w="full" mt={8} spacing={8}>
          <Heading as="h3" size="lg">
            {t('art.others')}
          </Heading>
          {/* TODO Add ArtCardSkeleton for loading state. */}
          <Splide
            options={{
              perPage,
              gap: '1rem',
            }}
          >
            {arts.map((art: Art) => (
              <SplideSlide key={art.id}>
                <ArtCardBase art={art} isLiked={false} isOwner={false} />
              </SplideSlide>
            ))}
          </Splide>
        </Stack>
      )}
    </Container>
  )
}
