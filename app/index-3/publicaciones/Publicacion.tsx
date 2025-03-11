import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


interface PublicacionProps {
	link?: string
    post: string
	img?: string
	title?: string
	desc1?: string
	desc2?: string
    desc3?: string
    year?: string
    amazon?: boolean
    webBuy?: boolean
}

export default function Publicacion({link, img, title, desc1, desc2, desc3, year, amazon, webBuy, post}:PublicacionProps ) {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()
    return (
        <div className="container px-0 pt-4">
            <div className="row">
                <motion.div 
                    className="pt-0" 
                    data-index={0}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div 
                        className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3 d-flex gap-4 position-relative flex-column flex-lg-row"
                        style={{minHeight: 550}}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ 
                            scale: 1.01,
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Dark overlay */}
                        <motion.div 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                zIndex: 5,
                                opacity: isHovered ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                                borderRadius: '1rem'
                            }}
                        />

                        {/* Floating purchase options */}
                        <motion.div 
                            className="purchase-options"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 10,
                                display: 'flex',
                                gap: '20px',
                                opacity: isHovered ? 1 : 0,
                                pointerEvents: isHovered ? 'auto' : 'none',
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <motion.button 
                                className="d-flex align-items-center justify-content-center bg-primary-3 text-white border-0"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                                }}
                                whileHover={{ 
                                    scale: 1.1,
                                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(post)
                                }}
                                transition={{ duration: 0.1 }}
                            >
                                <i className="ri-information-line ri-lg text-primary-3"></i>
                            </motion.button>
                            { amazon &&
                                <motion.button 
                                    className="d-flex align-items-center justify-content-center bg-primary-3 text-white border-0"
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                                    }}
                                    whileHover={{ 
                                        scale: 1.1,
                                        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        window.open(link, '_blank', 'noopener,noreferrer')
                                    }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <i className="ri-amazon-fill ri-lg text-primary-3"></i>
                                </motion.button>
                            }
                            {
                            webBuy &&
                            <motion.button 
                                className="d-flex align-items-center justify-content-center bg-primary-3 text-white border-0"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                                }}
                                whileHover={{ 
                                    scale: 1.1,
                                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Navigate to the publication detail page for web purchase
                                    router.push(post)
                                }}
                                transition={{ duration: 0.1 }}
                            >
                                <i className="ri-shopping-cart-line ri-lg text-primary-3"></i>
                            </motion.button>
                            }
                        </motion.div>
                        <motion.img 
                            className="object-fit-contain m-auto" 
                            src={img}
                            alt="cover" 
                            style={{ objectFit: 'cover', maxHeight: 'auto', maxWidth: 250 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />                        
                        <motion.div 
                            className="card__content px-md-4 px-3 pt-4 pt-lg-0 pb-lg-8 pb-5"
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
                                <p className="text-300 text-primary-3 fs-5 mb-0">{year}</p>
                                <Link href="#">
                                    <motion.p 
                                        className="fs-3 text-dark"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {title}
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
                                {desc1}
                            </motion.p>
                            <motion.p 
                                className="text-300 mb-lg-auto mb-md-4 mb-3 mt-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                {desc2}
                            </motion.p>
                            <motion.p 
                                className="text-300 mb-lg-auto mb-md-4 mb-3 mt-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                {desc3}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
