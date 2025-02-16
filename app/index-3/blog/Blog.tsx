import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { useEffect } from 'react'
import { useBlogPosts } from '@/util/api'
import Link from "next/link"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 2,
	spaceBetween: 20,
	slidesPerGroup: 1,
	centeredSlides: false,
	loop: true,
	autoplay: {
		delay: 4000,
	},
	breakpoints: {
		1200: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 1,
		},
		0: {
			slidesPerView: 1,
		},
	},
}

const swiperOptions2 = {
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

export default function Blog() {
    const { posts, error, fetchPosts } = useBlogPosts();
    
    useEffect(() => {
        fetchPosts();
    }, []);

    if (error) {
        console.error('Error fetching posts:', error);
    }
    return (
        <div id="blog" className="blog pt-70">
            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                From Blog
            </motion.h3>
            <div className="position-relative pt-4">
                <Swiper {...swiperOptions2} className="swiper slider-two pb-6 position-relative">
                    {posts.map((post, index) => (
                        <SwiperSlide key={post.id}>
                            <Link href={`/blog/${post.id}`}>
                                <motion.div 
                                    className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3 zoom-img"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ 
                                        scale: 1.02,
                                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    <motion.p 
                                        className="fs-18 text-primary-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {Array.isArray(post.tags) ? post.tags.join(', ') : 'Blog'}
                                    </motion.p>
                                    <motion.div 
                                        className="d-flex align-items-center gap-5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <div>
                                            <p className="fs-26 text-dark">{post.title}</p>
                                            <p className="mb-0">{post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                                        </div>
                                        <div className="image-right">
                                            <img 
                                                className="rounded-3 w-100 h-100" 
                                                src={post.image_url || "assets/imgs/home-page-3/blog/img-1.png"} 
                                                alt={post.title} 
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-pagination" />
            </div>
            <motion.div 
                className="text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <Link href="/blog" className="btn btn-secondary-3">
                    View All Posts
                    <i className="ri-arrow-right-line ms-2" />
                </Link>
            </motion.div>
        </div>
    )
}
