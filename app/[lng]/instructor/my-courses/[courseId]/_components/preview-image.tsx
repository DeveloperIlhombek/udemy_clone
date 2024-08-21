'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { courseStorageRefs } from '@/lib/firebase'
import { getDownloadURL, uploadString } from 'firebase/storage'
import { Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

function PreviewImage(course: ICourse) {
	const { state, onToggle } = useToggleEdit()

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Replace image</span>
					<div className=''>
						<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
							{state ? <X /> : <Edit2 className='size-5' />}
						</Button>
					</div>
				</div>
				<Separator className='my-3' />
				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<div className='relative h-72 w-full'>
						<Image
							src={course.previewImage}
							alt={course.title}
							fill
							className='rounded-sm object-cover'
						/>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default PreviewImage

interface FormsProps {
	course: ICourse
	onToggle: () => void
}
function Forms({ course, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	function onUpload(e: ChangeEvent<HTMLInputElement>) {
		setIsLoading(true)
		const files = e.target.files
		if (!files) return
		const file = files[0]

		const reader = new FileReader()

		if (file) {
			reader.readAsDataURL(file)
			reader.onload = e => {
				const image = e.target?.result as string

				const promise = uploadString(courseStorageRefs, image, 'data_url')
					.then(() => {
						getDownloadURL(courseStorageRefs).then(url =>
							updateCourse(course._id, { previewImage: url }, pathname)
						)
					})
					.then(() => onToggle())
					.finally(() => setIsLoading(false))

				toast.promise(promise, {
					loading: 'Loading...',
					success: 'Successfully updated!',
					error: 'Something went wrong!',
				})
			}
		}
	}

	return (
		<>
			{isLoading && <FillLoading />}
			<Input
				className='bg-secondary'
				type='file'
				disabled={isLoading}
				onChange={onUpload}
			/>
		</>
	)
}
