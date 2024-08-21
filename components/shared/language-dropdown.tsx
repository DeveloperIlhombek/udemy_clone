'use client'

import { Languages } from 'lucide-react'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Image from 'next/image'
import { lngs } from '@/constants'
import Link from 'next/link'
import { cn, getCurrentLng } from '@/lib/utils'
import { useParams, usePathname } from 'next/navigation'

interface Props {
	isMobile?: boolean
}

function LanguageDropdown({ isMobile = false }: Props) {
	const { lng } = useParams()
	const pathanme = usePathname()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size={'icon'}
					className={cn(
						isMobile && 'w-full bg-primary hover:bg-primary/80 h-12'
					)}
				>
					<Languages />
					{isMobile && (
						<span className='ml-2 font-space-grotesk font-medium'>
							{getCurrentLng(lng as string)}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					{lngs.map(item => (
						<Link key={item.route} href={`/${item.route}/${pathanme.slice(4)}`}>
							<DropdownMenuItem
								className={cn(
									'cursor-pointer',
									lng === item.route && 'bg-secondary'
								)}
							>
								<Image
									src={`/assets/locales/${item.route}.png`}
									alt={item.label}
									width={30}
									height={30}
								/>
								<span className='ml-2 font-space-grotesk font-medium'>
									{item.label}
								</span>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
