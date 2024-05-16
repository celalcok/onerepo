import {
  Box,
  Button,
  Center,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { CiImageOff } from 'react-icons/ci'
import { FaRegFilePdf } from 'react-icons/fa6'
import { IoMdCloudUpload } from 'react-icons/io'

import {
  PlatformSlug,
  Post,
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
  UploadFile,
} from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { ModelPdf } from './ModelPdf'
import { Caps, FilePicker, VideoPlayer, WImage } from '../../components'

export type ModelMediaProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  setValue: UseFormSetValue<T>
  endpoint?: StrapiEndpoint
}

export const ModelMedia = <T extends FieldValues = FieldValues>({
  setValue,
  model,
  isEditing,
  isChangingMedia,
  toggleChangingMedia,
  endpoint,
  name,
}: ModelMediaProps<T>) => {
  const { title, description } = (model || {}) as StrapiTranslatableModel
  const { isOpen, onClose, onOpen } = useDisclosure()
  console.log('modelmedia', model)
  const key = name || 'image'

  // Name can be image or avatar
  const media = (model as any)?.[key] as UploadFile
  // const isMediaFile =
  //   media?.mime.includes('video') || media?.mime.includes('image')
  // if (!isMediaFile) {
  //   return <Box />
  // }

  // console.log('isMediaFile', isMediaFile)
  console.log('name >>>', name)
  if (Array.isArray(media)) {
    return (
      <Splide>
        {media.map((m, index) => {
          const newModel = {
            ...model,
            [key]: m,
          }

          return (
            <SplideSlide key={index}>
              <ModelMedia
                model={newModel}
                name={name}
                isEditing={isEditing}
                isChangingMedia={isChangingMedia}
                toggleChangingMedia={toggleChangingMedia}
                setValue={setValue}
                endpoint={endpoint}
              />
            </SplideSlide>
          )
        })}
      </Splide>
    )
  }

  const mediaUrl = getMediaUrl(media)

  const renderMedia = () => {
    if (isChangingMedia || (isEditing && !media)) {
      return (
        <Stack>
          {media && <Button onClick={toggleChangingMedia}>Cancel</Button>}
          <FilePicker
            onLoaded={files =>
              setValue(name as Path<T>, files[0] as PathValue<T, Path<T>>)
            }
          />
        </Stack>
      )
    }

    if (!media) {
      return (
        <Stack
          borderWidth={1}
          rounded={'md'}
          h={300}
          align={'center'}
          justify={'center'}
        >
          <Box as={CiImageOff} boxSize={100} />
          <Text>No media available</Text>
        </Stack>
      )
    }

    if (name === 'video') {
      return <VideoPlayer url={mediaUrl} />
    }
    if (media?.mime.includes('pdf') || media?.ext === 'pdf') {
      // Check if media is a PDF
      // Render PDF viewer here

      return (
        <>
          <Text>Show {name}</Text>
          <Tooltip label={`Open ${name}`}>
            <IconButton
              aria-label="back"
              icon={<FaRegFilePdf />}
              rounded="full"
              onClick={onOpen}
            />
          </Tooltip>
          <ModelPdf
            mideaUrl={mediaUrl}
            isOpen={isOpen}
            onClose={onClose}
            title={name}
            onOpen={onOpen}
          />
        </>
        // <object
        //   data={mediaUrl}
        //   type="application/pdf"
        //   width="1200px"
        //   height="1200px"
        // >
        //   <embed src={mediaUrl} type="application/pdf" />
        // </object>
      )
    }

    if (endpoint === 'posts' && mediaUrl && name === 'image') {
      return (
        <Caps
          imageParams={{
            title,
            text: description as string,
            image: media,
            platform: (model as Post)?.hashtag?.platform?.slug as PlatformSlug,
            ...(model as Post)?.imageParams,
          }}
        />
      )
    }

    return (
      <WImage
        bg={'gray.50'}
        src={media}
        alt={title}
        hasZoom
        objectFit="contain"
        sizes="(max-width: 480) 80vw, 33vw"
      />
    )
  }

  return (
    <Box
      maxH={{ base: 300, lg: 'full' }}
      rounded={'md'}
      pos={'relative'}
      overflow="hidden"
    >
      {renderMedia()}
      {isEditing && media && !isChangingMedia && (
        <Center
          pos="absolute"
          top={0}
          left={0}
          boxSize="full"
          bg="blackAlpha.500"
          onClick={toggleChangingMedia}
          cursor="pointer"
        >
          <Button
            leftIcon={<IoMdCloudUpload />}
            size="lg"
            colorScheme={'blackAlpha'}
          >
            {name === 'video' ? 'Change video' : 'Change image'}
          </Button>
        </Center>
      )}
    </Box>
  )
}
