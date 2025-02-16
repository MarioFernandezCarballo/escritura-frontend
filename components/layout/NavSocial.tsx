import Link from "next/link";
import { motion } from 'framer-motion'

export default function NavSocial () {
    return (
        <div className="navbar-social d-flex justify-content-center gap-3">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="http://facebook.com">
                    <i className="ri-facebook-circle-fill fs-18" />
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="http://twitter.com">
                    <i className="ri-twitter-x-fill fs-18" />
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="http://linkedin.com">
                    <i className="ri-linkedin-fill fs-18" />
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="http://github.com">
                    <i className="ri-github-fill fs-18" />
                </Link>
            </motion.div>
        </div>
        
    )
}