import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type PrivacyBase = Omit<
  StrapiEntityBase,
  'description' | 'translationStatus'
>

type PrivacyRelation = {
  image?: UploadFile
  localizations?: Array<Privacy>
}

export type Privacy = Expand<StrapiBase & PrivacyBase & PrivacyRelation>
