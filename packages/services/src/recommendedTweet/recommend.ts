import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from '@wsvvrijheid/types'

export const recommendTweet = (
  recommendedTweet: RecommendedTweetCreateInput,
  token: string,
) => {
  return Mutation.post<RecommendedTweet, RecommendedTweetCreateInput>(
    'api/recommended-tweets',
    recommendedTweet,
    token,
  )
}

export const useRecommendTweet = () => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['create-recommended-tweet'],
    mutationFn: (recommendedTweet: RecommendedTweetCreateInput) => {
      return recommendTweet(recommendedTweet, token as string)
    },
    onSuccess: res => {
      toast({
        title: 'Recommended',
        description: 'Recommended Tweet Created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}