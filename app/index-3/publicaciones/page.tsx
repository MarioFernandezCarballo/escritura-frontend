'use client'
import { motion } from 'framer-motion'
import Publicacion from './Publicacion'
import { getAllPublications } from '@/util/publications'

export default function Publicaciones() {
	const publications = getAllPublications();
	
	return (
		<>
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
						post={`/index-3/publicaciones/${publication.slug}`}
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
		</>
	)
}
