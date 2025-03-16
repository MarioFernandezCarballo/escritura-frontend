import Link from "next/link";
import { motion } from 'framer-motion'

export default function NavSocial () {
    return (
        <div className="navbar-social d-flex justify-content-center gap-4">
            <motion.div className="d-flex gap-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="https://x.com/MarioFCarballo"
                
                        aria-label="Perfil de Mario Carballo en X"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="ri-twitter-x-fill fs-18" aria-hidden="true"/>
                </Link>
                <Link 
                    href="https://bsky.app/profile/mariocarballo.bsky.social"
                    aria-label="Perfil de Mario Carballo en Bluesky"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="ri-bluesky-fill fs-18" aria-hidden="true" />
                </Link>
                <Link 
                    href="mailto:mariofernandezcarballo@gmail.com"
                    aria-label="Enviar email a Mario Carballo"
                >
                    <i className="ri-mail-fill fs-18" aria-hidden="true" />
                </Link>
            </motion.div>
        </div>
        
    )
}