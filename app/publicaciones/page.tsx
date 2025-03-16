'use client'
import { motion } from 'framer-motion'
import Publicacion from './Publicacion'
import { getAllPublications } from '@/util/publications'
import Layout from "@/components/layout/Layout"

export default function Publicaciones() {
	const publications = getAllPublications();
	
	return (
		<Layout headerStyle={3} footerStyle={3}>
                    <section className="section-home-3 pb-130 pt-50">
                        <div className="container">
                            <div className="row align-items-start">
			<div id="publicaciones" className="typical pt-70">
				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					Publicaciones
				</motion.h3>
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
