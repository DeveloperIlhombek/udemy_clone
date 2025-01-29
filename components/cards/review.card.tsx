'use client'

import ReactStars from 'react-stars'
import { Avatar } from '../ui/avatar'
import { IReview } from '@/app.types'
import { formatDistanceToNow } from 'date-fns'
import { getTimeLocale } from '@/lib/utils'
import { useParams } from 'next/navigation'
import useTranslate from '@/hooks/use-translate'

function ReviewCard({ review }: { review: IReview }) {
	const { lng } = useParams()
	const t = useTranslate()

	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					{/* <AvatarImage src={review.user.picture} /> */}
					{/* <AvatarFallback className='uppercase'>
						{review.user.fullName[0]}
					</AvatarFallback> */}
					<h1>I</h1>
				</Avatar>

				<div className='flex flex-col'>
					{/* <div>{review.user.fullName}</div> */}
					<div>Ilhom</div>
					<div className='flex items-center gap-1'>
						<ReactStars value={review.rating} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>
							{formatDistanceToNow(new Date(review.createdAt), {
								locale: getTimeLocale(`${lng}`),
							})}{' '}
							{t('ago')}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>{review.data}</div>
		</div>
	)
}

export default ReviewCard
