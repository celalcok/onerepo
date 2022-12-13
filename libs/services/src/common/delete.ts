import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

export const deleteModel = <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
) => {
  return Mutation.delete<T>(url, id)
}

export const useDeleteModel = <T extends StrapiModel>(
  url: StrapiUrl,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: [`delete-${url}`],
    mutationFn: ({ id }: { id: number }) => deleteModel<T>(id, url),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: () => {
      // TODO Add translations
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Successfully Deleted`,
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