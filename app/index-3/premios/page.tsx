'use client'
import { motion } from 'framer-motion'

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
                                <motion.li 
                                    className="position-relative z-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.p 
                                        className="fs-5 text-dark mb-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        Columnist for The New Yorker
                                    </motion.p>
                                    <motion.ul 
                                        className="list-style-2 d-flex gap-4 ps-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                    >
                                        <li>
                                            <p className="text-primary-3 mb-0">NY Times</p>
                                        </li>
                                        <li>
                                            <p className="mb-2">2018 - 2020</p>
                                        </li>
                                    </motion.ul>
                                    <motion.p 
                                        className="mb-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                    >
                                        Worked with various clients, including magazines, websites, and publishing houses, to produce high-quality content across multiple genres.
                                    </motion.p>
                                </motion.li>
                                <motion.li 
                                    className="position-relative z-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.p 
                                        className="fs-5 text-dark mb-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.7 }}
                                    >
                                        Content Writer at LitHub
                                    </motion.p>
                                    <motion.ul 
                                        className="list-style-2 d-flex gap-4 ps-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.8 }}
                                    >
                                        <li>
                                            <p className="text-primary-3 mb-0">GitHub</p>
                                        </li>
                                        <li>
                                            <p className="mb-2">2018 - 2020</p>
                                        </li>
                                    </motion.ul>
                                    <motion.p 
                                        className="mb-6"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.9 }}
                                    >
                                        Created engaging articles, blog posts, and features for one of the leading literary websites.
                                    </motion.p>
                                </motion.li>
                                <motion.li 
                                    className="position-relative z-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1.0 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.p 
                                        className="fs-5 text-dark mb-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1.1 }}
                                    >
                                        Editor at The Write Stuff
                                    </motion.p>
                                    <motion.ul 
                                        className="list-style-2 d-flex gap-4 ps-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1.2 }}
                                    >
                                        <li>
                                            <p className="text-primary-3 mb-0">A.Lecturer</p>
                                        </li>
                                        <li>
                                            <p className="mb-2">2018 - 2020</p>
                                        </li>
                                    </motion.ul>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1.3 }}
                                    >
                                        Overseeing the editorial process, providing guidance, and ensuring the highest standards of content.
                                    </motion.p>
                                </motion.li>
                            </ul>
                            <motion.div 
                                className="line-left position-absolute top-0 border-start h-md-100 z-0"
                                initial={{ height: 0 }}
                                whileInView={{ height: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.0 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>          
    )
}
