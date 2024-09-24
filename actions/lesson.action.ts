'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreateLesson } from './types'
import Section from '@/database/section.model'
import Lesson from '@/database/lesson.model'
import { revalidatePath } from 'next/cache'

export const createLesson = async (params: ICreateLesson) => {
	try {
		await connectToDatabase()
		const { lesson, section, path } = params
		const duration = {
			hours: Number(lesson.hours),
			minutes: Number(lesson.minutes),
			seconds: Number(lesson.seconds),
		}

		const existSection = await Section.findById(section)
		const position = existSection.lessons.length

		const newLesson = await Lesson.create({
			...lesson,
			position,
			duration,
			section,
		})
		existSection.lessons.push(newLesson._id)
		existSection.save()
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}
