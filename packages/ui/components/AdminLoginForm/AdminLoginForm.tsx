import { useState } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Box, Button, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthContext } from '@fc/context/auth'

import { adminLoginSchema } from './schema'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { FormItem } from '../FormItem'
import { LoginFormFieldValues } from '../LoginForm'
import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'

export const AdminLoginForm = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormFieldValues>({
    resolver: yupResolver(adminLoginSchema),
    mode: 'all',
  })

  const [isRedirecting, setIsRedirecting] = useState(false)

  const { isLoading: isAuthLoading, login, checkAuth } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data, {
      onError: e => console.error('Login error', e),
      onSuccess: async () => {
        checkAuth()
        setIsRedirecting(true)
        reset()
        await router.push('/')
        setIsRedirecting(false)
      },
    })
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
      <Box pos="relative" h={{ base: 200, lg: 'full' }}>
        <WImage
          style={{ objectFit: 'cover' }}
          src={`/images/freedom-bird.jpeg`}
          alt={'admin'}
        />
      </Box>
      <Container maxW={{ base: 'full', lg: 300 }}>
        {/* right side (second container) */}
        <Stack
          h="full"
          w="full"
          textAlign="center"
          spacing={4}
          justify="center"
          pb={8}
          pt={{ base: 8, lg: '50%' }}
        >
          <Link href="/">
            <VStack textAlign="center" w={'full'}>
              <WAvatar size="2xl" src={`/images/foundation-logo.svg`} />

              <Text fontSize="xl" color={'blue.500'} fontWeight={900}>
                FREEDOM COMBINATION
              </Text>
            </VStack>
          </Link>

          <Stack spacing={4} flex={1}>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleSubmitSign)}
            >
              <FormItem
                w="full"
                name="identifier"
                register={register}
                errors={errors}
                autoComplete="username"
              />
              <FormItem
                w="full"
                name="password"
                type="password"
                autoComplete="current-password"
                register={register}
                errors={errors}
              />
              <Button
                data-testid="button-form-login"
                isLoading={isAuthLoading || isRedirecting}
                w="full"
                type="submit"
              >
                {t('login.signin')}
              </Button>
              {loginMutation.isError &&
                ((loginMutation.error as any)?.response?.data?.type ===
                'unauthorized' ? (
                  <Text
                    data-testid="error-login"
                    fontSize={'sm'}
                    color={'red.500'}
                  >
                    <Trans
                      i18nKey="login.error.unauthorized"
                      components={{
                        a: (
                          <Link
                            data-testid="contact-us-error"
                            isExternal
                            href={'https://freedomcombination.com/tr/contact'}
                            color="blue.500"
                          />
                        ),
                      }}
                    />
                  </Text>
                ) : (
                  <Text data-testid="error-login" color="red.500" fontSize="sm">
                    {(loginMutation.error as any)?.response?.data?.message ||
                      'An error occured'}
                  </Text>
                ))}
            </Stack>
            {/* TODO Set session exp time */}

            <ButtonLink href="/forgot-password" variant="link" size="sm">
              {t('forgot-pass.link')}
            </ButtonLink>
          </Stack>

          <Text fontSize={'xs'}>
            Freedom Combination &copy; {new Date().getFullYear()} All rights
            reserved
          </Text>
        </Stack>
      </Container>
    </SimpleGrid>
  )
}
