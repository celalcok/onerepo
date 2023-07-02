import { useRouter } from 'next/router'

import { ROUTES } from '@wsvvrijheid/config'
import { Hashtag, Post } from '@wsvvrijheid/types'
import { getItemLink } from '@wsvvrijheid/utils'

export const useItemLink = (
  item: Hashtag | Post,
  type: keyof typeof ROUTES | 'post' | 'hashtag',
  isAbsolute?: boolean,
): string | null => {
  const { locale } = useRouter()

  if (!item) return null

  return getItemLink(item, locale, type, isAbsolute)
}
