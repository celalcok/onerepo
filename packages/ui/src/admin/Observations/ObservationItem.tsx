import { HStack, Stack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { Observation } from '@fc/types/src/observation'

export type ObservationItemProps = Pick<
  Observation,
  'content' | 'createdAt' | 'creator'
>

export const ObservationItem = ({
  content,
  createdAt,
  creator,
}: ObservationItemProps) => {
  const createdDate = format(createdAt, 'dd-MM-yyyy HH:mm')

  return (
    <Stack p={2} borderWidth={1} rounded={'md'}>
      <HStack>
        <Text fontWeight={600} fontSize={'sm'}>
          {creator?.name}
        </Text>
        <Text fontSize={'sm'}>{createdDate}</Text>
      </HStack>
      <Text>{content}</Text>
    </Stack>
  )
}
