import { Expand } from './common'
import { StrapiBase } from './strapi'
import { Tweet } from './tweet'
import { User } from './user'

type SavedTweetBase = {
  tweet: Tweet
  username: string
}

type SavedTweetRelation = {
  saver: User
}

type SavedTweetRelationInput = {
  saver: number
}

export type SavedTweetCreateInput = Expand<
  SavedTweetBase & SavedTweetRelationInput
>

export type SavedTweet = StrapiBase & SavedTweetBase & SavedTweetRelation
