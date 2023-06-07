import React, { FC, useState } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useRouter } from 'next/router'
import {  FaDownload } from 'react-icons/fa'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { useSearchModel } from '@wsvvrijheid/services'
import { Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'

import { Caps, WImage } from '../../components'

      
type DowloadCapsModalType={
  id:number
}

export const DowloadCapsModal: FC<DowloadCapsModalType> = ({id} ) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const { locale } = useRouter()

  const postsQuery = useSearchModel<Post>({
    url: 'api/posts',
    relationFilter: {
      parent: 'hashtag',
      ids: [id],
    },
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    publicationState: 'preview',
  })
  const handleClose = () => {
    onClose()
  }

  const postMedias =
    postsQuery?.data?.data
      ?.map(post => {
        const imageSrc = post.image?.url && ASSETS_URL + post.image?.url
        const title = post?.title
        const text = post?.description
        const capsSrc = post.caps?.url && ASSETS_URL + post.caps?.url
        const imageParams = post.imageParams && {
          image: imageSrc,
          title,
          text,
          ...post.imageParams,
        }
        const autoCapsSrc = imageParams && SITE_URL + getOgImageSrc(imageParams)

        return {
          imageSrc,
          capsSrc,
          autoCapsSrc,
          imageParams,
          title,
          text,
        }
      })
      .filter(Boolean) || []

  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [id])

  const onDownload = async () => {
    const zip = new JSZip()
    const imgFolder = zip.folder('hashtag-images')

    await Promise.all(
      postMedias.map(async (media, index) => {
        if (!media.capsSrc && !media.autoCapsSrc && !media.imageSrc) return

        const imageSrc = media.capsSrc || media.autoCapsSrc || media.imageSrc

        try {
          const response = await fetch(imageSrc, { mode: 'no-cors' })
          const blob = response && (await response.blob())

          if (!blob) return

          if (!blob.size) return

          imgFolder.file(`image-${index}.jpeg`, blob)
        } catch (error) {
          console.log('try error', error)
        }
      }),
    )

    const allImages = await zip.generateAsync({ type: 'blob' })

    saveAs(allImages)
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Download Caps
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={handleClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Download Caps</DrawerHeader>
          <DrawerBody>
            <Stack>
              {postMedias.map((media, index) => {
                if (media.capsSrc) {
                  return (
                    <WImage
                      key={index}
                      h={48}
                      src={media.capsSrc}
                      alt={'image'}
                    />
                  )
                }

                if (media.imageParams) {
                  return (
                    <Caps
                      key={index}
                      h={48}
                      imageParams={{
                        image: media.imageSrc,
                        title: media.title,
                        text: media.text,
                        ...media.imageParams,
                      }}
                    />
                  )
                }

                if (media.imageSrc) {
                  return (
                    <WImage
                      key={index}
                      h={48}
                      src={media.imageSrc}
                      alt={'image'}
                    />
                  )
                }
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme={'gray'}
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<FaDownload />}
              w={'full'}
              onClick={onDownload}
              colorScheme={'primary'}
            >
              Dowload Caps
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}