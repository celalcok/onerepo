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

import { useAuthContext } from '@wsvvrijheid/context'

import { SignupFormFieldValues, SignupFormProps } from './types'
import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { SocialLoginButtons } from '../SocialLoginButtons'

const schema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('login.name.required') as string),
    username: yup.string().required(t('login.username.required') as string),
    password: yup
      .string()
      .min(8, t('login.password.warning', { count: 8 }) as string)
      .required(t('login.password.required') as string)
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
    email: yup
      .string()
      .email(t('contact.form.email-invalid') as string)
      .required(t('login.email.required') as string),
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
    onSuccess: async data => {
      if (data.error) {
        return setErrorMessage(data.error)
      }
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
            <Heading>{t('login.sign-up-header.title')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.sign-up-header.text')}</Text>

              <Button as={Navigate} href="/login" variant="link">
                {t('login.sign-up-header.button')}
              </Button>
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
              label={t('login.name.title') as string}
              register={register}
              errors={errors}
            />
            <FormItem
              name="username"
              label={t('login.username.title') as string}
              register={register}
              errors={errors}
            />
            <FormItem
              name="email"
              type="email"
              label={t('login.email.title') as string}
              register={register}
              errors={errors}
            />
            <FormItem
              name="password"
              type="password"
              label={t('login.password.title') as string}
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
              <Navigate href="/terms">
                <Button variant="link" colorScheme="gray" size="sm">
                  {t('login.terms-use')}
                </Button>
              </Navigate>
            </HStack>
          </Stack>
          <Stack spacing="6">
            <Button type="submit" disabled={!isTermsAccepted}>
              {t('login.create-account')}
            </Button>
            {providersToBeShown.length > 0 && (
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t('login.sign-up-with')}
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