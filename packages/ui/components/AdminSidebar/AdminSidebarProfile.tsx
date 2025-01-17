import { FC } from 'react'

import { Box, HStack, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'

import type { Profile, SessionUser } from '@fc/types'

import { WAvatar } from '../WAvatar'

type AdminSidebarProfileProps = {
  user: SessionUser
  profile: Profile | null
  onLogout: () => void
}

export const AdminSidebarProfile: FC<AdminSidebarProfileProps> = ({
  user,
  profile,
  onLogout,
}) => {
  return (
    <HStack p={4}>
      <WAvatar size="sm" src={profile?.avatar} name={user?.username} />

      <Box flex={1} fontSize="sm" lineHeight={1.25}>
        <Text w={160} noOfLines={1} fontWeight={600} data-testid="profile-name">
          {profile?.name || user?.username}
        </Text>
        <Text
          w={160}
          noOfLines={1}
          textTransform={'capitalize'}
          data-testid="profile-roles"
        >
          {user?.roles.join(' - ')}
        </Text>
      </Box>

      <Tooltip label="Logout" bg="white" color="initial">
        <IconButton
          data-testid="button-logout"
          size="sm"
          fontSize="lg"
          _hover={{ color: 'red.500' }}
          aria-label="Logout"
          icon={<GoSignOut />}
          variant="ghost"
          onClick={onLogout}
        />
      </Tooltip>
    </HStack>
  )
}
