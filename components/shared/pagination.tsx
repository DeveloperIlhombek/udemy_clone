'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'

interface Props {
	pageNumber: number
	isNext: boolean
}

function Pagination({ isNext, pageNumber }: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onNavigate = (direction: 'prev' | 'next') => {
		const nextPageNumber =
			direction === 'prev' ? pageNumber - 1 : pageNumber + 1
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'page',
			value: nextPageNumber.toString(),
		})
		router.push(newUrl)
	}

	if (!isNext && pageNumber === 1) return null
	return (
		<div className='flex w-full items-center justify-center gap-2'>
			<Button onClick={() => onNavigate('prev')} disabled={pageNumber === 1}>
				Prev
			</Button>
			<div className='flex items-center justify-center'>{pageNumber}</div>
			<Button onClick={() => onNavigate('next')} disabled={!isNext}>
				Next
			</Button>
		</div>
	)
}

export default Pagination
