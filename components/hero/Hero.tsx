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
                className="text-dark my-3 responsive-heading"
                style={{ fontSize: '52px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                Mundos que <span className="text-primary-3">Inspiran.</span> Palabras que <span className="text-primary-3">Transforman</span>
            </motion.h2>
            <motion.p 
                className="mb-4 text-dark fs-6 fs-md-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                Adéntrate en un universo de historias inolvidables. Aquí encontrarás mundos extraordinarios de fantasía y ciencia ficción, donde la imaginación no tiene límites y las palabras tejen realidades asombrosas. Realidades que inspiran, emocionan, y dejan huella.
            </motion.p>
            <motion.p 
                className="mb-4 text-dark fs-6 fs-md-5"
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
                className="w-100 w-md-75 w-lg-50"
            >
                <form 
                    className="d-flex flex-column flex-md-row align-items-md-center gap-2"
                    onSubmit={handleAddSubscriber}
                    aria-label="Formulario de suscripción al boletín"
                >
                    <div className="visually-hidden" aria-live="polite" role="status" id="form-status">
                        {newEmail ? 'Email ingresado' : 'Formulario de suscripción listo'}
                    </div>
                    <motion.input 
                        className="d-inline-block form-control text-dark"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="email" 
                        name="email" 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Escribe tu email y no te pierdas nada" 
                        required 
                        style={{height: '38px', width: '100%'}}
                        aria-label="Correo electrónico para suscripción"
                        aria-required="true"
                        aria-describedby="form-status"
                    />
                    <motion.button 
                        type="submit" 
                        style={{width: 'fit-content'}}
                        className="btn btn-secondary-3 fw-medium mx-auto mx-md-0"
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

// Add responsive styles
const responsiveStyles = `
    @media (max-width: 992px) {
        .responsive-heading {
            font-size: 42px !important;
        }
    }
    @media (max-width: 768px) {
        .responsive-heading {
            font-size: 36px !important;
        }
    }
    @media (max-width: 576px) {
        .responsive-heading {
            font-size: 28px !important;
        }
    }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
    // Check if the style element already exists
    const existingStyle = document.getElementById('hero-responsive-styles');
    if (!existingStyle) {
        const styleElement = document.createElement('style');
        styleElement.id = 'hero-responsive-styles';
        styleElement.innerHTML = responsiveStyles;
        document.head.appendChild(styleElement);
    }
}
