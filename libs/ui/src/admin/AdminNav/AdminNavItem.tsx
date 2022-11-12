import { FC, useEffect } from 'react'

import { chakra, Button, useBoolean, Collapse, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoChevronDown } from 'react-icons/go'

import { Navigate } from '../../components'
import { AdminNavItemProps } from './types'

export const AdminNavItem: FC<AdminNavItemProps> = ({
  label,
  link,
  submenu,
  icon,
}) => {
  const [open, setOpen] = useBoolean(false)
  const [openSub, setOpenSub] = useBoolean(false)
  const router = useRouter()
  const submenus = submenu?.flatMap(item => item.submenu)
  const isMenuLinkActive =
    router.asPath === link ||
    submenu?.some(item => item.link === router.asPath) ||
    submenus?.some(item => item?.link === router.asPath)

  useEffect(() => {
    if (isMenuLinkActive && submenu) {
      setOpen.on()
    }
  }, [isMenuLinkActive, setOpen, submenu])

  useEffect(() => {
    if (isMenuLinkActive && submenus) {
      setOpenSub.on()
    }
  }, [submenus])

  return (
    <Box w="full">
      <Navigate
        display="flex"
        _hover={{ color: 'primary.500', bg: 'blackAlpha.50' }}
        as={Button}
        href={link}
        px={4}
        leftIcon={icon}
        variant="ghost"
        rounded="0"
        w="full"
        {...(isMenuLinkActive && {
          color: 'primary.500',
          _hover: { color: 'primary.400', bg: 'blackAlpha.50' },
        })}
        {...(submenu && {
          onClick: setOpen.toggle,
          rightIcon: (
            <Box
              as={GoChevronDown}
              transition="all 0.2s"
              {...(open && {
                transform: 'rotate(180deg)',
              })}
            />
          ),
        })}
      >
        <chakra.span flex={1} textAlign="left">
          {label}
        </chakra.span>
      </Navigate>

      {/* Submenu */}
      {submenu && (
        <Collapse in={open}>
          {submenu?.map(item => {
            const isSubmenuLinkActive = router.asPath === item.link
            return (
              <Box>
                <Navigate
                  _hover={{ color: 'primary.500' }}
                  as={Button}
                  href={item.link}
                  justifyContent="start"
                  key={item.label}
                  leftIcon={item.icon}
                  ml={8}
                  px={2}
                  size="sm"
                  variant="ghost"
                  w="full"
                  {...(isSubmenuLinkActive && {
                    color: 'primary.500',
                    _hover: { color: 'primary.400' },
                  })}
                  {...(item?.submenu && {
                    onClick: setOpenSub.toggle,
                    rightIcon: (
                      <Box
                        as={GoChevronDown}
                        transition="all 0.2s"
                        {...(openSub && {
                          transform: 'rotate(180deg)',
                        })}
                      />
                    ),
                  })}
                >
                  {item.label}
                </Navigate>

                {item?.submenu && (
                  <Collapse in={openSub}>
                    {item?.submenu?.map(em => {
                      const isSubmenusSubmenuLinkActive =
                        router.asPath === em.link
                      return (
                        <Box>
                          <Navigate
                            _hover={{ color: 'primary.500' }}
                            as={Button}
                            href={em.link}
                            justifyContent="start"
                            key={em.label}
                            leftIcon={em.icon}
                            ml={16}
                            px={2}
                            size="sm"
                            variant="ghost"
                            w="full"
                            {...(isSubmenusSubmenuLinkActive && {
                              color: 'primary.500',
                              _hover: { color: 'primary.400' },
                            })}
                          >
                            {em.label}
                          </Navigate>
                        </Box>
                      )
                    })}
                  </Collapse>
                )}
              </Box>
            )
          })}
        </Collapse>
      )}
    </Box>
  )
}
