'use client'
import { motion } from 'framer-motion'
import Publicacion from './Publicacion'
import { getAllPublications } from '@/util/publications'
import Layout from "@/components/layout/Layout"
import Hero from '@/components/hero/Hero'

export default function Publicaciones() {
	const publications = getAllPublications();
	
	return (
		<Layout headerStyle={3} footerStyle={3}>
			<Hero from={'publicaciones'}/>
			<section className="section-home-3 custom-header">
				<div className="container">
					<div className="row align-items-start">
						<div id="publicaciones" className="col-xl-8 col-md-12 mt-5 mx-auto">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								Publicaciones
							</motion.h2>
							<p>Bienvenido a mi biblioteca literaria. Aquí encontrarás mis novelas y colecciones de relatos, cada una escrita con pasión y dedicación. Este es solo el comienzo: sigo creando nuevas historias para que siempre tengas algo nuevo que descubrir y disfrutar. ¡Acompáñame en este viaje literario!</p>
							{publications.map((publication) => (
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
									webBuy={!!publication.buyingOptions.webBuy}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
	
}
