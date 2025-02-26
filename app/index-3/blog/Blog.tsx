import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { useEffect } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { useBlogPosts } from '@/util/api'
import Link from "next/link"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: false,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}

const cleanAndTruncateContent = (content: string, maxLength: number = 150) => {
    // First remove HTML tags
    const withoutTags = content.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    const decoded = withoutTags
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&hellip;/g, '...')
        .replace(/&mdash;/g, '—');
    
    // Sanitize the content
    const sanitized = DOMPurify.sanitize(decoded, { ALLOWED_TAGS: [] });
    
    // Truncate to maxLength
    return sanitized.length > maxLength 
        ? sanitized.substring(0, maxLength).trim() + '...'
        : sanitized;
};

export default function Blog() {
    const { posts, error, fetchPosts } = useBlogPosts();
    
    useEffect(() => {
        fetchPosts();
    }, []);

    if (error) {
        console.error('Error fetching posts:', error);
    }
    return (
        <section id="blog" className="blog pt-70" aria-label="Blog posts">
            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Blog
            </motion.h3>
            <div className="position-relative pt-4">
                <Swiper 
                    {...swiperOptions} 
                    className="swiper slider-two position-relative"
                    aria-label="Carrusel de posts del blog"
                >
                    {posts.map((post, index) => (
                        <SwiperSlide key={post.id}>
                            <motion.article 
                                className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3"
                                itemScope
                                itemType="http://schema.org/BlogPosting"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ 
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                                }}
                                onMouseEnter={() => {
                                    const overlay = document.getElementById(`blog-overlay-${index}`);
                                    const buttons = document.getElementById(`blog-buttons-${index}`);
                                    if (overlay) overlay.style.opacity = '1';
                                    if (buttons) buttons.style.opacity = '1';
                                }}
                                onMouseLeave={() => {
                                    const overlay = document.getElementById(`blog-overlay-${index}`);
                                    const buttons = document.getElementById(`blog-buttons-${index}`);
                                    if (overlay) overlay.style.opacity = '0';
                                    if (buttons) buttons.style.opacity = '0';
                                }}
                            >
                                {/* Dark overlay */}
                                <div 
                                    id={`blog-overlay-${index}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        zIndex: 5,
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        borderRadius: '0.5rem'
                                    }}
                                />

                                {/* Floating action buttons */}
                                <div 
                                    id={`blog-buttons-${index}`}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 10,
                                        display: 'flex',
                                        gap: '20px',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }}
                                >
                                    <Link 
                                        href={`/blog/${post.id}`}
                                        aria-label={`Leer el artículo completo: ${post.title}`}
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
                                            transition={{ duration: 0.1 }}
                                        >
                                            <i 
                                                className="ri-book-open-line ri-lg text-primary-3"
                                                aria-hidden="true"
                                            ></i>
                                        </motion.button>
                                    </Link>
                                </div>
                                    <motion.p 
                                        className="fs-16 text-primary-3 mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {new Date(post.created_at || new Date()).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </motion.p>
                                    <motion.div 
                                        className="d-flex flex-column gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <div>
                                            <h4 className="fs-26 text-dark mb-3" itemProp="headline">{post.title}</h4>
                                            <p className="mb-4" itemProp="description">{cleanAndTruncateContent(post.content)}</p>
                                            <meta itemProp="datePublished" content={post.created_at} />
                                            <meta itemProp="author" content="Mario Carballo" />
                                        </div>
                                        <div className="blog-image" style={{ height: '250px', overflow: 'hidden' }}>
                                            <img 
                                                className="rounded-3 w-100 h-100 object-fit-cover" 
                                                src={post.image_url || "assets/imgs/home-page-3/blog/img-1.png"} 
                                                alt={`Imagen para el artículo: ${post.title}`}
                                                itemProp="image"
                                            />
                                        </div>
                                    </motion.div>
                            </motion.article>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div 
                    className="swiper-pagination"
                    role="tablist"
                    aria-label="Controles de paginación del carrusel"
                />
            </div>
            <motion.div 
                className="text-center mt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <Link href="/blog" className="btn btn-secondary-3">
                    Ver todos los posts
                    <i className="ri-arrow-right-line ms-2" aria-hidden="true" />
                </Link>
            </motion.div>
        </section>
    )
}
