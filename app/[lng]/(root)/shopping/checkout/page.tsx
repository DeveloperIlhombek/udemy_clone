import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElement from './_components/checkout-element'
import { auth } from '@clerk/nextjs'
import { getCustomerCards } from '@/actions/customer.action'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)

	const cards = await getCustomerCards(userId!)

	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement cards={JSON.parse(JSON.stringify(cards))} />
		</>
	)
}

export default Page
