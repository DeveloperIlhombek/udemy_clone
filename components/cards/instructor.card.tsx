import { IInstructor } from '@/types'
import Image from 'next/image'

function InstructorCard(instructor: IInstructor) {
	return (
		<div className='flex flex-col space-y-1'>
			<div className='relative h-72 w-full'>
				<Image
					src={instructor.image}
					alt={instructor.name}
					fill
					className='rounded-md object-cover'
				/>
			</div>
			<h1 className='font-space-grotesk text-2xl font-bold'>
				{instructor.name}
			</h1>
			<h3 className='font-medium text-muted-foreground'>{instructor.job}</h3>
		</div>
	)
}

export default InstructorCard
