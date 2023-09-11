import { FC } from 'react'

import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaArrowRight } from 'react-icons/fa'
import { HiOutlineCalendar } from 'react-icons/hi'

import { Hashtag } from '@wsvvrijheid/types'
import { FormattedDate, Navigate, WImage } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
interface SliderHeroProps {
  item: Hashtag
}

export const HashtagCard: FC<SliderHeroProps> = ({ item }) => {
  const { t } = useTranslation(['common'])
  const link = getItemLink(item, 'hashtags')

  return (
    <Grid
      gap={8}
      gridTemplateColumns={{ base: '1fr', lg: '4fr 3fr' }}
      alignItems="center"
    >
      <Stack
        align="start"
        flex={1}
        spacing={8}
        p={{ base: 4, lg: 8 }}
        order={{ base: 2, lg: 1 }}
      >
        <Box>
          <Heading size="lg">{item.title}</Heading>
        </Box>
        <HStack>
          <Icon as={HiOutlineCalendar} mr={1} mb={1} />
          <FormattedDate date={item.date as string} />
        </HStack>
        <Box>
          <Text flex={1} noOfLines={4}>
            {item.description}
          </Text>
        </Box>

        <Button
          as={Navigate}
          href={link as string}
          justifySelf="end"
          rightIcon={<FaArrowRight />}
        >
          {t('read-more')}
        </Button>
      </Stack>

      <Box flex={1} h="full" w="full">
        <WImage overflow="hidden" src={item.image} />
      </Box>
    </Grid>
  )
}
