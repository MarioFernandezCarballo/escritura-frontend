
'use client'
import { useEffect, useState } from "react"
import AddClassBody from '../elements/AddClassBody'
import BackToTop from '../elements/BackToTop'
import DataBg from '../elements/DataBg'
import ImageHoverEffects from '../elements/ImageHoverEffects'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import Footer3 from './footer/Footer3'
import Header3 from './header/Header3'

interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	// Mobile Menu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active")
	}

	// Search
	const [isSearch, setSearch] = useState<boolean>(false)
	const handleSearch = (): void => setSearch(!isSearch)

	// OffCanvas
	const [isOffCanvas, setOffCanvas] = useState<boolean>(false)
	const handleOffCanvas = (): void => setOffCanvas(!isOffCanvas)

	useEffect(() => {
		const WOW: any = require('wowjs');
		(window as any).wow = new WOW.WOW({
			live: false
		});

		// Initialize WOW.js
		(window as any).wow.init()

		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])
	return (
		<div className="d-flex flex-column min-vh-100">
			<div id="top" />
			<AddClassBody />
			<DataBg />
			<ImageHoverEffects />
			<Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

			<main className="main flex-grow-1">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			< Footer3 />

			<BackToTop target="#top" />
		</div>
	)
}
