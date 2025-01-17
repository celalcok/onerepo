import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { ApprovalStatus, Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

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
  approvalStatus: ApprovalStatus
  isLiked?: boolean
}

type ArtRelation = {
  artist?: Profile | null
  categories?: Array<Category>
  collection?: Collection | null
  comments?: Array<Comment>
  feedbacks?: Array<Feedback>
  image?: UploadFile[]
  likers?: Array<Profile>
}

type ArtRelationInput = {
  artist: number
  categories?: Array<number>
  collection?: number | null
  comments?: Array<number>
  feedbacks?: Array<number>
  image: File[]
  likers?: Array<number>
}

export type ArtCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    Partial<ArtBase>,
    'approvalStatus' | 'likes' | 'views'
  > &
    Pick<ArtRelationInput, 'image' | 'categories' | 'collection'>
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

export type Art = StrapiBase & ArtBase & ArtRelation
