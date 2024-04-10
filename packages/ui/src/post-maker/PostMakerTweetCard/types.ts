import { Post } from '@fc/types'

export type PostMakerTweetShareProps = {
  url: string
  content: string
  allowManagingSentences: boolean
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
