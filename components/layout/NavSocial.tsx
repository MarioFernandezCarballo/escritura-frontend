import Link from "next/link";
import { motion } from 'framer-motion'

export default function NavSocial () {
    return (
        <div className="navbar-social d-flex justify-content-center gap-3">
            
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="http://twitter.com">
                    <i className="ri-twitter-x-fill fs-18" />
                </Link>
            </motion.div>
        </div>
        
    )
}