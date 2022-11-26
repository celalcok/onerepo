import { Hashtag, Localize, Mention } from '@wsvvrijheid/types'

export type MainHashtagDetailModalProps = {
  localizeHashtag: Localize<Hashtag>
  isOpen: boolean
  onClose: () => void
  onDelete: (maninhashtagId: number) => void
  onPublish: (maninhashtagId: number) => void
  unPublish: (maninhashtagId: number) => void
}

export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  hashtagExtra?: string
  date: string
  mentions?: {
    label: string
    value: string
  }[]
  image: Blob
}

export type MentionItemProps = {
  mention: Mention
  onRemoveItem: (id: number) => void
}
