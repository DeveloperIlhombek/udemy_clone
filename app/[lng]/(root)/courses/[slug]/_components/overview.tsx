'use client'

import ReviewCard from '@/components/cards/review.card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useTranslate from '@/hooks/use-translate'
import {
	BadgeCheck,
	CalendarRange,
	Dot,
	ListOrdered,
	MonitorPlay,
	Star,
} from 'lucide-react'

function Overview() {
	const t = useTranslate()

	return (
		<>
			<div className='mt-6 rounded-md bg-gradient-to-t from-background to-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('whatYouWillLearn')}
				</h2>

				<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
					{learn.split(', ').map(item => (
						<div className={'flex gap-2'} key={item}>
							<BadgeCheck className='size-5 text-blue-500' />
							<p className='flex-1'>{item}</p>
						</div>
					))}
				</div>
			</div>

			<div className='mt-8 rounded-md bg-gradient-to-b from-background to-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('courseContent')}
				</h2>

				<div className='mt-2 flex flex-row flex-wrap gap-8'>
					<div className='flex flex-col'>
						<ListOrdered className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfModules')}
						</p>
						<div className='text-2xl font-medium'>4</div>
					</div>

					<div className='flex flex-col'>
						<MonitorPlay className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfLessons')}
						</p>
						<div className='text-2xl font-medium'>90 ta</div>
					</div>

					<div className='flex flex-col '>
						<CalendarRange className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('courseDuration')}
						</p>
						<div className='text-2xl font-medium'>
							20 {t('hours')} 40 {t('minutes')}
						</div>
					</div>
				</div>

				<Separator className='my-3' />

				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			<div className='mt-8 rounded-md bg-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('courseForWhom')}
				</h2>

				<div className='mt-2'>
					{forWhom.split(', ').map(i => (
						<div className='mt-1 flex items-center' key={i}>
							<Dot />
							<p className='flex-1 text-slate-400'>{i}</p>
						</div>
					))}
				</div>
			</div>

			<div className='mt-8 flex flex-col pb-20'>
				<div className='mt-6 flex items-center gap-1 font-space-grotesk text-xl'>
					<Star className='fill-[#DD6B20] text-[#DD6B20]' />
					<div className='font-medium'>
						{t('reviewCourse')}: <span className='font-bold'>4.5</span>
					</div>
					<Dot />
					<div className='font-medium'>
						<span className='font-bold'>20</span>
						{t('review')}
					</div>
				</div>

				<div className='mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2'>
					<ReviewCard />
					<ReviewCard />
					<ReviewCard />
					<ReviewCard />
				</div>

				<Button
					size={'lg'}
					rounded={'full'}
					className='mx-auto mt-6 flex justify-center'
				>
					{t('viewAll')}
				</Button>
			</div>
		</>
	)
}

export default Overview

const learn = 'JavaScript, AJAX, Algoritm, Promise, Git va Github, JSON-Server'
const forWhom =
	"Dasturlashga qiziqish borlar, JavaScript dasturlash tilini o'rganish istagi, Amaliy loyihalar qilish"
