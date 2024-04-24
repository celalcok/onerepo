import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'
import {
  BsCashCoin,
  BsCashStack,
  BsCollection,
  BsCommand,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag, CgProfile } from 'react-icons/cg'
import { FiActivity, FiUsers } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { IoPricetagsOutline } from 'react-icons/io5'
import { LuFileArchive } from 'react-icons/lu'
import {
  MdFoundation,
  MdOutlineCategory,
  MdOutlineFeedback,
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
} from 'react-icons/md'
import { SiGeneralelectric, SiMaterialdesignicons } from 'react-icons/si'
import {
  TbActivity,
  TbBookmarks,
  TbBrandTwitter,
  TbBrush,
  TbChecks,
  TbClock,
  TbMilitaryRank,
  TbThumbUp,
  TbTimeline,
  TbWriting,
  TbX,
} from 'react-icons/tb'

import { AdminRoute } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { StrapiEndpoint } from '@fc/types'

import { AdminNavItemProps } from './types'

export const useAdminNav = (): AdminNavItemProps[] => {

  const { t, i18n } = useTranslation()
  const { isLoading, permissionCheck } = useAuthContext()

  return useMemo(() => {
    console.info("!!! Recreating admin nav !!!")
    if (isLoading) return []

    const menuItems: AdminNavItemProps[] = [
      {
        label: t('dashboard'),
        link: '/',
        icon: <MdOutlineSpaceDashboard />,
        allowed: true
      },
      {
        label: t('foundation'), // t('foundation')
        icon: <MdFoundation />,
        submenu: [
          {
            label: t('foundation.general'), // t('general')
            link: '/foundations',
            icon: <SiGeneralelectric />,
          },
          {
            label: t('foundation.assets'), // t('assets')
            link: '/assets',
            icon: <SiMaterialdesignicons />,
          },
        ],
      },
      {
        label: t('translates'),
        icon: <BsTranslate />,
        submenu: [
          {
            label: t('activities'),
            link: '/translates?slug=activities',
            icon: <TbActivity />,
            allowed: permissionCheck.canUpdate('activities'),
          },
          {
            label: t('collections'),
            link: '/translates?slug=collections',
            icon: <BsCollection />,
            allowed: permissionCheck.canUpdate('collections'),
          },
          {
            label: t('hashtags'),
            link: '/translates?slug=hashtags',
            icon: <CgHashtag />,
            allowed: permissionCheck.canUpdate('hashtags'),
          },
          {
            label: t('posts'),
            link: '/translates?slug=posts',
            icon: <TbBrandTwitter />,
            allowed: permissionCheck.canUpdate('posts'),
          },
        ],
      },
      {
        label: t('archive-contents'),
        icon: <LuFileArchive />,
        link: '/archive-contents',
      },
      {
        label: t('activities'),
        icon: <FiActivity />,
        link: '/activities',
      },
      {
        label: t('arts'),
        icon: <TbBrush />,

        submenu: [
          {
            label: t('pending-arts'),
            link: '/arts?status=pending',
            icon: <TbClock />,
          },
          {
            label: t('approvedArts'),
            link: '/arts?status=approved',
            icon: <TbChecks />,
          },
          {
            label: t('rejected-arts'),
            link: '/arts?status=rejected',
            icon: <TbX />,
          },
        ],
      },
      {
        label: t('art.collections'),
        link: '/collections',
        icon: <BsCollection />,
      },
      {
        label: t('hashtags'),
        icon: <CgHashtag />,
        link: '/hashtags',
      },
      {
        label: t('hashtagPosts'),
        icon: <TbBrandTwitter />,
        link: '/posts',
      },
      {
        label: t('categories'),
        icon: <MdOutlineCategory />,
        link: '/categories',
      },
      {
        label: t('tags'),
        icon: <IoPricetagsOutline />,
        link: '/tags',
      },
      {
        label: t('news'),
        icon: <HiOutlineNewspaper />,
        submenu: [
          {
            label: t('news'),
            link: '/news',
            icon: <HiOutlineNewspaper />,
            allowed: permissionCheck.canReadAll('topic', 'topic/sync'),
          },
          {
            label: t('bookmarked-news'),
            link: '/news/bookmarks',
            icon: <TbBookmarks />,
          },
          {
            label: t('recommended-news'),
            link: '/news/recommended',
            icon: <TbThumbUp />,
            allowed: permissionCheck.canReadAll('recommended-topics'),
          },
        ],
      },
      {
        label: t('timelines'),
        icon: <TbTimeline />,
        submenu: [
          {
            label: t('timelines'),
            link: '/timelines',
            icon: <GiHumanPyramid />,
          },
          {
            label: t('bookmarked-tweets'),
            link: '/timelines/bookmarks',
            icon: <TbBookmarks />,
          },
          {
            label: t('recommended-tweets'),
            link: '/timelines/recommended',
            icon: <TbThumbUp />,
          },
        ],
      },
      {
        label: t('courses'),
        link: '/courses',
        icon: <GiHumanPyramid />,
      },
      {
        label: t('profiles'),
        link: '/profiles',
        icon: <CgProfile />,
      },
      {
        label: t('users'),
        icon: <FiUsers />,
        submenu: [
          {
            label: t('users'),
            link: '/users',
            icon: <FiUsers />,
            allowed: permissionCheck.anyEndpoint('users-permissions/roles'),
          },
          {
            label: t('role'),
            link: '/roles',
            icon: <TbMilitaryRank />,
            allowed: permissionCheck.anyEndpoint('users-permissions/roles'),
          },
        ],
      },
      {
        label: t('blogs'),
        icon: <TbWriting />,
        link: '/blogs',
      },
      {
        label: t('accounts'),
        link: '/accounts',
        icon: <MdOutlineSupervisorAccount />,
      },
      {
        label: t('competitions'),
        link: '/competitions',
        icon: <BsCommand />,
      },
      {
        label: 'Donation',
        link: '/donation',
        icon: <BsCashCoin />,
      },
      {
        label: t('donations'),
        link: '/donations',
        icon: <BsCashStack />,
      },
      {
        label: t('user-feedbacks'),
        link: '/user-feedbacks',
        icon: <MdOutlineFeedback />,
      },
    ]

    const allowByLink = (link?: AdminRoute): boolean => {
      if (!link) return true
      const endpoint = link.match(/\/([^?]+)/)?.[1] as StrapiEndpoint

      return permissionCheck.canRead(endpoint)
    }

    const setAllowedProps = (menuItem: AdminNavItemProps) => {
      if (menuItem.allowed === true || menuItem.allowed === false) return

      if (menuItem.submenu && menuItem.submenu.length > 0) {
        menuItem.submenu.forEach(setAllowedProps)
        menuItem.allowed = menuItem.submenu.some(submenu => submenu.allowed)
      } else
        menuItem.allowed = allowByLink(menuItem.link)
    }

    menuItems.forEach(setAllowedProps)

    const filterMenu = (menuItem: AdminNavItemProps): boolean => {
      if (menuItem.submenu && menuItem.submenu.length > 0) {
        menuItem.submenu = menuItem.submenu.filter(filterMenu)

        return menuItem.submenu.length > 0
      }

      return menuItem.allowed === true
    }

    return menuItems.filter(filterMenu);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, i18n.language])
}
