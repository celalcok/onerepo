import React, { FC } from 'react'

import {
  HStack,
  Tooltip,
  IconButton,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineNotifications } from 'react-icons/md'

import { useAuthContext } from '@wsvvrijheid/context'

import { Navigate } from '../../components'
import { AdminSidebar } from '../AdminSidebar'
import { CreateModelButton } from '../CreateModelButton'
import { LanguageSwitcher } from '../LanguageSwitcher'

type AdminHeaderProps = {
  hasBackButton?: boolean
  title?: string
}

export const AdminHeader: FC<AdminHeaderProps> = ({ hasBackButton, title }) => {
  const { user } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        {!hasBackButton && title && (
          <Heading size={{ base: 'lg', lg: 'xl' }} isTruncated>
            {title}
          </Heading>
        )}
      </HStack>

      {/* TODO Create notification component */}
      <HStack flexShrink={0}>
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
          <Navigate href={'/login'}>
            <Button colorScheme={'blue'} leftIcon={<FaUser />} rounded={'full'}>
              Login
            </Button>
          </Navigate>
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
      </HStack>
    </HStack>
  )
}
