import { MonitorPlay } from 'lucide-react'
import { PiStudent } from 'react-icons/pi'
import { GrMoney } from 'react-icons/gr'
import ReviewCard from '@/components/cards/review.card'
import StatisticsCard from '@/components/cards/statistics.card'
import Header from '../_components/header'
import { getCourses } from '@/actions/course.action'
import { auth } from '@clerk/nextjs'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
async function Page() {
	const { userId } = auth()
	const result = await getCourses({ clerkId: userId! })
	return (
		<>
			<Header title='Dashboard' description='Welcome to your dashboard' />

			<div className='mt-4 grid grid-cols-3 gap-4'>
				<StatisticsCard
					label='Total courses'
					value={result.totolCources.toString()}
					Icon={MonitorPlay}
				/>
				<StatisticsCard
					label='Total students'
					value='11.000'
					Icon={PiStudent}
				/>
				<StatisticsCard label='Total Sales' value='$190.00' Icon={GrMoney} />
			</div>

			<Header
				title='Latest courses'
				description='Here are your latest courses'
			/>

			<div className='mt-4 grid grid-cols-3 gap-4'>
				{result.courses.map(course => (
					<InstructorCourseCard key={course.title} course={course} />
				))}
			</div>

			<Header title='Reviews' description='Here are your latest reviews' />

			<div className='mt-4 grid grid-cols-3 gap-4'>
				<div className='rounded-md bg-background px-4 pb-4'>
					<ReviewCard />
				</div>
				<div className='rounded-md bg-background px-4 pb-4'>
					<ReviewCard />
				</div>
				<div className='rounded-md bg-background px-4 pb-4'>
					<ReviewCard />
				</div>
			</div>
		</>
	)
}

export default Page
