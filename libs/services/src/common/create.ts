import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiMutationInput,
  StrapiTranslatableCreateInput,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

export const createModel = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableCreateInput,
>(
  url: StrapiUrl,
  args: D,
) => {
  return Mutation.post<T, StrapiMutationInput>(url, args)
}

export const useCreateModelMutation = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableCreateInput,
>(
  url: StrapiUrl,
) => {
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-model', url],
    mutationFn: (args: D) => createModel<T, D>(url, args as D),
    onSuccess: (res: T) => {
      toast({
        title: `Model updated`,
        description: `Model ${res.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error('error in sercices', error)
      toast({
        title: 'Error',
        description: `Something went wrong`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
