'use client'

import ReactStars from 'react-stars'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function ReviewCard() {
	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					<AvatarImage
						src={
							'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FmhvJXIm9QuykyIp3bm4Q&w=3840&q=75'
						}
					/>
					<AvatarFallback className='uppercase'>SB</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div>John Doe</div>
					<div className='flex items-center gap-1'>
						<ReactStars value={4.5} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>5 minut oldin</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>Kurs prosta bomba 🔥</div>
		</div>
	)
}

export default ReviewCard
