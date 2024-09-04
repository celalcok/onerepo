import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { getSession } from '@fc/secrets'
import { getBlogs, useGetBlogs } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'

import { Layout } from '../../components'
import { WhyWeAre } from '../../components/WhyWeAre'

const Blogs = () => {
  const { data: blogs = [] } = useGetBlogs()
  const { locale } = useRouter()

  const titles = {
    en: 'Why are we here',
    nl: 'Waarom zijn we hier',
    tr: 'Neden buradayız',
  }
  const title = titles[locale] || titles['en']

  return (
    <Layout seo={{ title }} isDark={!!blogs?.length}>
      <WhyWeAre blogs={blogs} seo={{ title }} />
    </Layout>
  )
}

export default Blogs

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const { token } = await getSession(context.req, context.res)

  await queryClient.prefetchQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale, token),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
