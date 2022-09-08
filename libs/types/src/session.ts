/* eslint-disable @typescript-eslint/no-empty-interface */

import 'iron-session'
import { User } from './user'

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'confirmed' | 'blocked'
> & {
  name?: string
  avatar?: string
  isAuthenticated: boolean
  isAdmin: boolean
  isEditor: boolean
  artistId?: number
  authorId?: number
  applicantId?: number
  artEditorId?: number
  juryId?: number
  translatorId?: number
  volunteerId?: number
}

export type Auth = {
  user: SessionUser | null
  isLoggedIn: boolean
  token: string | null
}

export type AuthResponse = {
  jwt: string
  user: {
    id: number | null
    username: string | null
    email: string | null
    provider: string | null
    confirmed: boolean | null
    blocked: boolean | null
    createdAt: string | null
    updatedAt: string | null
  }
}

declare module 'iron-session' {
  interface IronSessionData extends Auth {}
}
