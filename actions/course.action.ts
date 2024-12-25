'use server'
import { GetCoursesParams, ICreateCourse } from './types.d'

import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

import { ICourse } from '@/app.types'
import User from '@/database/user.model'
import { cache } from 'react'

export const createCourse = async (data: ICreateCourse, clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		await Course.create({ ...data, instructor: user._id })
		revalidatePath('/en/instructor/my-courses')
	} catch (error) {
		throw new Error('Something went wrong while creating course!')
	}
}

export const getCourses = async (params: GetCoursesParams) => {
	try {
		await connectToDatabase()
		const { clerkId, page = 1, pageSize = 3 } = params
		const skipAmount = (page - 1) * pageSize
		const user = await User.findOne({ clerkId })
		const { _id } = user
		const courses = await Course.find({ instructor: _id })
			.skip(skipAmount)
			.limit(pageSize)

		const totolCources = await Course.find({ instructor: _id }).countDocuments()
		const isNext = totolCources > skipAmount + courses.length
		return { isNext, totolCources, courses }
	} catch (error) {
		throw new Error('Something went wrong while getting course!')
	}
}

export const getCourseById = async (id: string) => {
	try {
		await connectToDatabase()
		const course = await Course.findById(id)
		return course as ICourse
	} catch (error) {
		throw new Error('Something went wrong while getting by ID course!')
	}
}

export const updateCourse = async (
	id: string,
	updateData: Partial<ICourse>,
	path: string
) => {
	try {
		await connectToDatabase()
		await Course.findByIdAndUpdate(id, updateData)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong while updating course!')
	}
}

export const deleteCourse = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Course.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong while deleting course!')
	}
}

export const getFeaturedCourses = cache(async () => {
	try {
		await connectToDatabase()
		const courses = await Course.find({ published: true })
			.limit(6)
			.sort({ createdAt: -1 })
			.select('previewImage title slug oldPrice currentPrice instructor')
			.populate({
				path: 'instructor',
				select: 'fullName picture',
				model: User,
			})

		return courses
	} catch (error) {
		throw new Error('Something went wrong while getting featured courses!')
	}
})

// export const getDetailedCourse = cache(async (id: string) => {
// 	try {
// 		await connectToDatabase()

// 		const course = await Course.findById(id)
// 			.select(
// 				'title description instructor previewImage oldPrice currentPrice learning requirements tags updatedAt level category language'
// 			)
// 			.populate({
// 				path: 'instructor',
// 				select: 'fullName picture',
// 				model: User,
// 			})

// 		const sections = await Section.find({ course: id }).populate({
// 			path: 'lessons',
// 			model: Lesson,
// 		})

// 		const totalLessons: ILesson[] = sections
// 			.map(section => section.lessons)
// 			.flat()

// 		const data = {
// 			...course._doc,
// 			totalLessons: totalLessons.length,
// 			totalSections: sections.length,
// 			totalDuration: calculateTotalDuration(totalLessons),
// 		}

// 		return data
// 	} catch (error) {
// 		throw new Error('Something went wrong while getting detailed course!')
// 	}
// })
