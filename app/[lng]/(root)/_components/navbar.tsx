'use client'

import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import { LogIn, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import GlobalSearch from './global-search'
import LanguageDropdown from '@/components/shared/language-dropdown'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import useTranslate from '@/hooks/use-translate'
import Mobile from './mobile'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import UserBox from '@/components/shared/user-box'
function Navbar() {
	const t = useTranslate()
	const pathname = usePathname()
	const { lng } = useParams()

	return (
		<div className='fixed inset-0 z-40 h-20 bg-background/70 backdrop-blur-xl'>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='hidden items-center gap-3 border-l pl-2 md:flex'>
						{navLinks.map(nav => (
							<Link
								href={`/${nav.route}`}
								key={nav.route}
								className={cn(
									'font-medium transition-all hover:text-blue-500 hover:underline',
									pathname === `/${lng}/${nav.route}` && 'text-blue-500'
								)}
							>
								{t(nav.name)}
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 md:border-r md:pr-3'>
						<div className='hidden md:flex'>
							<GlobalSearch />
							<LanguageDropdown />
							<Button size={'icon'} variant={'ghost'}>
								<ShoppingCart />
							</Button>
						</div>
						<Mobile />
						<ModeToggle />
					</div>
					<SignedIn>
						<UserBox />
					</SignedIn>
					<SignedOut>
						<SignInButton mode='modal'>
							<Button
								variant={'ghost'}
								size={'lg'}
								rounded={'full'}
								className='hidden md:flex'
							>
								{t('logIn')}
							</Button>
						</SignInButton>
						<SignUpButton mode='modal'>
							<Button size={'lg'} rounded={'full'} className='hidden md:flex'>
								{t('signUp')}
							</Button>
						</SignUpButton>
						<SignInButton mode='modal'>
							<Button size={'icon'} variant={'ghost'} className='md:hidden'>
								<LogIn />
							</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Navbar
