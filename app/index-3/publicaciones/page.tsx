'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
				<div className="container px-0 pt-4">
					<div className="row">
						<div className="card-scroll">
							<div className="cards">
								<motion.div 
									className="card-custom pt-0" 
									data-index={0}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6 }}
								>
									<motion.div 
										className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3"
										whileHover={{ 
											scale: 1.02,
											boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
										}}
										transition={{ duration: 0.3 }}
									>
										<motion.div 
											className="card__image-container w-50 rounded-0 zoom-img position-relative"
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: 0.2 }}
										>
											<motion.img 
												className="object-fit-contain w-100 h-50" 
												src="assets/imgs/home-page-3/typical/Esfera.jpg" 
												alt="zelio" 
												style={{ objectFit: 'cover' }}
												whileHover={{ scale: 1.05 }}
												transition={{ duration: 0.3 }}
											/>
											<Link href="https://www.amazon.es/otro-lado-esfera-Mario-Fern%C3%A1ndez/dp/B08B33M1WS" target="_blank" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
										</motion.div>
										<motion.div 
											className="card__content px-md-4 px-3 pt-lg-0 pb-lg-8 pb-5"
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: 0.3 }}
										>
											<motion.div 
												className="card__title mb-0 mb-lg-2"
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.4, delay: 0.4 }}
											>
												<p className="text-300 fs-5 mb-0">2020</p>
												<Link href="#">
													<motion.p 
														className="fs-3 text-dark"
														whileHover={{ x: 10 }}
														transition={{ duration: 0.2 }}
													>
														Al otro lado de la esfera
													</motion.p>
												</Link>
											</motion.div>
											<motion.p 
												className="text-300 mb-lg-auto mb-md-4 mb-3"
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.4, delay: 0.5 }}
											>
												2230 EG. Ciudad de Teno. Imoye se prepara en secreto para el primer viaje en el tiempo de la historia. El Centro de Defensa Espacial la eligió por su maestría en los combates de voluntad, y el futuro de la población de la Tierra está en sus manos. Debe recabar información del pasado para hacer frente al verdugo del mundo, que se acerca desde lo más profundo del cosmos. ¿Serán suficientes sus habilidades?
											</motion.p>
											<motion.p 
												className="text-300 mb-lg-auto mb-md-4 mb-3"
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.4, delay: 0.6 }}
											>
												2022 DC. Ciudad de Boston. El sueño de Mark siempre fue formar parte de Edén. Ellos son los defensores del libre pensamiento. La punta de lanza contra las grandes corporaciones. Su último intento ha dado resultado, y la organización se ha fijado en él para llevar a cabo su movimiento final. Ahora que ha conseguido entrar en Edén, ya no hay marcha atrás...
											</motion.p>
										</motion.div>
									</motion.div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
