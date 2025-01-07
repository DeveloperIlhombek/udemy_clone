interface Props {
	title: string
	description: string
}

function NoResult({ description, title }: Props) {
	return (
		<div className='mt-10 flex w-full flex-col items-center justify-center'>
			{/* <Image
				src='/images/no-result.png'
				alt='No result found'
				width={270}
				height={200}
				className="block object-contain"
			/> */}
			<h2 className='mt-8 font-space-grotesk text-2xl  font-bold'>{title}</h2>
			<p className=' my-3.5 max-w-md text-center'>{description}</p>
		</div>
	)
}

export default NoResult
