'use client'
import Layout from "@/components/layout/Layout"
import Podcast from "../components/podcast/page"
import Publicaciones from "./publicaciones/page"
import Contacto from "../components/contact/page"
import Premios from "../components/premios/page"
import Hero from "../components/hero/Hero"
import HeadCard from "../components/headcard/HeadCard"
import Blog from "../components/blog/Blog"
import { getAllPublications } from "@/util/publications"
import Publicacion from "./publicaciones/Publicacion"

export default function Home() {
	
	const publications = getAllPublications();
	const publication = publications[0]
	console.log(publications)
	return (
		<Layout headerStyle={3} footerStyle={3}>
			<section className="section-home-3 pb-130 pt-50">
				<div className="container">
					<div className="row align-items-start">
						
						<div className="col-xl-8 col-md-12 mt-4 mx-auto">
							<Hero />
							<Publicacion 
								key={publication.id}
								link={publication.buyingOptions.amazon || ''}
								post={`/publicaciones/${publication.slug}`}
								img={publication.coverImage}
								title={publication.title}
								year={publication.year}
								desc1={publication.description[0] || ''}
								desc2={publication.description[1] || ''}
								desc3={publication.description[2] || ''}
								amazon={!!publication.buyingOptions.amazon}
								webBuy={!!publication.buyingOptions.webBuy}/>
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