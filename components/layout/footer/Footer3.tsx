import Link from 'next/link'
import NavSocial from '../NavSocial'

export default function Footer3() {
	return (
		<>
			<footer>
				<div className="section-footer-3 position-relative">
					<div className="container position-relative z-1 border-top border-secondary-3 pb-2 pt-4 px-lg-0">
						<div className="d-lg-flex justify-content-between align-items-center">
							<Link className="d-flex main-logo align-items-center justify-content-center ms-lg-0 ms-md-5 ms-3" href="/index-3">
								<h1 className="fs-28 mb-0 me-2">Mario Carballo</h1>
								<img src="assets/imgs/home-page-3/template/favicon.svg" alt="zelio" />
							</Link>
							<div className="navigation d-flex align-items-center justify-content-center flex-wrap gap-4 my-4">
								<a href="/#about" className="fs-6"> Sobre mí </a>
								<a href="/#resume" className="fs-6"> Publicaciones </a>
								<a href="/#portfolio" className="fs-6"> Premios </a>
								<a href="/#blog" className="fs-6"> Blog </a>
								<a href="/#contact" className="fs-6"> Contacto </a>
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}
