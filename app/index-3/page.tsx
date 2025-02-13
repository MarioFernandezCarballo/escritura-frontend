'use client'
import Layout from "@/components/layout/Layout"
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Podcast from "./podcast/page"
import Publicaciones from "./publicaciones/page"
import Contacto from "./contact/page"
import Premios from "./premios/page"

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

interface BlogPost {
    id: number;
    title: string;
    content: string;
    image_url: string;
    tags: string[];
    created_at?: string;
}

export default function Home3() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://mariocarballo.pythonanywhere.com/blog/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

	return (
		<>
			<Layout headerStyle={3} footerStyle={3}>
				<section className="section-home-3 bg-1000 pb-130 pt-96 section-work">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 offset-lg-1">
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
							<div className="col-lg-7 pt-lg-0 pt-8">
								<motion.div 
									id="about" 
									className="hero-3 pe-lg-5 border-bottom pb-7"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									<motion.span 
										className="text-primary-3"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.3 }}
									>
										Shaping Narratives, Igniting Minds
									</motion.span>
									<motion.h2 
										className="text-300 my-3"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.4 }}
									>
										Crafting Stories <span className="text-dark">with Passion: Discover the Work</span> of Meisa
									</motion.h2>
									<motion.p 
										className="mb-8"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.5 }}
									>
										Welcome to the creative world of Meisa Rosie, where words are crafted into captivating stories and insightful content. Explore her journey as an award-winning writer and discover how she brings imagination to life through her unique voice and compelling narratives.
									</motion.p>
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.6 }}
									>
										<form 
											className="d-inline-block d-flex"
											onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
												e.preventDefault();
												const form = e.currentTarget;
												const email = form.email.value;
												try {
													const response = await fetch('https://mariocarballo.pythonanywhere.com/mailing/subscribers', {
														method: 'POST',
														headers: {
															'Content-Type': 'application/json',
														},
														body: JSON.stringify({ email }),
													});
													if (!response.ok) {
														throw new Error('Failed to subscribe');
													}
													alert('Subscribed successfully!');
												} catch (error) {
													console.error('Error subscribing:', error);
													alert('Subscription failed. Please try again.');
												}
											}}
										>
											<input type="email" name="email" placeholder="Enter your email" required className="form-control me-2" />
											<motion.div 
											className="d-inline-block"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link href="#contact" className="btn btn-outline-secondary-3 d-inline-flex align-items-center">
												<button type="submit" className="btn btn-secondary-3">
													Subscribe to Newsletter
													<i className="ri-mail-line ms-2" />
												</button>
											</Link>
											</motion.div>
										</form>
									</motion.div>
								</motion.div>
								<Publicaciones />
								<Podcast />
								<Premios />
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
								<Contacto />
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
