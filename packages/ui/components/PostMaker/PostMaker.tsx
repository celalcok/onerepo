import { FC } from 'react'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react'

import { useHashtagBySlug } from '@fc/services/hashtag/getHashtagBySlug'

import { PostSentenceRefDrawer } from './PostSentenceRefDrawer'
import { useHashtagContext } from '../HashtagProvider'
import { HashtagStats } from '../HashtagStats'
import { MentionList } from '../MentionList'
import { PostMakerTweetList } from '../PostMakerTweetCard'
import { TimelineTrendsTabs } from '../TimelineTrendsTabs'
import { TrendTabs } from '../TrendTabs'

type PostMakerProps = {
  isIosSafari?: boolean
}

export const PostMaker: FC<PostMakerProps> = ({ isIosSafari }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true

  const { mentionsDisclosure, trendsDisclosure, archiveDisclosure } =
    useHashtagContext()

  const hashtag = useHashtagBySlug()

  if (!hashtag) return null

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={!isMobile && mentionsDisclosure.isOpen}
        onClose={mentionsDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <MentionList />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={true}
        isOpen={!isMobile && trendsDisclosure.isOpen}
        onClose={trendsDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <TrendTabs />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={archiveDisclosure.isOpen}
        onClose={archiveDisclosure.onClose}
        placement="right"
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody background={'gray.50'} p={4}>
            <PostSentenceRefDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isMobile && mentionsDisclosure.isOpen}
        onClose={mentionsDisclosure.onClose}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <MentionList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isMobile && trendsDisclosure.isOpen}
        onClose={trendsDisclosure.onClose}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <TrendTabs />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Grid
        gap={2}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 'calc(100vh - 130px)' }}
        alignItems="stretch"
      >
        <Box order={{ base: 1, lg: 0 }} h="inherit">
          <HashtagStats />
        </Box>
        {/* TODO: Skeleton */}
        {hashtag.posts ? (
          <Box order={{ base: 0, lg: 1 }} h={'inherit'} overflowY={'auto'}>
            <PostMakerTweetList
              posts={hashtag.posts}
              isIosSafari={Boolean(isIosSafari)}
            />
          </Box>
        ) : (
          <Skeleton />
        )}

        <Box order={{ base: 2, lg: 2 }} h={'inherit'} overflowY={'auto'}>
          <TimelineTrendsTabs />
        </Box>
      </Grid>
    </>
  )
}
