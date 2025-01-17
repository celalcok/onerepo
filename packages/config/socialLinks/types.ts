import { IconType } from 'react-icons'

import type { Localize, SocialPlatform } from '@fc/types'

export type SocialLink = {
  id: SocialPlatform
  label: string
  icon: IconType
  link: Localize<string>
}
