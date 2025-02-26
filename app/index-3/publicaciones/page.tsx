'use client'
import { motion } from 'framer-motion'
import Publicacion from './Publicacion'

export default function Publicaciones() {
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
				<Publicacion
					link='https://www.amazon.es/otro-lado-esfera-Mario-Fern%C3%A1ndez/dp/B08B33M1WS'
					post='/al-otro-lado-de-la-esfera'
					img='assets/imgs/home-page-3/typical/Esfera.jpg'
					title='Al otro lado de la esfera'
					year='2020'
					desc1='2230 EG. Ciudad de Teno. Imoye se prepara en secreto para el primer viaje en el tiempo de la historia. El Centro de Defensa Espacial la eligió por su maestría en los combates de voluntad, y el futuro de la población de la Tierra está en sus manos. Debe recabar información del pasado para hacer frente al verdugo del mundo, que se acerca desde lo más profundo del cosmos. ¿Serán suficientes sus habilidades?'
					desc2='2022 DC. Ciudad de Boston. El sueño de Mark siempre fue formar parte de Edén. Ellos son los defensores del libre pensamiento. La punta de lanza contra las grandes corporaciones. Su último intento ha dado resultado, y la organización se ha fijado en él para llevar a cabo su movimiento final. Ahora que ha conseguido entrar en Edén, ya no hay marcha atrás...'
					amazon={true}
					webEbook={true}
				/>
				<Publicacion
					link='https://www.amazon.es/otro-lado-esfera-Mario-Fern%C3%A1ndez/dp/B08B33M1WS'
					post='/al-otro-lado-de-la-esfera'
					img='assets/imgs/home-page-3/typical/Esfera.jpg'
					title='Al otro lado de la esfera'
					year='2020'
					desc1='2230 EG. Ciudad de Teno. Imoye se prepara en secreto para el primer viaje en el tiempo de la historia. El Centro de Defensa Espacial la eligió por su maestría en los combates de voluntad, y el futuro de la población de la Tierra está en sus manos. Debe recabar información del pasado para hacer frente al verdugo del mundo, que se acerca desde lo más profundo del cosmos. ¿Serán suficientes sus habilidades?'
				/>
			</div>
		</>
	)
}
