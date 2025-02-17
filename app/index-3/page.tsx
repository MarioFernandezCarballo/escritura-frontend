'use client'
import Layout from "@/components/layout/Layout"
import Podcast from "./podcast/page"
import Publicaciones from "./publicaciones/page"
import Contacto from "./contact/page"
import Premios from "./premios/page"
import Hero from "./hero/Hero"
import HeadCard from "./headcard/HeadCard"
import Blog from "./blog/Blog"

export default function Home3() {
	return (
		<Layout headerStyle={3} footerStyle={3}>
			<section className="section-home-3 bg-1000 pb-130 pt-96 section-work">
				<div className="container">
					<div className="row align-items-start">
						<div className="d-flex flex-lg-row flex-column col-12">
							<div className="col-lg-5">
								<HeadCard />
							</div>
							<div className="col-lg-7 pt-lg-0 pt-8">
								<Hero />
							</div>
						</div>
						<div className="col-8 mt-4 mx-auto">
							<Publicaciones />
							<Podcast />
							<Premios />
							<Blog />
							<Contacto />
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
