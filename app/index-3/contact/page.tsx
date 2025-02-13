'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Contacto () {
    return (
        <div id="contact" className="contact pt-70">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Contacto
            </motion.h3>
            <motion.div 
                className="d-flex d-flex-column align-items-center gap-5 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="mailto:mariofernandezcarballo@gmail.com">
                        <i className="ri-mail-fill text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
                    </Link>
                </motion.div>
                <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="https://x.com/MarioFCarballo">
                        <i className="ri-twitter-x-line text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">@MarioFCarballo</span>
                    </Link>
                </motion.div>
                <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="https://bsky.app/profile/mariocarballo.bsky.social">
                        <i className="ri-bluesky-fill text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">@mariocarballo.bsky.social</span>
                    </Link>
                </motion.div>
            </motion.div>
            <motion.div 
                className="position-relative z-2 mt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.h5 
                    className="text-dark mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    Hablemos
                </motion.h5>
                <form action="#">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <motion.input 
                                type="text" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
                                id="name" 
                                name="name" 
                                placeholder="Nombre" 
                                aria-label="username"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-md-6">
                            <motion.input 
                                type="text" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                                aria-label="email"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-md-12">
                            <motion.input 
                                type="text" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
                                id="subject" 
                                name="subject" 
                                placeholder="Asunto" 
                                aria-label="subject"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-12">
                            <motion.textarea 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
                                id="message" 
                                name="message" 
                                placeholder="Mensaje" 
                                aria-label="With textarea"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-12">
                            <motion.button 
                                type="submit" 
                                className="btn btn-secondary-3 fw-medium"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Enviar mensaje
                                <motion.i 
                                    className="ri-arrow-right-up-line fw-medium"
                                    whileHover={{ x: 5, y: -5 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
