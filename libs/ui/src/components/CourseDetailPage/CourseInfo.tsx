import { FC } from 'react'

import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { differenceInWeeks, format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { CgCalendarDates } from 'react-icons/cg'
import { FiClock } from 'react-icons/fi'
import { HiLanguage } from 'react-icons/hi2'
import { IoPeopleOutline } from 'react-icons/io5'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'

import { CourseInfoItemProps, CourseInfoProps } from './types'

enum Languages {
  en = 'English',
  tr = 'Türkçe',
  nl = 'Nederlands',
}

const CourseInfoItem: FC<CourseInfoItemProps> = ({ icon, label, value }) => (
  <HStack>
    <Box flexShrink={0}>{icon}</Box>
    <HStack>
      <Text fontWeight={500} w={100}>
        {label}:
      </Text>
      <Text>{value}</Text>
    </HStack>
  </HStack>
)

export const CourseInfo: FC<CourseInfoProps> = ({ course }) => {
  const { t } = useTranslation()

  const totalWeeks = differenceInWeeks(
    new Date(course.endDate),
    new Date(course.startDate),
  )

  const items = [
    {
      label: `${t('date-start')}`,
      value: format(new Date(course.startDate), 'dd-MM-yyyy'),
      icon: <CgCalendarDates />,
    },
    {
      label: `${t('date-end')}`,
      value: format(new Date(course.endDate), 'dd-MM-yyyy'),
      icon: <CgCalendarDates />,
    },
    {
      label: `${t('total-time')}`,
      value: `${t('weeksWithCount', { count: totalWeeks })}`,
      icon: <FiClock />,
    },
    {
      label: `${t('price')}`,
      value: `€${course.price}`,
      icon: <RiMoneyEuroCircleLine />,
    },
    {
      label: `${t('education-language')}`,
      value: `${Languages[course.language]}`,
      icon: <HiLanguage />,
    },
    {
      label: `${t('course.quota')}`,
      value: `${course.quota}`,
      icon: <IoPeopleOutline />,
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={8}>
      {items.map(item => (
        <CourseInfoItem
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </SimpleGrid>
  )
}
