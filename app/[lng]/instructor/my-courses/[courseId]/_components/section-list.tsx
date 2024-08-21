import { ISection } from '@/app.types'
import { Draggable } from '@hello-pangea/dnd'
import { Grip, Pencil, Trash2 } from 'lucide-react'

interface Props {
	section: ISection
	index: number
}

function SectionList({ index, section }: Props) {
	return (
		<Draggable draggableId={section._id} index={index}>
			{provided => (
				<div
					className='mb-4 flex items-center gap-x-2 rounded-md border bg-secondary text-sm'
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div
						className='rounded-l-md border-r border-r-background bg-background/50 px-2 py-3 transition hover:bg-background/80'
						{...provided.dragHandleProps}
					>
						<Grip className='size-5' />
					</div>
					<span>{section.title}</span>
					<div className='ml-auto flex items-center gap-x-2 pr-2'>
						<Pencil className='size-4 cursor-pointer transition hover:opacity-75' />
						<Trash2 className='size-4 cursor-pointer transition hover:opacity-75' />
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default SectionList
