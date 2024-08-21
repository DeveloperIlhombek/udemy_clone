'use client'

import { createSection, updateSection } from '@/actions/section.action'
import { ICourse, ISection } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { sectionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgePlus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import SectionList from './section-list'
interface Props {
	course: ICourse
	section: ISection[]
}

function Sections({ course, section }: Props) {
	const { state, onToggle } = useToggleEdit()
	const pathname = usePathname()
	const [isLoading, setIsLoading] = useState(false)

	const onOrdered = (updateData: { _id: string; position: number }[]) => {
		setIsLoading(true)
		const promise = updateSection({
			lists: updateData,
			path: pathname,
		}).finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading ...',
			success: 'Successfully reordered !',
			error: 'Something went wrong while reorder',
		})
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return null

		const items = Array.from(section)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		const startIndex = Math.min(result.source.index, result.destination.index)
		const endIndex = Math.max(result.source.index, result.destination.index)

		const updateSections = items.slice(startIndex, endIndex + 1)

		const bulkUpdateData = updateSections.map(section => ({
			_id: section._id,
			position: items.findIndex(item => item._id === section._id),
		}))
		onOrdered(bulkUpdateData)
	}

	return (
		<Card>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Sections</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <BadgePlus />}
					</Button>
				</div>
				<Separator className='my-3' />
				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<>
						{!section.length ? (
							<p className='text-muted-foreground'>No sections</p>
						) : (
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId='sections'>
									{provided => (
										<div {...provided.droppableProps} ref={provided.innerRef}>
											{section.map((section, index) => (
												<SectionList
													key={course._id}
													section={section}
													index={index}
												/>
											))}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default Sections

interface FormsProps {
	course: ICourse
	onToggle: () => void
}

function Forms({ course, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof sectionSchema>>({
		resolver: zodResolver(sectionSchema),
		defaultValues: {
			title: '',
		},
	})

	function onSubmit(values: z.infer<typeof sectionSchema>) {
		setIsLoading(true)
		const promise = createSection(course._id, values.title, pathname)
			.then(() => onToggle())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully created!',
			error: 'Something went wrong!',
		})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Section title<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										disabled={isLoading}
										type='string'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Save
					</Button>
				</form>
			</Form>
		</>
	)
}
