import { ArchiveContent } from './archive-content'
import { Expand } from './common'
import { UploadFile } from './file'
import { Post } from './post'
import { StrapiBase } from './strapi'

type PrisonBase = {
  slug: string
  name: string
  city: string
}

type PrisonRelation = {
  posts?: Post[]
  images?: UploadFile[]
  contents?: ArchiveContent[]
}

type PrisonRelationInput = {
  posts?: number[]
  images?: number[]
  contents?: number[]
}

export type PrisonCreateInput = Expand<
  { publishedAt?: Date | string | null } & PrisonBase
>

export type PrisonUpdateInput = PrisonCreateInput & PrisonRelationInput

export type Prison = StrapiBase & PrisonBase & PrisonRelation
