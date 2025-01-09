'use client'

import { ILesson } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Vimeo from '@vimeo/player'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { completeLesson, getNextLesson } from '@/actions/lesson.action'
import { toast } from 'sonner'

interface Props {
	lesson: ILesson
}
function VideoLesson({ lesson }: Props) {
	const [isLoading, setIsLoading] = useState(true)

	const vimeoPlayerRef = useRef<HTMLDivElement | null>(null)
	const { courseId } = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const { userId } = useAuth()
	const t = useTranslate()

	useEffect(() => {
		if (vimeoPlayerRef.current) {
			const player = new Vimeo(vimeoPlayerRef.current, {
				id: +lesson.videoUrl,
				responsive: true,
				autoplay: true,
			})

			player.ready().then(() => setIsLoading(false))

			player.on('ended', onEnd)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lesson, pathname])

	const onEnd = async () => {
		setIsLoading(true)

		const nextLesson = getNextLesson(lesson._id, `${courseId}`).then(res =>
			router.push(`/dashboard/${courseId}/${res?.lessonId}?s=${res?.sectionId}`)
		)
		const completed = completeLesson(lesson._id, userId!, pathname)

		const promise = Promise.all([nextLesson, completed])

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}

	return (
		<>
			{isLoading && (
				<div className='relative h-[20vh] w-full rounded-md bg-secondary sm:h-[30] md:h-[50vh] lg:h-[75vh]'>
					<Skeleton className='absolute right-0 top-0 flex size-full items-center justify-center rounded-md bg-slate-500/20'>
						<Loader2 className='size-6 animate-spin text-primary' />
					</Skeleton>
				</div>
			)}

			<div
				className={cn('max-md:sticky top-[10vh] z-50', isLoading && 'hidden')}
				ref={vimeoPlayerRef}
			/>

			<div className='mt-4 flex flex-col gap-2 rounded-md bg-gradient-to-t from-background to-secondary p-4 md:flex-row md:items-center md:justify-between lg:p-6'>
				<h2 className='mt-4 font-space-grotesk text-2xl font-bold'>
					{lesson.title}
				</h2>
				<Button disabled={isLoading} onClick={onEnd}>
					<span className='pr-2'>{t('completeLesson')}</span>
					<CheckCircle size={18} />
				</Button>
			</div>
		</>
	)
}

export default VideoLesson
