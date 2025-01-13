import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
	apiVersion: '2024-12-18.acacia',
})

export default stripe
