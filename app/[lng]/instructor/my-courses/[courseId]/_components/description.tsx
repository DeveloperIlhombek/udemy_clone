'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { descriptionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function Description(course: ICourse) {
	const { state, onToggle } = useToggleEdit()

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Description</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<div className='flex items-center gap-2'>
						<span className='self-start font-space-grotesk font-bold text-muted-foreground'>
							Description:
						</span>
						<span className='line-clamp-3 font-medium'>
							{course.description}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default Description

interface FormsProps {
	course: ICourse
	onToggle: () => void
}
function Forms({ course, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const pathname = usePathname()

	const form = useForm<z.infer<typeof descriptionSchema>>({
		resolver: zodResolver(descriptionSchema),
		defaultValues: {
			description: course.description,
		},
	})

	const onSubmit = (values: z.infer<typeof descriptionSchema>) => {
		setIsLoading(true)
		const promise = updateCourse(course._id, values, pathname)
			.then(() => onToggle())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
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
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea disabled={isLoading} {...field} />
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
