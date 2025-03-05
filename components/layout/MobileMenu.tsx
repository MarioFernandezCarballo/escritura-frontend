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
							<h1 className="fs-28 mb-0 me-2">Mario Carballo</h1>
							<img src="assets/imgs/home-page-3/template/favicon.svg" alt="zelio" />
						</Link>
						<div className={`burger-icon burger-icon-white border rounded-3 ${isMobileMenu ? 'burger-close' : ''}`} onClick={handleMobileMenu}>
							<span className="burger-icon-top" />
							<span className="burger-icon-mid" />
							<span className="burger-icon-bottom" />
						</div>
					</div>
					<div className="mobile-header-content-area">
						<PerfectScrollbar className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading ps-0">
										<li className="nav-item">
											<Link className="nav-link active" href="/#about">Sobre mí</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#publicaciones">Publicaciones</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#services">Podcast</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#resume">Premios</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#blog">Blog</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#contact">Contacto</Link>
										</li>
									</ul>
								</nav>
							</div>
							
							<div className="mobile-social-icon mt-4 text-center">
								<NavSocial />
							</div>
							
							<div className="site-copyright mt-4 text-center">
								<div className="d-flex justify-content-center mb-3">
									<ThemeSwitch />
								</div>
								<p className="mb-0">© {new Date().getFullYear()} Mario Carballo. Todos los derechos reservados.</p>
							</div>
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		</>
	)
}
