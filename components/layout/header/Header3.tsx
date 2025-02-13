import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Link from 'next/link'
import OffCanvas from '../OffCanvas'
import MobileMenu from '../MobileMenu'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header3({ scroll, isMobileMenu, handleMobileMenu, isOffCanvas, handleOffCanvas }: any) {
	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.nav 
					className="navbar navbar-expand-lg navbar-home-3 flex-nowrap z-999 p-0"
					animate={{
						backgroundColor: scroll ? "rgba(255, 255, 255, 0.9)" : "transparent"
					}}
					transition={{ duration: 0.3 }}
				>
					<div className="container py-3 px-0">
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<Link className="navbar-brand d-flex main-logo align-items-center ms-lg-0 ms-md-5 ms-3" href="/index-3">
								<h1 className="fs-28 mb-0 me-2">Mario Carballo</h1>
								<img src="assets/imgs/home-page-3/template/favicon.svg" alt="zelio" />
							</Link>
						</motion.div>
						<div className="d-none d-lg-flex">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link active" href="/#about">Sobre mí</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#publicaciones">Publicaciones</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#services">Podcast</Link>
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
							</div>
						</div>
						<div className="navbar-social d-flex align-items-center">
							<motion.div 
								className="d-md-flex d-none gap-3"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
									<Link href="http://facebook.com">
										<i className="ri-facebook-circle-fill fs-18" />
									</Link>
								</motion.div>
								<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
									<Link href="http://twitter.com">
										<i className="ri-twitter-x-fill fs-18" />
									</Link>
								</motion.div>
								<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
									<Link href="http://linkedin.com">
										<i className="ri-linkedin-fill fs-18" />
									</Link>
								</motion.div>
								<motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
									<Link href="http://github.com">
										<i className="ri-github-fill fs-18" />
									</Link>
								</motion.div>
							</motion.div>
							<motion.div 
								className="burger-icon burger-icon-white border rounded-3"
								onClick={handleOffCanvas}
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
						</div>
					</div>
					<ThemeSwitch />
				</motion.nav>
				{/* offCanvas-menu */}
				<OffCanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />
				<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			</motion.header>
		</>
	)
}
