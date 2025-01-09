import type { Metadata } from 'next'
import { Roboto, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { languages } from '@/i18n/settings'
import { dir } from 'i18next'
import { ClerkProvider } from '@clerk/nextjs'
import { localization } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})

const spaceGrotesk = SpaceGrotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-space-grotesk',
})

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

export const metadata: Metadata = {
	title: 'Usturlob Praktikum - Next.js',
	description: "Startup Praktikum's Next.js project",
	icons: { icon: '/logo.svg' },
}

interface Props extends ChildProps {
	params: { lng: string }
}

function RootLayout({ children, params: { lng } }: Props) {
	const local = localization(lng)

	return (
		<ClerkProvider localization={local}>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${roboto.variable} ${spaceGrotesk.variable} custom-scrollbar overflow-x-hidden`}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Toaster position='top-center' />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
