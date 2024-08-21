'use client'

import { UserProfile } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

const UserProfilePage = () => {
	const { resolvedTheme } = useTheme()
	return (
		<div className='container mx-auto flex  items-center justify-center'>
			<UserProfile
				path='/user-profile'
				appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}
			/>
		</div>
	)
}

export default UserProfilePage
