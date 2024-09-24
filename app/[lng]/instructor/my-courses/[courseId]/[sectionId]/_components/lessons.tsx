'use client'

import { createLesson } from '@/actions/lesson.action'
import { ILessonFields } from '@/actions/types'
import { ISection } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { lessonSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgePlus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface Props {
	section: ISection
}
function Lessons({ section }: Props) {
	const [isLoading, setIsLoading] = useState(false)

	const path = usePathname()
	const { onToggle, state } = useToggleEdit()

	const lessons: any[] = []

	const onAdd = async (lesson: ILessonFields) => {
		setIsLoading(true)
		return createLesson({ lesson, section: section._id, path })
			.then(() => onToggle())
			.finally(() => setIsLoading(false))
	}

	return (
		<Card>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Manage chapters</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <BadgePlus />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms lesson={{} as ILessonFields} handler={onAdd} />
				) : (
					<>
						{!lessons.length ? (
							<p className='text-muted-foreground'>No lessons</p>
						) : (
							<p>Lessons</p>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default Lessons

interface FormProps {
	lesson: ILessonFields
	handler: (lesson: ILessonFields) => Promise<void>
}
function Forms({ handler, lesson }: FormProps) {
	const { content, hours, minutes, seconds, title, videoUrl } = lesson

	const form = useForm<z.infer<typeof lessonSchema>>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			title,
			videoUrl,
			hours: `${hours}`,
			minutes: `${minutes}`,
			seconds: `${seconds}`,
			content,
		},
	})

	const onSubmit = (values: z.infer<typeof lessonSchema>) => {
		const promise = handler(values).finally(() => form.reset())

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully!',
			error: 'Something went wrong!',
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Title'
									className='bg-secondary'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='videoUrl'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Video URL'
									className='bg-secondary'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Content'
									className='bg-secondary'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-3 gap-2'>
					<FormField
						control={form.control}
						name='hours'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Hours'
										className='bg-secondary'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='minutes'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Minutes'
										className='bg-secondary'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='seconds'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Seconds'
										className='bg-secondary'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<Button type='submit'>Add</Button>
				</div>
			</form>
		</Form>
	)
}
