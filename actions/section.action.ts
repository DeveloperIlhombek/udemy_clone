'use server'

import Section from '@/database/section.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { IUpdateSection } from './types'

export const getSections = async (course: string) => {
	try {
		await connectToDatabase()
		return await Section.find({ course }).sort({ position: 1 })
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const createSection = async (
	course: string,
	title: string,
	path: string
) => {
	try {
		await connectToDatabase()
		const sections = await Section.find({ course })
		const position = sections.length + 1
		await Section.create({ course, title, position })
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const updateSection = async (params: IUpdateSection) => {
	try {
		await connectToDatabase()
		const { lists, path } = params
		for (const item of lists) {
			await Section.findByIdAndUpdate(item._id, { position: item.position })
		}
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const getSectionById = async (id: string) => {
	try {
		await connectToDatabase()
		return Section.findById(id)
	} catch (error) {
		throw new Error('Something went wrong')
	}
}

export const deleteSection = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Section.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong while delete section')
	}
}

export const updateSectionTitle = async (
	id: string,
	title: string,
	path: string
) => {
	try {
		await connectToDatabase()
		await Section.findByIdAndUpdate(id, { title })
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong while updating section title')
	}
}
