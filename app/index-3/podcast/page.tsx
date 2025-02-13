'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchPodcastEpisodes, PodcastEpisode } from '@/util/podcast'

const swiperOptions2 = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	slidesPerGroup: 1,
	centeredSlides: false,
	loop: true,
	autoplay: {
		delay: 3000,
	},
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
}

export default function Podcast() {
    const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const episodes = await fetchPodcastEpisodes();
                setPodcastEpisodes(episodes);
            } catch (error) {
                console.error('Error fetching podcast episodes:', error);
            }
        };
        fetchData();
    }, []);

	return (
		<>
			<div id="services" className="my-services pt-70">
				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					Podcast
				</motion.h3>
				<Swiper {...swiperOptions2} className="swiper slider-two pb-6 position-relative">
					{podcastEpisodes.map((episode, index) => (
						<SwiperSlide key={index}>
							<motion.div 
								className="card-services mb-3 pt-4"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={episode.link} target="_blank">
									<motion.div 
										className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 d-flex" 
										style={{height: 250}}
										whileHover={{ 
											scale: 1.02,
											boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
										}}
										transition={{ duration: 0.3 }}
									>
										<motion.div 
											className="d-block"
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: 0.2 }}
										>
											<motion.div 
												className="card__icon icon-shape icon-lg rounded-circle"
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.6 }}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
													<g clipPath="url(#clip0_184_1754)">
														<path className="fill-primary-3" d="M21.1875 7.03125V4.21875H16.8421C15.3434 4.21875 13.9009 4.61381 12.6297 5.36667C12.1617 2.33194 9.51408 0 6.32812 0H5.625V2.8125H2.8125V5.625H0V22.5938H7.15191C9.12042 22.5938 10.1521 23.9276 10.2556 24H13.7444C13.8499 23.9261 14.8715 22.5938 16.8481 22.5938H24V7.03125H21.1875ZM16.8421 5.625H19.7812V18.375H16.8421C15.3722 18.375 13.9563 18.7552 12.7031 19.48V7.00472C12.8124 6.9488 14.3378 5.625 16.8421 5.625ZM7.03125 1.45537C9.43927 1.7947 11.2969 3.85055 11.2969 6.32812V16.5239C10.2659 15.2518 8.75058 14.3825 7.03125 14.1945V1.45537ZM4.21875 4.21875H5.625V15.5625H6.32812C8.69639 15.5625 10.6826 17.2124 11.1779 19.4126C9.95433 18.7316 8.58145 18.375 7.15786 18.375H4.21875V4.21875ZM22.5938 21.1875H16.8481C15.478 21.1875 14.1843 21.6847 13.1731 22.5938H10.8269C9.81567 21.6847 8.52202 21.1875 7.15186 21.1875H1.40625V7.03125H2.8125V19.7812H7.15786C9.69675 19.7812 11.2132 21.1253 11.334 21.1875H12.666C12.7859 21.1258 14.3071 19.7812 16.8421 19.7812H21.1875V8.4375H22.5938V21.1875Z" fill="#FCC6E2" />
													</g>
												</svg>
											</motion.div>
										</motion.div>
										<motion.div 
											className="card__content px-md-4 px-3 d-flex justify-content-between flex-column"
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
												<motion.p 
													className="fs-4 text-dark"
													whileHover={{ x: 10 }}
													transition={{ duration: 0.2 }}
												>
													{episode.title}
												</motion.p>
											</motion.div>
											<div>
												<motion.p 
													className="text-300 mb-lg-auto mb-md-4 mb-3"
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{ duration: 0.4, delay: 0.5 }}
												>
													{episode.description.length > 200
														? `${episode.description.slice(0, 200)}...`
														: episode.description}
												</motion.p>
												<motion.p 
													className="text-primary-3 mb-0 mt-4"
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													viewport={{ once: true }}
													transition={{ duration: 0.4, delay: 0.6 }}
												>
													{new Date(episode.pubDate).toLocaleDateString()}
												</motion.p>
											</div>
										</motion.div>
									</motion.div>
								</Link>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="swiper-pagination" />
			</div>				
		</>
	)
}
