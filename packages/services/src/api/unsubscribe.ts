import type { NextApiRequest, NextApiResponse } from 'next'

import { API_URL } from '@fc/config'
import { strapiRequest } from '@fc/lib';
import { Subscriber } from '@fc/types';

// Deletes subscription data from the server
export const unsubscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {

  const { subscription } = JSON.parse(req.body)
  const subEndpoint  = subscription.endpoint

  try {
    const subscriber = await strapiRequest<Subscriber>({
        endpoint: "subscribers",
        filters: { subscription: { endpoint: { $eq: subEndpoint } } } ,
    })
    
    // console.log("subscriber from Strapi's response: ", subscriber)
    const filteredSub = subscriber.data.filter(sub => sub.subscription?.endpoint === subEndpoint)
    const filteredSubId = filteredSub[0].id
    
    // Todo (improvement): save subscription object's id from push service's response and use it below 
    const res = await fetch(`${API_URL}/api/subscribers/${filteredSubId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('Error from Strapi: ', error)
      throw new Error('Failed to delete subscription from Strapi')
    }
  } catch (error) {
    console.error('ERROR: ', error)
  }

  res.status(201).json({ message: 'Subscription deleted successfully' })
}
