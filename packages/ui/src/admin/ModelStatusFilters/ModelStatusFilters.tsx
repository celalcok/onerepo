import { FC } from 'react'

import {
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { I18nNamespaces } from '../../../@types/i18next'
import { Option } from '../ModelForm'

type ModelStatusFiltersProps = {
  args: {
    currentValue: string
    defaultValue: string
    hidden?: boolean
    setCurrentValue: (value: string) => void
    statuses: string[] | Option[]
  }[]
}

export const ModelStatusFilters: FC<ModelStatusFiltersProps> = ({ args }) => {
  const { t } = useTranslation()

  return (
    <Stack
      p={2}
      bg={'white'}
      rounded={'sm'}
      shadow={'sm'}
      overflowX={'auto'}
      flexShrink={0}
      divider={<MenuDivider />}
    >
      {args.map((arg, i) => {
        const {
          statuses,
          currentValue,
          setCurrentValue,
          defaultValue,
          hidden,
        } = arg

        if (hidden) return null

        const handleChange = (value: string | string[]) => {
          setCurrentValue(value as string)
        }

        return (
          <MenuOptionGroup
            key={i}
            value={currentValue || defaultValue}
            onChange={handleChange}
            title={t('status')}
          >
            {statuses.map((status, i) => {
              const value = typeof status === 'string' ? status : status.value
              const label = typeof status === 'string' ? status : status.label

              return (
                <MenuItemOption key={i} value={`${value}`}>
                  {t(label as keyof I18nNamespaces['common'])}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        )
      })}
    </Stack>
  )
}
