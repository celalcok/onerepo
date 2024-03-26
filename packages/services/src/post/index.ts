import { useMemo } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { PostSentence, RedisPost } from '@fc/types'

type UpdateArgs = { hashtagId: number; index: number; value: RedisPost }
type CreateArgs = { hashtagId: number; value: RedisPost | RedisPost[] }
type DeleteArgs = { hashtagId: number; value: RedisPost }

export const updateHashtagSentences = async (args: UpdateArgs) => {
  const result = await axios.put<'OK'>('/api/kv/hashtag-sentences', args)

  return result.data
}

export const useUpdateHashtagSentence = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-update'],
    mutationFn: updateHashtagSentences,
  })

export const deleteHashtagSentence = async (args: DeleteArgs) => {
  const params = new URLSearchParams()
  params.append('hashtagId', args.hashtagId.toString())
  params.append('value', args.value.toString())

  const result = await axios.delete<number>(
    `/api/kv/hashtag-sentences?${params.toString()}`,
  )

  return result.data
}

export const useDeleteHashtagSentence = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-delete'],
    mutationFn: deleteHashtagSentence,
  })

export const createHashtagSentence = async (args: CreateArgs) => {
  const result = await axios.post<number>('/api/kv/hashtag-sentences', args, {})

  return result.data
}

export const useCreateHashtagSentence = () =>
  useMutation({
    mutationKey: ['kv-hashtag-sentences-create'],
    mutationFn: createHashtagSentence,
  })

export const getHashtagSentences = async (hashtagId: number) => {
  const result = await axios.get<RedisPost[]>(
    `/api/kv/hashtag-sentences?hashtagId=${hashtagId}`,
  )

  return result.data
}

export const useGetHashtagSentences = (hashtagId: number) => {
  const { data: mixData } = useQuery<RedisPost[]>({
    queryKey: ['kv-hashtag-sentences', hashtagId],
    queryFn: () => getHashtagSentences(hashtagId),
    staleTime: 1000 * 60,
  })

  return useMemo<Record<number, PostSentence[]>>(() => {
    if (!mixData?.length) return []

    // when we send create sentences request as array, it also returns as array
    // i dont know if it become a problem while we delete or update
    // @7alip i think you shold check it.
    const data = mixData.flatMap(d => (Array.isArray(d) ? d : [d]))

    const sortedSentences = (data
      .map((s, index) => {
        const [sentence = '', postId = 0, shareCount = 0, published = '0'] =
          s.split('::')

        return {
          postId: Number(postId),
          value: sentence,
          shareCount: Number(shareCount),
          isPublished: published === '1',
          index,
        }
      })
      .sort((a, b) => {
        return a.shareCount - b.shareCount
      }) || []) as PostSentence[]

    const sentencesByPostId = sortedSentences.reduce(
      (acc, cur) => {
        const { postId, ...rest } = cur

        if (!acc[postId]) {
          acc[postId] = []
        }

        acc[postId].push({
          postId,
          ...rest,
        })

        return acc
      },
      {} as Record<number, PostSentence[]>,
    )

    return sentencesByPostId
  }, [mixData])
}
