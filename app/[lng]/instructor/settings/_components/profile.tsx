'use client'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

function Profile() {
	const { resolvedTheme } = useTheme()
	return (
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
	)
}

export default Profile
