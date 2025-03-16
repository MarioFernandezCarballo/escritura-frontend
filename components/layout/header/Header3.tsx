import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Link from 'next/link'
import { useTheme } from '@/util/useTheme'
import MobileMenu from '../MobileMenu'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'


export default function Header3({ scroll, isMobileMenu, handleMobileMenu }: any) {
	const { theme } = useTheme()
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
	
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}
		
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize)
			handleResize()
		}
		
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [])
	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.nav 
					className="navbar navbar-expand-lg navbar-home-3 flex-nowrap z-999 p-0 w-100"
					animate={{
						backgroundColor: scroll ? "rgba(255, 255, 255, 0.9)" : "transparent"
					}}
					transition={{ duration: 0.3 }}
				>
					<div className="container py-3 px-md-0 px-3">
						<div className="d-flex align-items-center justify-content-between w-100">
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
								className={windowWidth < 992 ? "w-100 text-center" : "text-left"}
							>
								<Link className="d-flex main-logo align-items-center justify-content-center" href="/">
									<h1 style={{ fontFamily: "'Joland Colline', sans-serif" }} className="fs-50 mb-0 me-2 text-primary-3">Mario Carballo</h1>
								</Link>
							</motion.div>
							<div className={windowWidth < 992 ? "position-fixed top-0 end-0 mt-3 me-3 z-1000" : "d-lg-flex d-none"}>
								{windowWidth < 992 && (
									<motion.div 
										className="burger-icon burger-icon-white border rounded-3 bg-white shadow-sm"
										onClick={handleMobileMenu}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<motion.span 
											className="burger-icon-top"
											transition={{ duration: 0.2 }}
										/>
										<motion.span 
											className="burger-icon-mid"
											transition={{ duration: 0.2 }}
										/>
										<motion.span 
											className="burger-icon-bottom"
											transition={{ duration: 0.2 }}
										/>
									</motion.div>
								)}
								{windowWidth >= 992 && <div className="navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link active" href="/#about">Sobre mí</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#publicaciones">Publicaciones</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#resume">Premios</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#blog">Blog</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#contact">Contacto</Link>
									</motion.li>
								</ul>
								<div className="d-flex align-items-center">
									<ThemeSwitch />
								</div>
								</div>}
								
								{/* Theme switch */}
								
							</div>
							
			
						</div>
					</div>
				</motion.nav>
				{/* offCanvas-menu */}
				<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			</motion.header>
		</>
	)
}
