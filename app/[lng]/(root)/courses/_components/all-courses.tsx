'use client'

import CourseCard from '@/components/cards/course.card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { courses, filterCourses, filterLevels } from '@/constants'
import useTranslate from '@/hooks/use-translate'

function AllCourses() {
	const t = useTranslate()

	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'>
				<h2 className='max-md:self-end'>
					{t('result1')}{' '}
					<span className='font-space-grotesk font-bold'>250</span>{' '}
					{t('result2')}
				</h2>

				<div className='flex items-center gap-2'>
					<p>{t('sortBy')}</p>

					<Select>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('filter')} />
						</SelectTrigger>
						<SelectContent>
							{filterCourses.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className='w-[120px] bg-gradient-to-l from-secondary to-background'>
							<SelectValue placeholder={t('level')} />
						</SelectTrigger>
						<SelectContent>
							{filterLevels.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{courses.map((course, index) => (
					<CourseCard key={index} {...course} />
				))}
			</div>
		</div>
	)
}

export default AllCourses
