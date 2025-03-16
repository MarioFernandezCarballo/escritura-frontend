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
        <div id="contact" className="contact pt-70">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Contacto
            </motion.h3>
            <motion.div 
                className="position-relative z-2 mt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.h5 
                    className="text-dark mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    Hablemos
                </motion.h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <motion.input 
                                type="text" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
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
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-md-6">
                            <motion.input 
                                type="email" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
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
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-md-12">
                            <motion.input 
                                type="text" 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
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
                                transition={{ duration: 0.4, delay: 0.6 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-12">
                            <motion.textarea 
                                className="form-control bg-3 border border-secondary-3 rounded-3" 
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
                                transition={{ duration: 0.4, delay: 0.7 }}
                                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                            />
                        </div>
                        <div className="col-12">
                            <motion.button 
                                type="submit" 
                                className="btn btn-secondary-3 fw-medium"
                                disabled={status === 'sending'}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {status === 'sending' ? 'Enviando...' : 
                                 status === 'success' ? 'Mensaje enviado!' :
                                 status === 'error' ? 'Error al enviar' : 'Enviar mensaje'}
                                <motion.i 
                                    className="ri-arrow-right-up-line fw-medium"
                                    whileHover={{ x: 5, y: -5 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
