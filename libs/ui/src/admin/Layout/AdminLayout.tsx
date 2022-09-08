import { FC, ReactNode } from 'react'

import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import axios from 'axios'
import { useRouter } from 'next/router'
import { MdOutlineNotifications } from 'react-icons/md'

import { AdminSidebar } from '../AdminSidebar'
import { PageHeader, PageHeaderProps } from '../PageHeader'

export type AdminLayoutProps = {
  children: ReactNode
  isLoading?: boolean
  title: string
  user: SessionUser
  headerProps?: PageHeaderProps
}

export const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  isLoading,
  title,
  user,
  headerProps,
}) => {
  const router = useRouter()

  const handleLogout = async () => {
    axios.post('/api/auth/logout').then(() => {
      router.push('/login')
    })
  }

  // Loading indicator when we are fetching user data on the client
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box bg="gray.50">
      {/* Sidebar */}
      <Box pos="fixed" zIndex="sticky" top={0} left={0} h="100vh" w={300}>
        {user && <AdminSidebar user={user} onLogout={handleLogout} />}
      </Box>

      <Stack
        as="main"
        ml={300}
        spacing={4}
        minH="100vh"
        h="200vh"
        overflow="auto"
      >
        {/* Title */}
        <HStack px={4} mt={12} justify="space-between">
          <Heading>{title}</Heading>

          {/* TODO Create notification component */}
          <IconButton
            aria-label="notifications"
            icon={<MdOutlineNotifications />}
            variant="outline"
            rounded="full"
          />
        </HStack>

        {/* Page Content */}
        <Box pos="sticky" top={0} zIndex={1}>
          {headerProps && <PageHeader defaultLocale="tr" {...headerProps} />}
        </Box>

        <Box px={4}>{children}</Box>
      </Stack>
    </Box>
  )
}
