import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Publication } from '@/util/publications'


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
    isPreorder?: boolean
    preorderReleaseDate?: string
    publication?: Publication
}

export default function Publicacion({link, img, title, desc1, desc2, desc3, year, amazon, webBuy, post, isPreorder, preorderReleaseDate, publication}:PublicacionProps ) {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()
    return (
        <div className="container mc-publicacion px-0 pt-4">
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
                        className="card__inner rounded-4 border  p-lg-5 p-md-4 p-3 d-flex gap-4 position-relative flex-column flex-lg-row"
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
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                                className="d-flex align-items-center justify-content-center border-0"
                                title={`info-${title?.replace(" ", "-")}`}
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
                                <i className="ri-information-line ri-lg"></i>
                            </motion.button>
                            { amazon &&
                                <motion.button 
                                    className="d-flex align-items-center justify-content-center border-0"
                                    title={`amzn-${title?.replace(" ", "-")}`}
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
                                    <i className="ri-amazon-fill ri-lg"></i>
                                </motion.button>
                            }
                            {
                            webBuy || isPreorder &&
                            <motion.button 
                                className="d-flex align-items-center justify-content-center text-white border-0"
                                title={`buy-${title?.replace(" ", "-")}`}
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
                                <i className="ri-shopping-cart-line ri-lg"></i>
                            </motion.button>
                            }
                        </motion.div>
                        <source srcSet={img?.replace(".jpg", "/webp")} type="image/webp"></source>
                        <motion.img 
                            className="object-fit-contain m-auto" 
                            title={`img-out-${title?.replace(" ", "-")}`}
                            src={img}
                            alt={title} 
                            style={{ objectFit: 'cover', maxHeight: 'auto', maxWidth: 250 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />                        
                        <motion.div 
                            className="card__content px-md-4 px-3 pt-4 pb-5"
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
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <p className="fs-5 mb-0"><span className='publication-year'>{year}</span></p>
                                    {isPreorder && (
                                        <span 
                                            className="badge px-2 py-1 d-flex align-items-center"
                                            style={{backgroundColor: '#00cc0080'}}
                                        >
                                            Preventa
                                        </span>
                                    )}
                                    {publication?.details?.format?.map((p, i) => (
                                        <span 
                                            key={i}
                                            className="badge px-2 py-1 d-flex align-items-center"
                                            style={{backgroundColor: '#55B7FF80'}}
                                        >
                                            {p}
                                        </span>
                                    ))}
                                </div>
                                <motion.p 
                                    className="fs-3"
                                    whileHover={{ x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {title}
                                </motion.p>
                                {isPreorder && preorderReleaseDate && (
                                    <motion.p 
                                        className="text-muted fs-6 mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    >
                                        <i className="ri-calendar-line me-1"></i>
                                        Fecha de lanzamiento: {new Date(preorderReleaseDate).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </motion.p>
                                )}
                            </motion.div>
                            <motion.p 
                                className="mb-lg-auto mb-md-4 mb-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                {desc1}
                            </motion.p>
                            <motion.p 
                                className="mb-lg-auto mb-md-4 mb-3 mt-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                {desc2}
                            </motion.p>
                            <motion.p 
                                className="mb-lg-auto mb-md-4 mb-3 mt-3"
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
