import { ArchiveContent } from './archive-content'
import { ArchiveImage } from './archive-image'
import { Category } from './category'
import { Expand } from './common'
import { Post } from './post'
import { Prison } from './prison'
import { StrapiBase } from './strapi'

type VictimBase = {
  slug: string
  name: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
  birthDate: Date | string | null
  incidentDate: Date | string | null
  resolvedDate: Date | string | null
  resolved: boolean
  deceased: boolean
  pregnant: boolean
  elderly: boolean
  baby: boolean
  sick: boolean
  noshare: boolean
}

type VictimRelation = {
  categories?: Category[]
  images?: ArchiveImage[]
  prisons?: Prison[]
  posts?: Post[]
  contents?: ArchiveContent[]
}

type VictimRelationInput = {
  categories?: number
  images?: number[]
  prisons?: number
  posts?: number
  contents?: number
}

export type VictimCreateInput = Expand<
  { publishedAt?: Date | string | null } & VictimBase & VictimRelationInput
>

export type VictimUpdateInput = VictimCreateInput

export type Victim = StrapiBase & VictimBase & VictimRelation
