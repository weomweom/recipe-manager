import type { Metadata } from 'next'
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Nav from '@/components/Nav';
import '../app/globals.css';
import { myTheme } from '@/my-theme';

export const metadata: Metadata = {
  title: 'Recipe manager',
  description: 'Recipe manager for recipe management',
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={myTheme}>
			<div>
				<Nav/>
				<div className='p-6'>
					<Component {...pageProps} />
				</div>
			</div>	
		</ThemeProvider>

	)
}
