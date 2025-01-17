import { FC, useEffect, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '@fc/context/auth'

import { SignupFormFieldValues, SignupFormProps } from './types'
import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'
import { SocialLoginButtons } from '../SocialLoginButtons'

const schema = (t: TFunction) =>
  yup.object({
    name: yup
      .string()
      .min(3)
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed')
      .required(),
    username: yup.string().min(3).required(),
    password: yup
      .string()
      .min(8, t('login.password.warning', { count: 8 }) as string)
      .required()
      .matches(
        RegExp('(.*[a-z].*)'),
        t('login.password.matches.lowercase') as string,
      )
      .matches(
        RegExp('(.*[A-Z].*)'),
        t('login.password.matches.uppercase') as string,
      )
      .matches(
        RegExp('(.*\\d.*)'),
        t('login.password.matches.number') as string,
      ),
    email: yup.string().email().required(),
  })

export const SignupForm: FC<SignupFormProps> = ({
  providersToBeShown = [],
}) => {
  const { t } = useTranslation()
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const router = useRouter()
  const { register: registerAuth, error } = useAuthContext()

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])

  const signupMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: SignupFormFieldValues) =>
      registerAuth(body.email, body.password, body.username, body.name),
    onSuccess: async () => {
      router.push('/')
    },
  })

  const handleSubmitSignUp: SubmitHandler<
    SignupFormFieldValues
  > = async data => {
    signupMutation.mutate(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '8', md: '16' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack
        spacing="8"
        shadow="base"
        bg="white"
        p={{ base: 8, lg: 12 }}
        rounded="lg"
      >
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading>{t('login.create-account')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.have-account')}</Text>

              <ButtonLink
                data-testid="link-login"
                href="/auth/login"
                variant="link"
              >
                {t('login.signin')}
              </ButtonLink>
            </HStack>
          </Stack>
        </Stack>
        <Stack
          spacing="6"
          as="form"
          onSubmit={handleSubmit(handleSubmitSignUp)}
        >
          <Stack spacing="5">
            {errorMessage && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <FormItem
              name="name"
              autoComplete="name"
              register={register}
              errors={errors}
            />
            <FormItem
              name="username"
              autoComplete="username"
              register={register}
              errors={errors}
            />
            <FormItem
              name="email"
              type="email"
              autoComplete="email"
              register={register}
              errors={errors}
            />
            <FormItem
              name="password"
              type="password"
              autoComplete="current-password"
              register={register}
              errors={errors}
            />

            <HStack>
              {/* TODO Set session exp time */}
              <Checkbox
                defaultChecked
                onChange={e => setIsTermsAccepted(e.target.checked)}
              />

              <ButtonLink
                href="/auth/terms"
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
                colorScheme="gray"
                size="sm"
              >
                {t('login.terms-use')}
              </ButtonLink>
            </HStack>
          </Stack>
          <Stack spacing="6">
            <Button
              data-testid="button-register"
              type="submit"
              disabled={!isTermsAccepted}
            >
              {t('login.create-account')}
            </Button>
            {providersToBeShown.length > 0 && (
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t('login.with')}
                </Text>
                <Divider />
              </HStack>
            )}
            <SocialLoginButtons
              providersToBeShown={providersToBeShown}
              isDisabled={!isTermsAccepted}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
