import { Button, HStack, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RxTwitterLogo } from 'react-icons/rx'

import { SITE_URL } from '@wsvvrijheid/config'
import { useHashtagContext, usePostContext } from '@wsvvrijheid/context'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'

export const PostMakerTweetButtons = ({ id }: { id: number }) => {
  const router = useRouter()
  const { trendsDisclosure, mentionsDisclosure } = useHashtagContext()
  const { post } = usePostContext(id)

  const { asPath, locale, query } = router

  const { t } = useTranslation()

  const url = `${SITE_URL}${asPath}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${query['slug']}/`,
    text: `${post.postContent}\n\n`,
  }
  const queryParams = new URLSearchParams(params)

  const postUrl = `${baseUrl}?${queryParams.toString()}`

  const onTweet = () => {
    console.log('tweet')
  }

  if (!post) return null

  return (
    <HStack justifyContent={'space-between'}>
      <Button
        variant={'ghost'}
        onClick={mentionsDisclosure.onOpen}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<GoMention />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-mention')}
        </Text>
      </Button>
      <Button
        variant={'ghost'}
        onClick={trendsDisclosure.onOpen}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<MdTrendingUp />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-trend')}
        </Text>
      </Button>

      <PostMakerTweetProgress />

      <Link href={postUrl} target={'_blank'}>
        <Button
          variant={'ghost'}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<RxTwitterLogo />}
          onClick={onTweet}
        >
          <Text display={{ base: 'none', md: 'block' }}>Tweet</Text>
        </Button>
      </Link>

      <PostMakerTweetShare
        url={url}
        content={post.post?.description as string}
      />
    </HStack>
  )
}
