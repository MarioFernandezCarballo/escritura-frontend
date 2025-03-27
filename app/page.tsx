'use client'
import Layout from "@/components/layout/Layout"
import { motion } from 'framer-motion'
import Contacto from "../components/contact/page"
import Hero from "../components/hero/Hero"
import Blog from "../components/blog/Blog"
import { getAllPublications } from "@/util/publications"
import Publicacion from "./publicaciones/Publicacion"

export default function Home() {
	
	const publications = getAllPublications();
	const publication = publications[0]
	return (
		<Layout headerStyle={3} footerStyle={3}>
			<Hero from={"home"}/>
			<section id="publicaciones" className="section-home-3 custom-header pt-50">
				<div className="container">
					<div className="row align-items-start">
						<div className="col-xl-8 col-md-12 mt-5 mx-auto">
							<h2>Última publicación</h2>
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
							<motion.a 
								href="/publicaciones" 
								title="publicaciones"
								style={{width: 'fit-content'}}
								className="btn btn-secondary-3 mc-button fw-medium mx-auto mx-md-0"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2 }}
								whileHover={{ 
									scale: 1.05
								}}
								whileTap={{ scale: 0.95 }}>

								Ver todas las publicaciones
								<i className="ri-arrow-right-up-line fw-medium"/>
							</motion.a>
						</div>
					</div>
				</div>
			</section>
			<section id="blog" className="section-home-3 custom-header pt-50">	
				<div className="container">
					<div className="row align-items-start">
						<div className="col-xl-8 col-md-12 mt-5 mx-auto">
							<h2>Blog</h2>
							<p>Aquí encontrarás relatos, reflexiones y todo lo relacionado con la creación literaria. Historias y mundos que desafían la realidad. Pensamientos que invitan a la reflexión. </p>
							<Blog />
						</div>
					</div>
				</div>
			</section>
			<Contacto />		
		</Layout>
	)

}