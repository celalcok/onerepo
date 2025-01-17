import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ObjectSchema } from 'yup'

import { toastMessage } from '@fc/utils/toastMessage'

import { resetPasswordSchema } from './schema'
import { ResetPasswordFieldValues } from './types'
import { FormItem } from '../FormItem'

export const ResetPasswordForm = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { code } = router.query

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFieldValues>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(
      resetPasswordSchema(t) as ObjectSchema<ResetPasswordFieldValues>,
    ),
    mode: 'all',
  })

  const { mutate, isPending } = useMutation<
    unknown,
    unknown,
    ResetPasswordFieldValues
  >({
    mutationKey: ['reset-password'],
    mutationFn: (data: ResetPasswordFieldValues) =>
      axios.post('/api/auth/reset-password', {
        code,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }),
    onSuccess: () => {
      toastMessage(null, t('reset-pass.text'), 'success')
      reset()
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    },
    onError: () => {
      toastMessage(t('error'), null, 'error')
      setTimeout(() => {
        reset()
      }, 2000)
    },
  })

  const onSubmit: SubmitHandler<ResetPasswordFieldValues> = data => {
    mutate(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
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
            <Heading>{t('reset-pass.title')}</Heading>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormItem
              id="password"
              type="password"
              autoComplete="current-password"
              register={register}
              errors={errors}
              name="password"
            />
            <FormItem
              id="passwordConfirmation"
              type="password"
              label={t('login.password.password-confirm') as string}
              placeholder={t('login.password.password-confirm') as string}
              autoComplete="current-password"
              register={register}
              errors={errors}
              name="passwordConfirmation"
            />
          </Stack>
          <Stack spacing="6">
            <Button type="submit" isLoading={isPending}>
              {t('submit')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
