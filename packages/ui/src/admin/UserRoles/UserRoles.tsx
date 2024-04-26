import { useEffect, useState } from 'react'

import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { GroupBase, Select } from 'chakra-react-select'
import { useLocalStorage } from 'react-use'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { SimpleRole } from '@fc/types/src/permissions'
import { extractEndpointNames } from '@fc/utils'

import { PermissionCard } from '../PermissionCard'

type RoleOption = {
  label: string
  value: number
}

type EndpointOption = {
  label: string
  value: string
}

export const UserRoles = () => {
  const [roles, setRoles] = useState<SimpleRole[] | null>(null)
  const [endpoints, setEndpoints] = useState<string[] | null>(null)
  const [roleFilter, setRoleFilter] = useLocalStorage<RoleOption[]>(
    'role-filter',
    [],
  )
  const [endpointFilter, setEndpointFilter] = useLocalStorage<EndpointOption[]>(
    'endpoint-filter',
    [],
  )
  const { token } = useAuthContext()

  useEffect(() => {
    if (!token) return
    const fetchRoles = async () => {
      const response = await fetch(API_URL + '/api/profiles/roles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const jsonData = await response.json()
      const list = jsonData.data

      setRoles(list)
      setEndpoints(extractEndpointNames(list[0]))
    }

    fetchRoles()
  }, [token])

  const filterRole = (r: SimpleRole) => {
    if (!roleFilter || roleFilter.length === 0) return true

    return roleFilter.some(role => role.value === r.id)
  }

  const updateRole = (r: SimpleRole) => {
    const oldRoles = roles?.filter(role => role.id !== r.id) ?? []
    setRoles([...oldRoles, r])
  }

  return (
    <VStack gap={6}>
      <SimpleGrid width={'100%'} gap={4} columns={{ base: 1, md: 2 }}>
        <VStack alignItems={'flex-start'} flex={1}>
          <Text fontWeight={'bold'}>Filter by role</Text>
          {roles && (
            <Select<RoleOption, boolean, GroupBase<RoleOption>>
              isMulti
              tagVariant="solid"
              closeMenuOnSelect={false}
              closeMenuOnScroll={true}
              defaultValue={roleFilter}
              placeholder={'Filter by role'}
              onChange={value =>
                setRoleFilter(Array.isArray(value) ? value : [value])
              }
              options={roles.map(role => ({
                label: role.name,
                value: role.id,
              }))}
            />
          )}
        </VStack>
        <VStack alignItems={'flex-end'}>
          <Text fontWeight={'bold'}>Filter by endpoint</Text>
          <HStack>
            {endpoints && (
              <Select<EndpointOption, boolean, GroupBase<EndpointOption>>
                isMulti
                tagVariant="solid"
                closeMenuOnSelect={false}
                closeMenuOnScroll={true}
                placeholder={'Filter by endpoint'}
                defaultValue={endpointFilter}
                onChange={value =>
                  setEndpointFilter(Array.isArray(value) ? value : [value])
                }
                options={endpoints.map(ep => ({
                  label: ep,
                  value: ep,
                }))}
              />
            )}
          </HStack>
        </VStack>
      </SimpleGrid>

      <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 3 }}>
        {roles
          ?.filter(filterRole)
          .map(role => (
            <PermissionCard
              key={role.id}
              role={role}
              setRole={updateRole}
              filteredEndpoints={endpointFilter?.map(ep => ep.value)}
            />
          ))}
      </SimpleGrid>
    </VStack>
  )
}
