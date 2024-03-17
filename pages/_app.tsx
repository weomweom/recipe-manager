import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import '../app/globals.css';
import { myTheme } from '@/my-theme';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={myTheme}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Recipe manager</title>
				<meta name="description" content="Recipe manager" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>

	)
}
