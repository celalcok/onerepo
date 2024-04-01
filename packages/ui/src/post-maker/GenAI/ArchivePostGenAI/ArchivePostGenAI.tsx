import { useRouter } from 'next/router'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { createHashtagSentence } from '@fc/services'
import { PostCreateInput, RedisPost } from '@fc/types'
import { generateOgImageParams, sleep, toastMessage } from '@fc/utils'

import { PostGenAIProps, PostGenAI } from '../GenAI'
import {
  useGenPostContext,
  ArchivePost,
  GeneratedArchiveContentPost,
} from '../GenPostProvider'

type ArchivePostGenAIProps = {
  referenceLink?: string
} & Pick<PostGenAIProps, 'archiveContentId' | 'content' | 'colorScheme'>

export const ArchivePostGenAI = ({
  archiveContentId,
  referenceLink = '',
  content,
}: ArchivePostGenAIProps) => {
  const { hashtag, modifyPost } = useGenPostContext()
  const { token } = useAuthContext()
  const { locale } = useRouter()

  const handleSave = async (posts: ArchivePost[]) => {
    const finalPosts: PostCreateInput[] = posts.map(post => {
      return {
        ...post.postInput,
        description: post.description,
        reference: referenceLink,
        locale,
        hashtag: hashtag.id,
      }
    })

    const url = API_URL + '/api/posts/createPosts'
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data: finalPosts }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw Error(response.statusText)

    const addedPosts: { id: number; description: string }[] =
      await response.json()

    for (const post of addedPosts) {
      const localPost = posts.find(p => p.description === post.description)

      if (!localPost) {
        toastMessage('Error', 'Post not found : ' + post.description, 'error')
        continue
      }

      await createHashtagSentence({
        hashtagId: hashtag.id,
        value: localPost.sentences.map(
          sentence => `${sentence}::${post.id}::${0}::${0}` as RedisPost,
        ),
      })

      for (let i = 0; i < localPost.sentences.length; i++) {
        localPost.sentences[i] = ''
        modifyPost(archiveContentId, localPost)
        await sleep(20)
      }
    }
  }

  let lastParsedPosts: GeneratedArchiveContentPost[] = []

  const parseIncomplete = (src: string): GeneratedArchiveContentPost[] => {
    if (src.length < 60) {
      lastParsedPosts = []
    }
    const patternDesc = '"description":"'

    try {
      const parsedPosts: GeneratedArchiveContentPost[] = []
      for (const obj of src.substring(2).split('},{')) {
        const parts = obj.split('","sentences":["')
        const temp: GeneratedArchiveContentPost = {
          description:
            parts[0].length < patternDesc.length
              ? 'waiting...'
              : parts[0].replace(patternDesc, ''),
          sentences:
            parts.length > 1 ? parts[1].replace('"]', '').split('","') : [],
        }
        parsedPosts.push(temp)
      }
      lastParsedPosts = parsedPosts

      return parsedPosts
    } catch (e) {
      return lastParsedPosts
    }
  }

  const parseCompleted = (completedText: string): ArchivePost[] => {
    const items = JSON.parse(completedText)
    const uniqId = Date.now()

    return items.map((item: ArchivePost, index: number) => {
      return {
        ...item,
        id: uniqId + index,
        postInput: {
          hashtag: hashtag.id,
          imageParams: generateOgImageParams({
            image: hashtag.image ?? undefined,
          }),
        } as PostCreateInput,
      } as ArchivePost
    })
  }

  return (
    <PostGenAI
      colorScheme="green"
      content={content}
      archiveContentId={archiveContentId}
      apiUrl="/api/gen-archive-content-posts"
      parseIncomplete={parseIncomplete}
      parseCompleted={parseCompleted}
      onSave={handleSave}
    />
  )
}
