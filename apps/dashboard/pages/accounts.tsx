import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

const AccountsPage = () => {
  const { t } = useTranslation()

  return (
    <AdminLayout seo={{ title: t('accounts') }}>
      <Box>Accounts</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default AccountsPage
