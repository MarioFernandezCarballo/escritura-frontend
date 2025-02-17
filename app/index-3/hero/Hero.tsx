import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from 'react';
import { useSubscribers } from '@/util/api';

export default function Hero() {
    const [newEmail, setNewEmail] = useState('');
    const { addSubscriber } = useSubscribers();

    const handleAddSubscriber = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addSubscriber(newEmail, false);
            alert('¡Suscripción exitosa!');
            setNewEmail('');
        } catch (error) {
            console.error('Error adding subscriber:', error);
        }
    };
    return (
        <motion.section 
            id="about" 
            className="hero-3 pe-lg-5 border-bottom pb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Sección de introducción"
        >
            <motion.h1 
                className="text-primary-3 h4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                Transformando Ideas en Historias Inolvidables
            </motion.h1>
            <motion.h2 
                className="text-300 my-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                Mundos que <span className="text-dark">Inspiran.</span> Palabras que <span className="text-dark">Transforman</span>
            </motion.h2>
            <motion.p 
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                Bienvenidos al universo de la narrativa excepcional. Como escritor galardonado y periodista de élite, transformo ideas en historias que cautivan, inspiran y perduran. Mi pluma da vida a relatos que conectan con el corazón de los lectores, mientras mi experiencia periodística aporta la profundidad y credibilidad que tu mensaje merece.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
            >
                <form 
                    className="d-flex flex-column"
                    onSubmit={handleAddSubscriber}
                    aria-label="Formulario de suscripción al boletín"
                >
                    <div className="visually-hidden" aria-live="polite" role="status" id="form-status">
                        {newEmail ? 'Email ingresado' : 'Formulario de suscripción listo'}
                    </div>
                    <motion.input 
                        className="d-inline-block form-control me-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="email" 
                        name="email" 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico" 
                        required 
                        style={{maxHeight: 30, margin: 'auto'}}
                        aria-label="Correo electrónico para suscripción"
                        aria-required="true"
                        aria-describedby="form-status"
                    />
                    <motion.button 
                        type="submit" 
                        className="btn btn-secondary-3 d-inline-flex align-items-center mt-3"
                        style={{padding: 3}}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Suscríbete para estar al día
                        <i className="ri-mail-line ms-2" />
                    </motion.button>
                </form>
            </motion.div>
        </motion.section>
    )
}
