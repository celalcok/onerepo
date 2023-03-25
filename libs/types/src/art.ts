import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation } from './strapi'
import { Tag } from './tag'
import { User } from './user'
import { Vote } from './vote'

type ArtBase = StrapiBase & {
  likes: number
  views: number
  slug: string
  title_en: string
  title_nl: string
  title_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  approvalStatus: string
}

type ArtRelation = {
  artist?: User
  categories?: Array<Category>
  collection?: Collection | null
  comments?: Array<Comment>
  feedbacks?: Array<Feedback>
  image?: UploadFile
  likers?: Array<User>
  localizations?: Array<Art>
  tags?: Array<Tag>
  votes?: Array<Vote>
  juryVotes?: Array<Vote>
}

type ArtRelationInput = {
  artist: number
  categories?: Array<number>
  collection?: number | null
  comments?: Array<number>
  feedbacks?: Array<number>
  image: File
  likers?: Array<number>
  tags?: Array<number>
  votes?: Array<number>
  juryVotes?: Array<number>
}

export type ArtCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    ArtBase,
    'approvalStatus' | 'likes' | 'views'
  > &
    Pick<ArtRelationInput, 'categories' | 'collection' | 'tags'>
>

export type ArtUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<ArtBase, 'locale'> & ArtRelationInput
  >
>

export type ArtLocalizeInput = Omit<
  ArtBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Art = StrapiBase & ArtBase & ArtRelation & StrapiCreatorRelation
