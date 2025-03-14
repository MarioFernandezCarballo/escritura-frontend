import "/public/assets/css/vendors/bootstrap.min.css"
import "/public/assets/css/vendors/swiper-bundle.min.css"
import "/public/assets/css/vendors/carouselTicker.css"
import "/public/assets/css/vendors/magnific-popup.css"
import "/public/assets/fonts/remixicon/remixicon.css"
import "/public/assets/css/main.css"

import type { Metadata, Viewport } from "next"
import GoogleTagManager from "@/components/analytics/GoogleTagManager"
import GoogleTagManagerNoScript from "@/components/analytics/GoogleTagManagerNoScript"
import PageViewTracker from "@/components/analytics/PageViewTracker"
import { GTM_ID } from "@/util/analytics"
import { Urbanist, Playfair_Display, DM_Mono } from "next/font/google"

const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})
const playfair_display = Playfair_Display({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--playpair",
	display: 'swap',
})
const dmMono = DM_Mono({
	weight: ['300', '400', '500'],
	subsets: ['latin'],
	variable: "--dmMono",
	display: 'swap',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
}

export const metadata: Metadata = {
	metadataBase: new URL('https://mariocarballo.es'),
	title: {
		default: "Mario Carballo | Escritor de Ciencia Ficción y Fantasía",
		template: "%s | Mario Carballo"
	},
	description: "Mario Carballo - Escritor de ciencia ficción y fantasía, especializado en novelas, relatos cortos y sagas. Creador de mundos imaginarios e historias especulativas.",
	keywords: [
		"Mario Carballo",
		"escritor",
		"ciencia ficción",
		"fantasía",
		"novelas",
		"relatos cortos",
		"sagas fantásticas",
		"literatura especulativa",
		"worldbuilding",
		"ficción especulativa",
		"España"
	],
	authors: [{ name: "Mario Carballo" }],
	creator: "Mario Carballo",
	publisher: "Mario Carballo",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'es_ES',
		url: 'https://mariocarballo.es',
		siteName: 'Mario Carballo',
		title: 'Mario Carballo | Escritor de Ciencia Ficción y Fantasía',
		description: 'Mario Carballo - Escritor de ciencia ficción y fantasía, especializado en novelas, relatos cortos y sagas. Creador de mundos imaginarios e historias especulativas.',
		images: [
			{
				url: '/assets/imgs/hero/hero-1/profile.jpg',
				width: 1200,
				height: 630,
				alt: 'Mario Carballo - Escritor de Ciencia Ficción y Fantasía',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Mario Carballo | Escritor de Ciencia Ficción y Fantasía',
		description: 'Mario Carballo - Escritor de ciencia ficción y fantasía, especializado en novelas, relatos cortos y sagas. Creador de mundos imaginarios e historias especulativas.',
		images: ['/assets/imgs/hero/hero-1/profile.jpg'],
		creator: '@mariocarballo',
	},
	verification: {
		google: 'add-your-verification-code',
	},
	alternates: {
		canonical: 'https://mariocarballo.es',
	},
	other: {
		'schema:type': 'Person',
		'schema:name': 'Mario Carballo',
		'schema:description': 'Escritor de ciencia ficción y fantasía, especializado en novelas, relatos cortos y sagas.',
		'schema:url': 'https://mariocarballo.es',
		'schema:jobTitle': 'Escritor de Ciencia Ficción y Fantasía',
		'schema:genre': JSON.stringify(['Science Fiction', 'Fantasy', 'Speculative Fiction'])
	}
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es" data-bs-theme="dark" className="zelio">
			<GoogleTagManager gtmId={GTM_ID} />
			<body className={`${urbanist.variable} ${playfair_display.variable} ${dmMono.variable}`}>
				<GoogleTagManagerNoScript gtmId={GTM_ID} />
				<PageViewTracker />
				{children}
			</body>
		</html>
	)
}
