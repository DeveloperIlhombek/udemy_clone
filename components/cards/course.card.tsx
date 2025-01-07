import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { ICourse } from '@/app.types'

function CourseCard(course: ICourse) {
	return (
		<Link href={`/course/${course._id}`}>
			<Card className='group w-full'>
				<CardContent className='relative h-56 w-full'>
					<Image
						fill
						src={course.previewImage}
						alt={course.title}
						className='object-cover'
					/>
				</CardContent>
				<div className='my-4 flex flex-col space-y-2 px-2'>
					<h2 className='line-clamp-1 font-space-grotesk text-2xl font-bold'>
						{course.title}
					</h2>
					<Separator />
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Image
								src={course.instructor.picture}
								alt={course.instructor.fullName}
								width={40}
								height={40}
								className='rounded-full object-cover'
							/>
							<p className='text-sm text-muted-foreground'>
								{course.instructor.fullName}
							</p>
						</div>

						<div className='flex gap-2'>
							<div className='self-start font-space-grotesk text-xs text-muted-foreground line-through'>
								{course.oldPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</div>
							<div className='font-space-grotesk text-sm font-bold'>
								{course.currentPrice.toLocaleString('en-US', {
									currency: 'USD',
									style: 'currency',
								})}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}

export default CourseCard
