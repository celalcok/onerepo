import { FC } from 'react'

import { Button, HStack, Heading, Stack, Text } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Presentation } from '@wsvvrijheid/types'

import { Container } from '../../components'

export type PresentationTemplateProps = {
  // seo: NextSeoProps
  presentations: Presentation[]
}

export const PresentationTemplate: FC<PresentationTemplateProps> = ({
  // seo,
  presentations,
}) => {
  // const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8} align="center">
        {presentations?.map(pr => {
          return (
            <>
              <HStack>
                <Button as={Link} href={'https://wsvvrijheid.nl/donation'}>Donation</Button>
                <Button as={Link} href={'https://samenvvv.nl'}>Postmaker</Button>
              </HStack>

              <Heading as="h1" textAlign="center">
                {pr[`title_${locale}`]}
              </Heading>

              <Text key={pr.id}>{pr[`content_${locale}`]}</Text>
            </>
          )
        })}
      </Stack>
    </Container>
  )
}
