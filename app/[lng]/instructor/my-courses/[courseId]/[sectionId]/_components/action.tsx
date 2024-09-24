'use client'

import { deleteSection } from '@/actions/section.action'
import { ISection } from '@/app.types'
import ConfirmDeleteModal from '@/components/modals/confirm-delete.modal'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function Action(section: ISection) {
	const router = useRouter()
	const path = `/en/instructor/my-courses/${section.course}`
	const onDelete = () => {
		const promise = deleteSection(section._id, path).then(() =>
			router.push(path)
		)
		toast.promise(promise, {
			loading: 'Loading ...',
			success: 'Succseefully delete',
			error: 'Something went wrong',
		})
	}

	return (
		<ConfirmDeleteModal onConfirm={onDelete}>
			<Button className='self-end' variant={'destructive'}>
				Delete
			</Button>
		</ConfirmDeleteModal>
	)
}

export default Action
