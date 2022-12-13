import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
) => {
  const body = {
    approvalStatus: 'approved',
    publishedAt: new Date().toISOString(),
  }

  return Mutation.put<T, typeof body>(url, id, body)
}

export const useApproveModel = <T extends StrapiTranslatableModel>(
  url: StrapiUrl,
  translatedFields?: (keyof T)[],
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: [`approve-${url}`],
    mutationFn: ({ id }: { id: number }) => approveModel<T>(id, url),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: async res => {
      if (translatedFields && res.localizations?.length === 0) {
        await createLocalizations({
          data: res,
          translatedFields,
          url,
        })
      }

      toast({
        title: `Model ${res.approvalStatus}`,
        description: `Model has been ${res.approvalStatus}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      queryClient.invalidateQueries(queryKey)
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