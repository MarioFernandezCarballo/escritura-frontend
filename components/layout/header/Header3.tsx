import Link from 'next/link'
import MobileMenu from '../MobileMenu'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'


export default function Header3({ scroll, isMobileMenu, handleMobileMenu }: any) {
	const pathname = usePathname()
	//const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
	if (typeof window !== 'undefined') {
		setWindowWidth(window.innerWidth);
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}
	}, []);
	
	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.nav 
					id="mc-navbar"
					className="navbar navbar-expand-lg navbar-home-3 flex-nowrap z-999 p-0 w-100"
					animate={{
						backgroundColor: scroll ? "rgba(255, 255, 255, 0.9)" : "transparent"
					}}
					transition={{ duration: 0.3 }}
				>
					<div className="container px-md-0 px-3">
						<div className="d-flex align-items-center justify-content-between w-100">
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
								className={(windowWidth ?? 1000) < 992 ? "w-100 text-center" : "text-left"}
							>
								<Link className="d-flex align-items-center justify-content-center" href="/">
									<h2 style={{ fontFamily: "'Joland Colline', sans-serif" }} className="fs-50">Mario Carballo</h2>
								</Link>
							</motion.div>
							<div className={(windowWidth ?? 1000) < 992 ? "position-fixed top-0 end-0 me-3 z-1000" : "d-lg-flex d-none"}>
								{(windowWidth ?? 1000) < 992 && (
									<motion.div
										id='burgir' 
										className="burger-icon border rounded-3 shadow-sm"
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
								{(windowWidth ?? 1000) >= 992 && <div className="navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">Sobre mí</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className={`nav-link ${pathname === '/publicaciones' || pathname.startsWith('/publicaciones/') ? 'active' : ''}`} href="/publicaciones">Publicaciones</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className={`nav-link ${pathname === '/blog' || pathname.startsWith('/blog/') ? 'active' : ''}`} href="/blog">Blog</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className={`nav-link ${pathname === '/contacto' ? 'active' : ''}`} href="/contacto">Contacto</Link>
									</motion.li>
								</ul>
								</div>}
								
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
