import { Mutation } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Donation, DonationUpdateInput, StrapiUrl } from '@wsvvrijheid/types'

export const donationWebhook = async (event: any) => {
  // check the checkout session status, if it's paid then update the donation status

  if (event?.data?.object?.object === 'checkout.session') {
    const status = event.data.object.payment_status
    const checkoutSessionId = event.data.object.id
    const donationId = event.data.object.success_url.split('&')[1].slice(3)

    // Update donation status and stripe fields in database
    await Mutation.put<Donation, DonationUpdateInput>(
      'api/donates',
      donationId,
      {
        status,
        checkoutSessionId: checkoutSessionId as string,
      },
      TOKEN as string,
    )
    // Send email to customer
    if (status === 'paid') {
      await Mutation.post(
        `api/donates/email/${donationId}` as StrapiUrl,
        {},
        TOKEN as string,
      )
    }
  }
}
