import { ApprovalStatus, Expand, OgImageParams } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { Prison } from './prison'
import { Profile } from './profile'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Victim } from './victim'

export type PostBase = Omit<StrapiEntityBase, 'title' | 'slug'> & {
  title: string
  capsStatus: ApprovalStatus
  twitterMedia?: string | null
  imageParams?: OgImageParams | null
  videoUrl?: string | null
}

export type PostRelation = {
  image?: UploadFile | null
  video?: UploadFile | null
  caps?: UploadFile | null
  hashtag?: Hashtag | null
  prison?: Prison | null
  translator?: Profile | null
  localizations?: Array<Post>
  victim?: Victim | null
}

export type PostRelationInput = {
  image: File
  video: File
  caps: File
  hashtag: number
  prison?: Array<number>
  translator?: number
  victim?: number
}

export type PostCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    PostBase,
    'approvalStatus' | 'capsStatus' | 'videoUrl'
  > &
    Pick<PostRelationInput, 'image' | 'hashtag' | 'victim' | 'prison'>
>

export type PostUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<PostBase, 'locale'> & Omit<PostRelationInput, 'translator'>
  >
>

export type PostLocalizeInput = Pick<PostBase, 'description' | 'approvalStatus'>

export type Post = StrapiBase & PostBase & PostRelation

export type PostSentence = {
  postId: number
  value: string
  index: number
  shareCount: number
  isPublished: boolean
  archiveId: number
}
