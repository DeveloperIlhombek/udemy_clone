'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreateLesson, ILessonFields, IUpdatePosition } from './types'
import Section from '@/database/section.model'
import Lesson from '@/database/lesson.model'
import { revalidatePath } from 'next/cache'

export const getLessons = async (section: string) => {
	try {
		await connectToDatabase()
		return await Lesson.find({ section }).sort({ position: 1 })
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

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

export const deleteLesson = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		const lesson = await Lesson.findById(id)
		const section = await Section.findById(lesson.section)
		section.lessons.pull(id)
		section.save()
		await Lesson.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const editLesson = async (
	lesson: ILessonFields,
	lessonId: string,
	path: string
) => {
	try {
		await connectToDatabase()
		const duration = {
			hours: Number(lesson.hours),
			minutes: Number(lesson.minutes),
			seconds: Number(lesson.seconds),
		}

		await Lesson.findByIdAndUpdate(lessonId, { ...lesson, duration })
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const editLessonPosition = async (params: IUpdatePosition) => {
	try {
		await connectToDatabase()
		const { lists, path } = params
		for (const item of lists) {
			await Lesson.findByIdAndUpdate(item._id, { position: item.position })
		}

		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}
