'use client'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { motion } from 'framer-motion'
import NavSocial from './NavSocial'
import ThemeSwitch from '@/components/elements/ThemeSwitch'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	return (
		<>
			<div 
				className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}
				style={{ 
					transform: isMobileMenu ? 'translateX(0)' : 'translateX(100%)',
					visibility: isMobileMenu ? 'visible' : 'hidden',
					transition: 'transform 0.3s ease-in-out, visibility 0.3s ease-in-out'
				}}
			>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex main-logo align-items-center justify-content-center" href="/index-3">
							<h2 style={{ fontFamily: "'Joland Colline', sans-serif" }} className="fs-50 mb-0 me-2">Mario Carballo</h2>
						</Link>
						<div className={`burger-icon burger-icon-black border rounded-3 ${isMobileMenu ? 'burger-close' : ''}`} onClick={handleMobileMenu}>
							<span className="burger-icon-top" />
							<span className="burger-icon-mid" />
							<span className="burger-icon-bottom" />
						</div>
					</div>
					<div className="mobile-header-content-area">
						<PerfectScrollbar className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link active" href="/about">Sobre mí</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/publicaciones">Publicaciones</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/blog">Blog</Link>
									</motion.li>
									<motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<Link className="nav-link" href="/#contact">Contacto</Link>
									</motion.li>
								</ul>
								</nav>
							</div>
							
							<div className="mobile-social-icon mt-4 text-center">
								<NavSocial />
							</div>
							
							<div className="site-copyright mt-4 text-center">
		
								<p className="mb-0">© {new Date().getFullYear()} Mario Carballo. Todos los derechos reservados.</p>
							</div>
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		</>
	)
}
