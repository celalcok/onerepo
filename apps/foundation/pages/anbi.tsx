import { FC } from 'react'

import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Wrap,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { GrDocumentDownload } from 'react-icons/gr'

import { API_URL } from '@fc/config'
import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Foundation, StrapiLocale } from '@fc/types'
import { Container, Hero } from '@fc/ui'

import { DirectorsCard, FoundationDetails, Layout } from '../components'

type AnbiPageProps = InferGetStaticPropsType<typeof getStaticProps>

const AnbiPage: FC<AnbiPageProps> = ({ foundation }) => {
  const { t } = useTranslation()

  const title = 'ANBI'

  const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ')
    const initials = nameParts[0].charAt(0) + '.'
    const lastName = nameParts.slice(1).join(' ')
    const formattedName = `${initials} ${lastName}`

    return formattedName
  }

  // formatted names
  const chairmanName = formatName(foundation?.chairman?.name || ' ')
  const secretaryName = formatName(foundation?.secretary?.name || ' ')
  const accountantName = formatName(foundation?.accountant?.name || ' ')

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Box minH="inherit" fontWeight={500}>
        <Container minH="inherit" py={{ base: 8, lg: 16 }}>
          <Stack spacing={16} textAlign={'center'}>
            {/*  foundation details*/}
            <Stack spacing={4}>
              <Heading as="h3" size="lg" fontWeight={700}>
                {foundation?.name}
              </Heading>

              <FoundationDetails foundation={foundation} />
            </Stack>

            {/* directors */}
            <Stack spacing={4}>
              <Heading as="h3" size="lg" fontWeight={700}>
                {t('foundation.management')}
              </Heading>
              <SimpleGrid gap={4} columns={{ base: 1, lg: 3 }} w={'full'}>
                {chairmanName && (
                  <DirectorsCard
                    title={t('foundation.chairman')}
                    name={chairmanName}
                  />
                )}
                {secretaryName && (
                  <DirectorsCard
                    title={t('foundation.secretary')}
                    name={secretaryName}
                  />
                )}

                {accountantName && (
                  <DirectorsCard
                    title={t('foundation.treasurer')}
                    name={accountantName}
                  />
                )}
              </SimpleGrid>
            </Stack>
            {/* documents */}

            <Wrap spacing={4} justify={'center'}>
              {foundation?.policy_plan && (
                <Button
                  as={Link}
                  href={API_URL + foundation?.policy_plan?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {' '}
                  {t('foundation.policy-plan')}
                </Button>
              )}

              {foundation?.substantive_financial_annual_report && (
                <Button
                  as={Link}
                  href={
                    API_URL +
                    foundation?.substantive_financial_annual_report?.url
                  }
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('foundation.financial-report')}
                </Button>
              )}
              {foundation?.remuneration_policy && (
                <Button
                  as={Link}
                  href={API_URL + foundation?.remuneration_policy?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('foundation.remuneration-policy')}
                </Button>
              )}
            </Wrap>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default AnbiPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const foundationsData = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  const foundation = foundationsData?.data?.[0]

  if (!foundation) return { notFound: true }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundation,
    },
    revalidate: 1,
  }
}
