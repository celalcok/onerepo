import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = async <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
  token?: string,
) => {
  return Mutation.put<T, any>(
    `${url}/approve` as StrapiUrl,
    id,
    {},
    token as string,
  )
}

export const useApproveModel = <T extends StrapiTranslatableModel>(
  url: StrapiUrl,
  translatedFields?: (keyof T)[],
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`approve-${url}`],
    mutationFn: ({ id }: { id: number }) =>
      approveModel<T>(id, url, token ?? undefined),
    onSuccess: async model => {
      const hasLocalizations = !!model?.localizations?.[0]

      if (model && translatedFields && !hasLocalizations) {
        const localizations = await createLocalizations({
          model,
          translatedFields:
            translatedFields as (keyof StrapiTranslatableModel)[],
          url,
          token: token as string,
          hasSlug: url !== 'api/posts',
        })

        // Fixes translated relation fields
        const promises = localizations?.map(
          localizedModel =>
            localizedModel &&
            Mutation.put(
              `${url}/relation` as StrapiUrl,
              localizedModel.id,
              {},
              token as string,
            ),
        )

        if (promises) {
          await Promise.all(promises)
        }
      }

      toast({
        title: `Model ${model?.approvalStatus}`,
        description: `Model has been ${model?.approvalStatus}`,
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