import { useEffect, useState } from 'react'

import { WebPushSubscription } from '@fc/types'

export const useWebPush = (enable: boolean) => {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)

  const [subscription, setSubscription] = useState<WebPushSubscription | null>(
    null,
  )

  useEffect(() => {
    if (!enable) {
      return
    }

    const registerServiceWorker = async () => {
      if (!('serviceWorker' in navigator)) {
        console.error('Service worker or Push is not supported')

        return
      }

      const swRegistration = await navigator.serviceWorker.ready

      if (!swRegistration) {
        console.error('Service worker is not registered.')

        return
      }

      const pmSubscription =
        (await swRegistration.pushManager.getSubscription()) as WebPushSubscription | null

      // const isSubscriptionExpired = pmSubscription?.expirationTime
      //   ? Date.now() > pmSubscription.expirationTime - 5 * 60 * 1000
      //   : false

      if (pmSubscription) {
        setSubscription(pmSubscription)
      }

      setRegistration(swRegistration)
    }

    registerServiceWorker()
  }, [enable])

  return { registration, subscription, isSubscribed: !!subscription }
}
