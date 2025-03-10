'use client'
import { motion } from 'framer-motion'
import Award from './Award'

export default function Premios () {
    return (
        <div id="resume" className="education pt-70">
            <div className="row">
                <div className="col-12">
                    <motion.h3 
                        className="d-none d-md-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Premios
                    </motion.h3>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-md-12 align-self-stretch mt-md-0 mt-5">
                    <motion.div 
                        className="card-award rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3 align-self-stretch h-100 overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ 
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <div className="position-relative h-100 align-self-stretch align-items-center">
                            <ul className="list-style-1 d-flex ps-3 flex-column mb-0">
                                <Award
                                    title='Finalista de El Yunque Literario'
                                    organization='El yunque de Hefesto'
                                    date='2024'
                                    description='Finalista de la III edición con el relato "La bóveda"'
                                />
                                <Award
                                    title='Ganador Premios Talavera'
                                    organization='Concurso de relatos gran premio de Talavera'
                                    date='2022'
                                    description='Ganador del certamen del torneo más importante en español sobre Warhammer 40K con "El vuelo del poeta"'
                                />
                                <Award
                                    title='Finalista Wikihhamer'
                                    organization='Wikihhamer y la Voz de Horus'
                                    date='2022'
                                    description='Finalista con el relato "La pregunta"'
                                />
                                <Award
                                    title='Finalista Relatos Caseros'
                                    organization='Editorial Autografía'
                                    date='2020'
                                    description='Ganador del certamen Relatos Caseros con "La bóveda"'
                                />                                
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>          
    )
}
