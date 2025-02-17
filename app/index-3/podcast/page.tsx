'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchPodcastEpisodes, PodcastEpisode } from '@/util/podcast'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperOptions2 = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	centeredSlides: false,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
		pauseOnHover: true
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		1200: {
			slidesPerView: 2,
			spaceBetween: 30
		}
	}
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
							<div className="card-services pt-4">
								<motion.div 
									className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 d-flex position-relative" 
									style={{height: 150}}
									whileHover={{ 
										boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
									}}
									transition={{ duration: 0.3 }}
									onMouseEnter={() => {
										const overlay = document.getElementById(`overlay-${index}`);
										const buttons = document.getElementById(`buttons-${index}`);
										if (overlay) overlay.style.opacity = '1';
										if (buttons) buttons.style.opacity = '1';
									}}
									onMouseLeave={() => {
										const overlay = document.getElementById(`overlay-${index}`);
										const buttons = document.getElementById(`buttons-${index}`);
										if (overlay) overlay.style.opacity = '0';
										if (buttons) buttons.style.opacity = '0';
									}}
								>
									{/* Dark overlay */}
									<div 
										id={`overlay-${index}`}
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
										id={`buttons-${index}`}
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
										<motion.button 
											className="d-flex align-items-center justify-content-center bg-primary-3 text-white border-0"
											style={{
												width: '40px',
												height: '40px',
												borderRadius: '50%',
												boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
											}}
											whileHover={{ 
												scale: 1.1,
												boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)'
											}}
											onClick={(e) => {
												e.stopPropagation();
												window.open(episode.link, '_blank', 'noopener,noreferrer');
											}}
											transition={{ duration: 0.1 }}
										>
											<i className="ri-play-fill ri-lg text-primary-3"></i>
										</motion.button>
									</div>
									
									<motion.div 
										className="card__content px-md-4 px-3 d-flex flex-column"
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.1 }}
									>
										<motion.p 
											className="text-primary-3 mb-2"
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.2 }}
										>
											{new Date(episode.pubDate).toLocaleDateString()}
										</motion.p>
										<motion.div 
											className="card__title mb-0 mb-lg-2"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.1 }}
										>
											<motion.p 
												className="fs-4 text-dark"
												whileHover={{ x: 10 }}
												transition={{ duration: 0.2 }}
											>
												{episode.title.length > 60 ? `${episode.title.slice(0,60)}...` : episode.title}
											</motion.p>
										</motion.div>
									</motion.div>
								</motion.div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="swiper-pagination" />
			</div>				
		</>
	)
}
