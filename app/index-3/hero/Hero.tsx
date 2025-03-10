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
            className="hero-3 pe-lg-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Sección de introducción"
        >
            <motion.h2 
                className="text-300 my-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                Mundos que <span className="text-primary-3">Inspiran.</span> Palabras que <span className="text-primary-3">Transforman</span>
            </motion.h2>
            <motion.p 
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                Adéntrate en un universo de historias inolvidables. Aquí encontrarás mundos extraordinarios de fantasía y ciencia ficción, donde la imaginación no tiene límites y las palabras tejen realidades asombrosas. Realidades que inspiran, emocionan, y dejan huella.
            </motion.p>
            <motion.p 
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                Realidades que inspiran, emocionan, y dejan huella.
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
                        placeholder="Escribe tu email y no te pierdas nada" 
                        required 
                        style={{maxHeight: 30, margin: 'auto'}}
                        aria-label="Correo electrónico para suscripción"
                        aria-required="true"
                        aria-describedby="form-status"
                    />
                    <motion.button 
                        type="submit" 
                        style={{width: 'fit-content'}}
                        className="btn btn-secondary-3 fw-medium mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0 }}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}>

                        Únete a la comunidad
                        <motion.i 
                            className="ri-arrow-right-up-line fw-medium"
                            whileHover={{ x: 5, y: -5 }}
                        />
                    </motion.button>
                </form>
            </motion.div>
        </motion.section>
    )
}
