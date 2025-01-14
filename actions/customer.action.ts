'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'

export const createCustomer = async (userId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findById(userId).select('email fullName')
		const { email, fullName } = user

		const customer = await stripe.customers.create({
			email,
			name: fullName,
			metadata: { userId },
		})

		await User.findByIdAndUpdate(userId, { customerId: customer.id })

		return customer
	} catch (error) {
		throw new Error("Couldn't create customer")
	}
}

export const getCustomer = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('customerId')
		const { _id, customerId } = user

		if (!customerId) return await createCustomer(_id)

		return await stripe.customers.retrieve(customerId)
	} catch (error) {
		throw new Error("Couldn't get customer details")
	}
}

export const atachPayment = async (paymentMethod: string, customer: string) => {
	try {
		return await stripe.paymentMethods.attach(paymentMethod, { customer })
	} catch (error) {
		throw new Error("Couldn't attach payment method")
	}
}

export const getCustomerCards = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const customer = await getCustomer(clerkId)

		const paymentMethods = await stripe.paymentMethods.list({
			customer: customer.id,
			type: 'card',
			limit: 10,
		})

		return paymentMethods.data
	} catch (error) {
		throw new Error("Couldn't retrieve cards")
	}
}
