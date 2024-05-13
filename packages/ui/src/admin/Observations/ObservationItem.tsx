import { HStack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TbPointFilled } from 'react-icons/tb'

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
    <HStack>
      <TbPointFilled />
      <Text>{content}</Text>
      <Text fontWeight={600} fontSize={'sm'}>
        {creator?.name}
      </Text>
      <Text fontSize={'sm'}>{createdDate}</Text>
    </HStack>
  )
}
