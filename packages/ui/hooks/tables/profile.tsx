import { Icon, ThemeTypings } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaRegFilePdf } from 'react-icons/fa6'

import type {
  Job,
  Platform,
  Profile,
  ProfileStatus,
  Role,
  User,
} from '@fc/types'

import type { WTableProps } from '../../components/WTable'

export const useProfileColumns = (): WTableProps<
  Profile & { role: Role }
>['columns'] => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return [
    {
      accessorKey: 'avatar',
      type: 'image',
    },
    { accessorKey: 'name', sortable: true },
    {
      accessorKey: 'isVolunteer',
      label: 'volunteer',
      type: 'badge',
      transform: value => (value ? t('volunteer') : null),
      componentProps: {
        colorScheme: 'primary',
        variant: 'outline',
      },
    },
    {
      accessorKey: 'volunteerForm',
      label: 'form',
      transform: value => value && <Icon as={FaRegFilePdf} />,
    },
    {
      accessorKey: 'cv',
      label: 'cv',
      transform: value => value && <Icon as={FaRegFilePdf} />,
    },
    {
      accessorKey: 'profileStatus',
      type: 'badge',
      transform: value => t(value as ProfileStatus),
      componentProps: value => {
        const colorScheme: Record<string, ThemeTypings['colorSchemes']> = {
          [t('pending')]: 'orange', // 'orange
          [t('accepted')]: 'blue',
          [t('rejected')]: 'red',
          [t('in-progress')]: 'purple',
          [t('left')]: 'gray',
          [t('awaiting')]: 'yellow',
          [t('approved')]: 'green',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ProfileStatus],
        }
      },
    },
    {
      accessorKey: 'user',
      label: 'role',
      transform: value => (value as User)?.role?.name,
      sortable: true,
      sortKey: 'role.name',
      type: 'badge',
      componentProps: value => {
        const rolesColorMap: Record<string, ThemeTypings['colorSchemes']> = {
          'ArtEditor Translator': 'pink',
          'Author Translator': 'facebook',
          'ContentManager Translator': 'orange',
          AcademyEditor: 'blue',
          AccountManager: 'cyan',
          Admin: 'primary',
          All: 'gray',
          ArtEditor: 'purple',
          Authenticated: 'gray',
          Author: 'facebook',
          ContentManager: 'orange',
          'Kunsthalte Coordinator': 'teal',
          Jury: 'yellow',
          Public: 'gray',
          'Platform Coordinator': 'green',
          Translator: 'whatsapp',
        }

        return {
          colorScheme: rolesColorMap[value as keyof typeof rolesColorMap],
          variant: 'outline',
        }
      },
    },
    {
      accessorKey: 'platforms',
      transform: value =>
        (value as Platform[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    {
      accessorKey: 'jobs',
      transform: value =>
        (value as Job[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    { accessorKey: 'email', sortable: true },
    { accessorKey: 'availableHours', sortable: true },
    { accessorKey: 'phone' },
    {
      accessorKey: 'address',
      label: 'country',
      transform: value => (value as Profile['address'])?.country,
    },
    { accessorKey: 'createdAt', type: 'date', sortable: true },
  ]
}
