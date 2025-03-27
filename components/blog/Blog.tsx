import { motion } from "framer-motion"
import { useEffect } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { useBlogPosts } from '@/util/api'
import Link from "next/link"
import he from 'he'

const cleanAndTruncateContent = (content: string, maxLength: number = 50) => {
    const heDecoded = he.decode(content);
    // First remove HTML tags
    const withoutTags = heDecoded.replace(/<[^>]*>/g, '');
    
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
        
        <div>
            <div className="position-relative row pt-4">
                    {posts.slice(-3).map((post, index) => (
                        <div className="col-xl-4 col-md-12" key={post.id}>
                            <motion.article 
                                className="rounded-4 position-relative border p-lg-4 p-md-4 p-3 mb-3"
                                itemScope
                                itemType="http://schema.org/BlogPosting"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ 
                                    scale: 1.01,
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
                                <motion.div 
                                    id={`blog-overlay-${index}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        zIndex: 5,
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        borderRadius: '1rem'
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
                                        title={`blog-${post.id}`}
                                        aria-label={`Leer el artículo completo: ${post.title}`}
                                    >
                                        <motion.button 
                                            className="d-flex align-items-center justify-content-center border-0"
                                            title={`blog-${post.id}-btn`}
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
                                                className="ri-book-open-line mc-icon ri-lg"
                                                aria-hidden="true"
                                            ></i>
                                        </motion.button>
                                    </Link>
                                </div>
                                <div className="blog-image" style={{ overflow: 'hidden' }}>
                                    <img 
                                        className="rounded-3 w-100 h-100" 
                                        title={`img-${post.id}`}
                                        style={{objectFit: 'cover', objectPosition: 'center'}}
                                        src={post.image_url || "assets/imgs/home-page-3/blog/img-1.png"} 
                                        alt={`Imagen para el artículo: ${post.title}`}
                                        itemProp="image"
                                    />
                                </div>
                                    <motion.p 
                                        className="fs-16 mb-2"
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
                                            <h3 className="fs-26 mb-3" itemProp="headline">{post.title}</h3>
                                            <p className="mb-4" itemProp="description">{cleanAndTruncateContent(post.content)}</p>
                                            <meta itemProp="datePublished" content={post.created_at} />
                                            <meta itemProp="author" content="Mario Carballo" />
                                        </div>
                                    </motion.div>
                            </motion.article>
                        </div>
                    ))}
            </div>
            <motion.a 
                href="/blog" 
                title="blog-all"
                style={{width: 'fit-content'}}
                className="btn btn-secondary-3 mc-button fw-medium mx-auto mx-md-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ 
                    scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}>

                Ver todos los posts
                <i className="ri-arrow-right-up-line fw-medium"/>
            </motion.a>
        </div>
    )
}
