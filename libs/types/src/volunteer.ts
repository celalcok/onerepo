import { ArtEditor } from './art-editor'
import { Author } from './author'
import { Job } from './job'
import { Juri } from './juri'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Translator } from './translator'
import { User } from './user'

export type Volunteer = {
  id: number
  username: string
  name: string
  email: string
  bio: string
  occupation: string
  phone: string
  country: string
  availableHours: number
  heardFrom: string
  comment: string
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  inMailingList: boolean
  approved: boolean
  isPublis: boolean
  user: StrapiEntity<User>
  translator: StrapiEntity<Translator>
  juri: StrapiEntity<Juri>
  author: StrapiEntity<Author>
  jobs: StrapiCollection<Job>
  art_editor: StrapiEntity<ArtEditor>
}
