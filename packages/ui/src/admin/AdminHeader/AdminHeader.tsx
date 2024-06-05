import { FC } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineNotifications } from 'react-icons/md'

import { useAuthContext } from '@fc/context'

import { ProfilePanel, UserFeedback } from '../../components'
import { AdminSidebar } from '../AdminSidebar'
import { CreateModelButton } from '../CreateModelButton'
import { LanguageSwitcher } from '../LanguageSwitcher'

type AdminHeaderProps = {
  hasBackButton?: boolean
  title?: string
}

export const AdminHeader: FC<AdminHeaderProps> = ({ hasBackButton, title }) => {
  const { user, openAuthModal, isLoading } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure()
  const { t } = useTranslation()
  const router = useRouter()
  const slugs = router.asPath.split('/')
  const parentSlug = slugs.slice(0, slugs.length - 1).join('/')

  return (
    <HStack
      px={4}
      justify="space-between"
      h={20}
      w={'full'}
      overflow={'hidden'}
    >
      <HStack minW={0}>
        {hasBackButton && (
          <Tooltip label={'Go back'}>
            <IconButton
              aria-label="back"
              icon={<FaArrowLeft />}
              rounded="full"
              onClick={() => router.push(`/${parentSlug}`)}
            />
          </Tooltip>
        )}
        {!isLoading && !hasBackButton && title && (
          <Heading size={{ base: 'lg', lg: 'xl' }} isTruncated>
            {title}
          </Heading>
        )}
        {isLoading && !title && <Skeleton noOfLines={1} w={40} />}
      </HStack>

      {/* TODO Create notification component */}
      <HStack flexShrink={0}>
        {user && (
          <>
            <IconButton
              aria-label="profile"
              icon={<FaGear />}
              variant="outline"
              rounded="full"
              colorScheme={'gray'}
              onClick={onOpenProfile}
            />
            <Modal
              isOpen={isOpenProfile}
              onClose={onCloseProfile}
              size={'5xl'}
              scrollBehavior={'inside'}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t('profile.modal.header')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ProfilePanel />
                </ModalBody>
                <ModalFooter>
                  <HStack
                    bg={'primary.400'}
                    height={30}
                    width={'100%'}
                  ></HStack>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
        {user && (
          <IconButton
            aria-label="notifications"
            icon={<MdOutlineNotifications />}
            variant="outline"
            rounded="full"
            colorScheme={'gray'}
          />
        )}
        <LanguageSwitcher responsive />
        <CreateModelButton />
        {!user && (
          <Button
            onClick={openAuthModal}
            colorScheme={'blue'}
            leftIcon={<FaUser />}
            rounded={'full'}
            isLoading={isLoading}
          >
            Login
          </Button>
        )}
        <IconButton
          aria-label="Open Menu"
          icon={<HiMenu />}
          variant="outline"
          colorScheme="gray"
          rounded={'full'}
          display={{ base: 'flex', lg: 'none' }}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody px={0}>
              <AdminSidebar mobile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <UserFeedback />
      </HStack>
    </HStack>
  )
}
