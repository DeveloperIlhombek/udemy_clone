'use client'

import { UserProfile } from '@clerk/nextjs'
import Header from '../_components/header'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

function Page() {
	const { resolvedTheme } = useTheme()

	return (
		<>
			<Header title='Settings' description='Manage your account settings' />

			<div className='mt-6'>
				<UserProfile
					appearance={{
						baseTheme: resolvedTheme === 'dark' ? dark : undefined,
						variables: {
							colorBackground: resolvedTheme === 'dark' ? '#020817' : '#fff',
						},
					}}
				/>
			</div>
		</>
	)
}

export default Page
