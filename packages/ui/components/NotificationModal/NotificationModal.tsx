import { useEffect } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useCookie } from 'react-use'

import { useAuthContext } from '@fc/context/auth'
import { useWebPushContext } from '@fc/context/webPush'
import { useSubscribePushNotificationMutation } from '@fc/services/pushNotification/subscribePushNotification'
import { CookieKey } from '@fc/types'

export const NotificationModal = () => {
  const { t } = useTranslation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, site } = useAuthContext()
  const { isSubscribed, isSupported } = useWebPushContext()
  const toast = useToast()

  const [cookieNotification, updateCookieNotification] = useCookie(
    CookieKey.PUSH_NOTIFICATIONS_SUBSCRIBED,
  )

  const subscribePushNotificationMutation =
    useSubscribePushNotificationMutation()

  const handleSubscribe = async () => {
    if (Notification.permission === 'denied') {
      toast({
        title: 'Notifications are blocked',
        description:
          'Please enable notifications in your browser settings to receive notifications.',
        status: 'warning',
        duration: 10000,
        isClosable: true,
      })

      return
    }

    subscribePushNotificationMutation.mutateAsync(undefined, {
      onSuccess: () => {
        updateCookieNotification('true')
        onClose()
      },
      // TODO: Show toast notification
      onError: () => {},
    })
  }

  useEffect(() => {
    // Show dashboard notification modal only if user is logged in
    if (site === 'dashboard' && !user) {
      return
    }

    if (!isSubscribed && isSupported && cookieNotification !== 'true') {
      const timer = setTimeout(() => {
        onOpen()
      }, 3000)

      // Clean-up on depend. change
      return () => clearTimeout(timer)
    }
  }, [isSubscribed, isSupported, user, site, cookieNotification, onOpen])

  const handleClose = () => {
    onClose()

    // TODO: Set a cookie to prevent showing the modal again
    // Maybe a timeout of 1 week
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('never-miss-events')}</ModalHeader>
          <ModalCloseButton data-testid="button-close-notification-modal" />
          <ModalBody>
            <Stack>
              <Text>{t('sub-to-notifications')}</Text>
              <Text fontSize="sm" color="red">
                {t('sub-notifications-mobile-warning')}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              data-testid="button-close-notification"
              colorScheme="gray"
              mr={3}
              onClick={handleClose}
            >
              {t('close')}
            </Button>
            <Button
              data-testid="button-subscribe-notification"
              colorScheme="primary"
              isLoading={subscribePushNotificationMutation.isPending}
              onClick={handleSubscribe}
            >
              {t('subscribe')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
