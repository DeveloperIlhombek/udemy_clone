import TopBar from '@/components/shared/top-bar'
import { Separator } from '@/components/ui/separator'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { courses } from '@/constants'
import CourseCard from '@/components/cards/course.card'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import Hero from './_components/hero'
import Overview from './_components/overview'
import Description from './_components/description'

async function Page({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)

	return (
		<>
			<TopBar label='allCourses' extra='Full Courses ReactJS' />

			<div className='container mx-auto max-w-6xl'>
				<div className='grid grid-cols-3 gap-4 pt-12'>
					<div className='col-span-2 max-lg:col-span-3'>
						<Hero />
						<Overview />
					</div>
					<div className='col-span-1 max-lg:col-span-3'>
						<Description />
					</div>
				</div>

				<Separator className='my-12' />

				<h1 className='font-space-grotesk text-4xl font-bold'>
					{t('youMayLike')}
				</h1>

				<Carousel opts={{ align: 'start' }} className='mt-6 w-full'>
					<CarouselContent className='w-full'>
						{courses.map(course => (
							<CarouselItem
								key={course.title}
								className='md:basis-1/2 lg:basis-1/3'
							>
								<CourseCard {...course} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</>
	)
}

export default Page
