import { Separator } from '@/components/ui/separator'
import Header from '../_components/header'
import { Tabs } from '@/components/ui/tabs'
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Profile from './_components/profile'
import Account from './_components/account'
import { GetUserById } from '@/actions/user.action'
import { auth } from '@clerk/nextjs'

async function Page() {
	const { userId } = auth()
	const userJSON = await GetUserById(userId!)
	const user = JSON.parse(JSON.stringify(userJSON))
	return (
		<>
			<Header title='Settings' description='Manage your account settings' />
			<Separator className='my-3 bg-muted-foreground' />
			<Tabs defaultValue='profile'>
				<TabsList className='flex items-center justify-start gap-2'>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='account'>Account</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
				<TabsContent value='account'>
					<Account {...user} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default Page
