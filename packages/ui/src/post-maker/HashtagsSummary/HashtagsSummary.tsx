import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Navigate, WImage } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'

import { HashtagMiniCard } from './HashtagMiniCard'

type HashtagsSummaryProps = {
  hashtags: Hashtag[]
}

export const HashtagsSummary: FC<HashtagsSummaryProps> = ({ hashtags }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const links = hashtags.map(hashtag => {
    return getItemLink(hashtag, locale as StrapiLocale, 'hashtag')
  })

  const [latestHashtag, ...prevHashtags] = hashtags
  const [latestLink, ...prevLinks] = links

  return (
    <Box bg={'white'} p={{ base: 4, lg: 16 }}>
      <Heading textAlign={'center'} pb={{ base: 4, lg: 8 }}>
        {t('hashtag-events')}
      </Heading>
      <Container p={0}>
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          spacing={{ base: 6, lg: 4 }}
          justifyContent={'space-between'}
          borderRadius={'xl'}
          border={2}
          borderColor={'white'}
          maxH={{ lg: '2xl' }}
        >
          <Stack
            direction={'column'}
            alignItems={'stretch'}
            justifyContent={
              hashtags.length <= 3 ? 'flex-start' : 'space-evenly'
            }
            spacing={{ base: 3, lg: 6 }}
            maxW={'lg'}
          >
            {prevHashtags &&
              prevHashtags.map((hashtag, i) => (
                <HashtagMiniCard
                  key={hashtag.id}
                  hashtag={hashtag}
                  link={prevLinks[i]}
                />
              ))}
          </Stack>
          <Stack
            direction={'column'}
            color="white"
            spacing={{ base: 2, lg: 8 }}
            alignItems={'stretch'}
            justifyContent={'space-between'}
            flexGrow={1}
          >
            <Box borderRadius={'xl'} overflow={'hidden'}>
              <WImage
                ratio={16 / 10}
                src={latestHashtag.image}
                _hover={{ transform: 'scale(1.05 )' }}
                transition={'transform'}
                transitionDuration={'300ms'}
              />
            </Box>
            <Stack
              spacing={{ base: 2, lg: 4 }}
              alignItems={'flex-start'}
              color={'black'}
              px={1}
            >
              <Heading as="h3" fontSize="2xl">
                {latestHashtag.title}
              </Heading>
              <Text size="lg" fontWeight={400}>
                {latestHashtag.description}
              </Text>
              <Button
                as={Navigate}
                href={latestLink || '/'}
                size={'lg'}
                fontWeight={600}
                boxShadow="lg"
              >
                {t('read-more')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}