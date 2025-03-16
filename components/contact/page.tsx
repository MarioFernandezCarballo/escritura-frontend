'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { useContact } from '@/util/api'

export default function Contacto () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const { sendContactForm, status } = useContact();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await sendContactForm(formData);
        if (success) {
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="contact" className="section-home-3 custom-header pt-50">	
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                        <h2>Contacto</h2>
                        <p>Estoy aquí para escuchar tus ideas y comentarios.</p>
                        <div id="contacto" className="contact">
                            <motion.div 
                                className="position-relative z-2 mt-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className='mb-4'>
                                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                                        <Link 
                                            href="mailto:mariofernandezcarballo@gmail.com"
                                            aria-label="Enviar email a Mario Carballo"
                                        >
                                            <i className="ri-mail-fill fs-7" aria-hidden="true" />
                                            <span className="fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                                        <Link 
                                            href="https://x.com/MarioFCarballo"
                                            aria-label="Perfil de Mario Carballo en X (Twitter)"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="ri-twitter-x-line fs-7" aria-hidden="true" />
                                            <span className="fs-6 ms-2">@MarioFCarballo</span>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                                        <Link 
                                            href="https://bsky.app/profile/mariocarballo.bsky.social"
                                            aria-label="Perfil de Mario Carballo en Bluesky"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="ri-bluesky-fill fs-7" aria-hidden="true" />
                                            <span className="fs-6 ms-2">@mariocarballo.bsky.social</span>
                                        </Link>
                                    </motion.div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <motion.input 
                                                type="text" 
                                                className="form-control rounded-3" 
                                                id="name" 
                                                name="name" 
                                                placeholder="Nombre" 
                                                aria-label="username"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.1 }}
                                                whileHover={{borderColor: '#956e2f'}}
                                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <motion.input 
                                                type="email" 
                                                className="form-control rounded-3" 
                                                id="email" 
                                                name="email" 
                                                placeholder="Email" 
                                                aria-label="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.1 }}
                                                whileHover={{borderColor: '#956e2f'}}
                                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <motion.input 
                                                type="text" 
                                                className="form-control rounded-3" 
                                                id="subject" 
                                                name="subject" 
                                                placeholder="Asunto" 
                                                aria-label="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.1 }}
                                                whileHover={{borderColor: '#956e2f'}}
                                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <motion.textarea 
                                                className="form-control rounded-3" 
                                                id="message" 
                                                name="message" 
                                                placeholder="Mensaje" 
                                                aria-label="With textarea"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.1 }}
                                                whileHover={{borderColor: '#956e2f'}}
                                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <motion.button 
                                                type="submit" 
                                                style={{width: 'fit-content'}}
                                                className="btn btn-secondary-3 mc-button fw-medium mx-auto mx-md-0"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                whileHover={{ 
                                                    scale: 1.05
                                                }}
                                                whileTap={{ scale: 0.95 }}>

                                                {status === 'sending' ? 'Enviando...' : 
                                                status === 'success' ? 'Mensaje enviado!' :
                                                status === 'error' ? 'Error al enviar' : 'Enviar mensaje'}
                                                <i className="ri-arrow-right-up-line fw-medium"/>
                                        
                                            </motion.button>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>		
    )
}
