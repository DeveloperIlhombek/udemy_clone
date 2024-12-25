import Categories from './_components/categories'
import FeaturedCourses from './_components/featured-courses'
import Hero from './_components/hero'
import Instructor from './_components/instructor'
import LearningJourney from './_components/learning-journey'
import { getFeaturedCourses } from '@/actions/course.action'
async function Page() {
	const coursesJSON = await getFeaturedCourses()
	const courses = JSON.parse(JSON.stringify(coursesJSON))

	return (
		<>
			<Hero />
			<FeaturedCourses courses={courses} />
			<Categories />
			<Instructor />
			<LearningJourney />
		</>
	)
}

export default Page
