import { FC } from 'react'

import {
  Avatar,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'

import { Navigate } from '../Navigate'
import { WImage } from '../WImage'

interface CardProps {
  title: string
  description: string
  image: UploadFile
  link: string
  rounded?: boolean
}

export const Card: FC<CardProps> = ({
  title,
  description,
  image,
  link,
  rounded,
}) => {
  return (
    <LinkBox h={'full'}>
      <Stack
        h="full"
        bg="white"
        shadow="base"
        rounded="lg"
        overflow="hidden"
        role="group"
      >
        <Center overflow="hidden">
          {/* TODO Create shared image component */}
          {rounded ? (
            <Avatar
              objectFit="cover"
              boxSize={48}
              src={`${ASSETS_URL}${image}`}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          ) : (
            <WImage
              src={image}
              alt={title}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          )}
        </Center>

        <Stack spacing={4} flex={1} p={4} align="center" textAlign="center">
          <LinkOverlay as={Navigate} href={link}>
            <Heading
              as="h3"
              textTransform="uppercase"
              fontSize="lg"
              letterSpacing="wide"
              noOfLines={3}
            >
              {title}
            </Heading>
          </LinkOverlay>
          <Text fontSize="md" lineHeight="base" noOfLines={3}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </LinkBox>
  )
}
