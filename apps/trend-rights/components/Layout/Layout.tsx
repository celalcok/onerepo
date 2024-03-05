import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Layout as AppLayout, UserFeedback } from '@fc/ui'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  isLoading?: boolean
  hasScroll?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  isDark,
  isLoading,
  hasScroll,
  seo,
}) => {
  const { checkAuth } = useAuthContext()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <AppLayout
        seo={seo}
        headerProps={{
          headerMenu: menus['trend-rights'].headerMenu,
          isDark,
          hasScroll,
          logo: isDark
            ? '/images/trend-rights-logo-light.svg'
            : '/images/trend-rights-logo.svg',
        }}
        footerProps={{
          name: 'trend-rights',
          menu: menus['trend-rights'].footerMenu,
          about: 'trend-rights',
          socialItems: socialLinks['trend-rights'],
          logo: '/images/trend-rights-logo-light.svg',
        }}
        isDark={isDark}
        isLoading={isLoading}
      >
        {children}
      </AppLayout>
      <UserFeedback />
      {/* <PlusButton /> */}
    </>
  )
}
