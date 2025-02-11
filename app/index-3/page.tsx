'use client'
import Layout from "@/components/layout/Layout"
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect } from 'react'
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
	// spaceBetween: 20,
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
            // Fetch blog posts
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
								<div className="position-relative d-inline-block">
									<img className="rounded-5" src="assets/imgs/home-page-3/hero/img-1.png" alt="zelio" />
									<p style={{ fontFamily: "'Joland Colline', sans-serif" }} className="h1 text-primary-3 position-absolute top-100 start-50 mt-3 translate-middle pt-8 ">MarioCarballo</p>
								</div>
								<div className="d-flex flex-column gap-2 mt-9 position-relative z-1">
									<Link href="mailto:mariofernandezcarballo@gmail.com">
										<i className="ri-mail-fill text-primary-3 fs-7" />
										<span className="text-300 fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
									</Link>
									<Link href="https://x.com/MarioFCarballo">
										<i className="ri-twitter-x-line text-primary-3 fs-7" />
										<span className="text-300 fs-6 ms-2">@MarioFCarballo</span>
									</Link>
									<Link href="https://bsky.app/profile/mariocarballo.bsky.social">
										<i className="ri-bluesky-fill text-primary-3 fs-7" />
										<span className="text-300 fs-6 ms-2">@mariocarballo.bsky.social</span>
									</Link>
									
								</div>
							</div>
							<div className="col-lg-7 pt-lg-0 pt-8">
								<div id="about" className="hero-3 pe-lg-5 border-bottom pb-7">
									<span className="text-primary-3">Shaping Narratives, Igniting Minds</span>
									<h2 className="text-300 my-3">Crafting Stories <span className="text-dark">with Passion: Discover the Work</span> of Meisa</h2>
									<p className="mb-8">Welcome to the creative world of Meisa Rosie, where words are crafted into captivating stories and insightful content. Explore her journey as an award-winning writer and discover how she brings imagination to life through her unique voice and compelling narratives.</p>
									<Link href="assets/resume.pdf" className="btn btn-secondary-3 me-2" target="_blank">
										Download CV
										<i className="ri-download-line ms-2" />
									</Link>
									<Link href="#contact" className="btn btn-outline-secondary-3 d-inline-flex align-items-center">
										<span>Hire me</span>
										<i className="ri-arrow-right-line ms-2" />
									</Link>
								</div>
								<Publicaciones />
								<Podcast />
								<Premios />
								<div id="blog" className="blog pt-70">
									<h3>From Blog</h3>
									<div className="position-relative pt-4">
										<Swiper {...swiperOptions2} className="swiper slider-two pb-6 position-relative">
											<div className="swiper-wrapper">
												{posts.map((post, index) => (
													<SwiperSlide key={post.id}>
														<Link href={`/blog/${post.id}`}>
															<div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3 zoom-img">
																<p className="fs-18 text-primary-3">{Array.isArray(post.tags) ? post.tags.join(', ') : 'Blog'}</p>
																<div className="d-flex align-items-center gap-5">
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
																</div>
															</div>
														</Link>
													</SwiperSlide>
												))}
											</div>
										</Swiper>
										<div className="swiper-pagination" />
									</div>
									<div className="text-center mt-4">
										<Link href="/blog" className="btn btn-secondary-3">
											View All Posts
											<i className="ri-arrow-right-line ms-2" />
										</Link>
									</div>
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
