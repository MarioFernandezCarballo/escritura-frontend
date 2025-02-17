import { motion } from "framer-motion";
import Link from "next/link";

export default function HeadCard() {
    return (
        <aside className="offset-lg-1" aria-label="Información de contacto">
            <motion.div 
                className="position-relative d-inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.img 
                    className="rounded-5" 
                    src="assets/imgs/home-page-3/hero/img-1.png" 
                    alt="Mario Carballo - Escritor"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.p 
                    style={{ fontFamily: "'Joland Colline', sans-serif" }} 
                    className="h1 text-primary-3 position-absolute top-100 start-50 mt-3 translate-middle pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    MarioCarballo
                </motion.p>
            </motion.div>
            <motion.div 
                className="d-flex flex-column gap-2 mt-9 position-relative z-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <nav aria-label="Redes sociales y contacto">
                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                        <Link 
                            href="mailto:mariofernandezcarballo@gmail.com"
                            aria-label="Enviar email a Mario Carballo"
                        >
                            <i className="ri-mail-fill text-primary-3 fs-7" aria-hidden="true" />
                            <span className="text-300 fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                        <Link 
                            href="https://x.com/MarioFCarballo"
                            aria-label="Perfil de Mario Carballo en X (Twitter)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-twitter-x-line text-primary-3 fs-7" aria-hidden="true" />
                            <span className="text-300 fs-6 ms-2">@MarioFCarballo</span>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                        <Link 
                            href="https://bsky.app/profile/mariocarballo.bsky.social"
                            aria-label="Perfil de Mario Carballo en Bluesky"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-bluesky-fill text-primary-3 fs-7" aria-hidden="true" />
                            <span className="text-300 fs-6 ms-2">@mariocarballo.bsky.social</span>
                        </Link>
                    </motion.div>
                </nav>
            </motion.div>
        </aside>
    )
}
