import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import type { Activity, UploadFile } from '@fc/types'

export type ActivityDetailProps = {
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  title: string
  activity?: Activity
}
