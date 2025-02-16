import { motion } from "framer-motion";
import Link from "next/link";

export default function HeadCard() {
    return (
        <div className="offset-lg-1">
            <motion.div 
                className="position-relative d-inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.img 
                    className="rounded-5" 
                    src="assets/imgs/home-page-3/hero/img-1.png" 
                    alt="zelio"
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
                <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                    <Link href="mailto:mariofernandezcarballo@gmail.com">
                        <i className="ri-mail-fill text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                    <Link href="https://x.com/MarioFCarballo">
                        <i className="ri-twitter-x-line text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">@MarioFCarballo</span>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                    <Link href="https://bsky.app/profile/mariocarballo.bsky.social">
                        <i className="ri-bluesky-fill text-primary-3 fs-7" />
                        <span className="text-300 fs-6 ms-2">@mariocarballo.bsky.social</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}