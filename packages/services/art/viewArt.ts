import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'

import { useArtBySlug } from './getArtBySlug'

const viewArt = async (
  id: number,
  token?: string | null,
  recaptchaToken?: string,
) =>
  axios.put(
    `${API_URL}/api/view-art/${id}`,
    { data: { recaptchaToken } },
    { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
  )

export const useViewArtMutation = (recaptchaToken?: string) => {
  const queryClient = useQueryClient()

  const {
    query: { slug },
  } = useRouter()

  const { data: art } = useArtBySlug()
  const { token } = useAuthContext()

  const [artStorage, setArtStorage] = useLocalStorage<number[]>('view-art', [])

  const { mutate } = useMutation({
    mutationKey: ['view-art', art?.id],
    mutationFn: (id: number) => viewArt(id, token, recaptchaToken),
    onSuccess: () => {
      if (art) {
        setArtStorage([...(artStorage || []), art.id])
      }

      queryClient.invalidateQueries({ queryKey: ['art', slug] })
    },
  })

  useTimeout(() => {
    const isViewed = artStorage?.some(id => id === art?.id)

    if (art && !isViewed) {
      mutate(art.id)
    }
  }, 5000)
}
