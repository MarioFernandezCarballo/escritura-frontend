'use client'
import { motion } from 'framer-motion'
import Award from './Award'

export default function Premios () {
    return (
        <div id="resume" className="education">
            <div className="row">
                <div className="col-md-12 align-self-stretch mt-md-0">
                    <motion.div 
                        className="card-award rounded-4 border p-lg-5 p-md-4 p-3 align-self-stretch h-100 overflow-hidden"
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
                                    description='Finalista de la III edición con el relato "La bóveda". Este relato es, con toda seguridad, mi pieza literaria más importante hasta el momento. ¿Por qué? Si te lees mis próximas novelas, lo entenderás.'
                                />
                                <Award
                                    title='Ganador Premios Talavera'
                                    organization='Concurso de relatos gran premio de Talavera'
                                    date='2022'
                                    description='Se trata del mayor torneo de wargames de habla hispana, y sin duda el mayor concurso de relatos sobre Warhammer 40k en español. “El vuelo del poeta” se llevó el primer puesto.
'
                                />
                                <Award
                                    title='Finalista Wikihammer'
                                    organization='Wikihhamer y la Voz de Horus'
                                    date='2022'
                                    description='Este reconocimiento es de gran importancia ya fue el que me acercó de nuevo a la escritura tras el parón que siguió a la publicación de “Al otro lado de la esfera”. Fue el detonador de esta nueva etapa de escritura, de la que no quiero volver a bajarme. 
'
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
