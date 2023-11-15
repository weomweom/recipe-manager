import '@radix-ui/themes/styles.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme, ThemePanel } from '@radix-ui/themes'
import Nav from './components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipe manager',
  description: 'Recipe manager for recipe management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Theme accentColor="purple">
					<Nav/>
					<main className='p-5'>{children}</main>
					{/*<ThemePanel/>*/}
				</Theme>
			</body>
		</html>
	)
}
