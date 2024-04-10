import { Post } from '@fc/types'

export type PostMakerTweetShareProps = {
  url: string
  content: string
  canManageSentences: boolean
}

export type PostMakerTweetButtonsProps = {
  post: Post
  content: string
  onTweet: () => void
}

export type PostMakerTweetListProps = {
  posts: Post[]
  isIosSafari: boolean
}
